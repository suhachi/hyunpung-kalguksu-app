import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase'; // ✅ firebase.ts에서 export한 storage 사용
import { processImage, validateImageFile } from '../imageUtils';

/**
 * 메뉴 이미지 업로드: menus/{menuId}/{fileName}
 * Firebase Storage SDK만 사용 (CORS 문제 방지)
 * 업로드 후 Functions에서 자동으로 orig_, thumb_, resized_ 버전 생성
 * 
 * @param menuId 메뉴 ID
 * @param file 업로드할 파일 또는 처리된 Blob
 * @param fileName 저장할 파일명 (기본값: 타임스탬프.webp)
 * @param deleteOldImageUrl 기존 이미지 URL (교체 시 삭제)
 * @returns 업로드된 이미지 URL
 */
export async function uploadMenuImage(
  menuId: string, 
  file: File | Blob, 
  fileName?: string,
  deleteOldImageUrl?: string
): Promise<string> {
  let processed: Blob;

  // File인 경우 검증 및 처리
  if (file instanceof File) {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    processed = await processImage(file, {
      maxWidth: 1600,
      outputFormat: 'webp',
      quality: 0.86,
    });
  } else {
    // 이미 처리된 Blob인 경우 그대로 사용
    processed = file;
  }

  // 파일명 생성 (타임스탬프 포함)
  const timestamp = Date.now();
  const finalFileName = fileName || `${timestamp}.webp`;

  // 기존 이미지 삭제 (교체 시)
  if (deleteOldImageUrl) {
    try {
      const oldFileName = extractFileNameFromUrl(deleteOldImageUrl);
      if (oldFileName) {
        // orig_, thumb_, resized_ 모든 버전 삭제 시도
        const baseName = oldFileName.replace(/^(orig_|thumb_\d+_|resized_\d+_)/, '').replace(/\.webp$/, '');
        const origBaseName = oldFileName.startsWith('orig_') 
          ? oldFileName 
          : oldFileName.replace(/^(thumb_\d+_|resized_\d+_)/, 'orig_');
        
        await Promise.all([
          deleteMenuImage(menuId, oldFileName),
          deleteMenuImage(menuId, origBaseName),
          deleteMenuImage(menuId, `thumb_640_${baseName}.webp`),
          deleteMenuImage(menuId, `resized_1200_${baseName}.webp`),
        ]).catch((err) => {
          console.warn('[uploadMenuImage] Failed to delete old images:', err);
          // 삭제 실패해도 계속 진행
        });
      }
    } catch (error) {
      console.warn('[uploadMenuImage] Failed to extract/delete old image:', error);
      // 삭제 실패해도 계속 진행
    }
  }

  // ✅ firebase.ts에서 export한 storage 사용 (올바른 버킷 보장)
  const objectRef = ref(storage, `menus/${menuId}/${finalFileName}`);
  
  try {
    await uploadBytes(objectRef, processed, { 
      contentType: 'image/webp',
      cacheControl: 'public,max-age=31536000', // 1년 (Functions에서 thumb/resized 생성 후 캐시 안정)
    });
    
    // 업로드된 원본 URL 반환
    // Functions가 자동으로 thumb_, resized_ 버전 생성
    const url = await getDownloadURL(objectRef);
    
    console.log(`[uploadMenuImage] Uploaded: ${finalFileName}, Functions will create thumb/resized versions`);
    return url;
  } catch (error) {
    console.error('[uploadMenuImage] Upload failed:', error);
    throw new Error(`이미지 업로드 실패: ${error}`);
  }
}

/**
 * 메뉴 이미지 삭제
 * @param menuId 메뉴 ID
 * @param fileName 삭제할 파일명 (기본값: image.webp, URL에서 추출 가능)
 */
export async function deleteMenuImage(menuId: string, fileName?: string): Promise<void> {
  // ✅ firebase.ts에서 export한 storage 사용 (올바른 버킷 보장)
  // fileName이 없으면 기본값 사용
  const targetFileName = fileName || 'image.webp';
  const storageRef = ref(storage, `menus/${menuId}/${targetFileName}`);
  
  try {
    await deleteObject(storageRef);
  } catch {
    // 존재하지 않아도 무시
  }
}

/**
 * URL에서 파일명 추출 (menus/{menuId}/ 이후 부분)
 * 예: https://.../menus/menu-001/1234567890.webp → 1234567890.webp
 */
export function extractFileNameFromUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    const match = url.match(/menus\/[^\/]+\/([^\/\?]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}


