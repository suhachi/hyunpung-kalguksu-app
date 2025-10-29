import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../firebase';
import { processImage, validateImageFile } from '../imageUtils';

/**
 * 메뉴 이미지 업로드: menus/{menuId}/{fileName}
 * Firebase Storage SDK만 사용 (CORS 문제 방지)
 * @param menuId 메뉴 ID
 * @param file 업로드할 파일 또는 처리된 Blob
 * @param fileName 저장할 파일명 (기본값: image.webp, 타임스탬프 추가 가능)
 */
export async function uploadMenuImage(
  menuId: string, 
  file: File | Blob, 
  fileName: string = 'image.webp'
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

  // Firebase Storage SDK 인스턴스 사용
  const storage = getStorage(app);
  const objectRef = ref(storage, `menus/${menuId}/${fileName}`);
  
  await uploadBytes(objectRef, processed, { contentType: 'image/webp' });
  return await getDownloadURL(objectRef);
}

/**
 * 메뉴 이미지 삭제
 */
export async function deleteMenuImage(menuId: string): Promise<void> {
  const storage = getStorage(app);
  const storageRef = ref(storage, `menus/${menuId}/image.webp`);
  try {
    await deleteObject(storageRef);
  } catch {
    // 존재하지 않아도 무시
  }
}


