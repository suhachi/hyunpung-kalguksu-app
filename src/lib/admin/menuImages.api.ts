import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../firebase';
import { processImage, validateImageFile } from '../imageUtils';

/**
 * 메뉴 이미지 업로드: menus/{menuId}/image.webp
 * Firebase Storage SDK만 사용 (CORS 문제 방지)
 */
export async function uploadMenuImage(menuId: string, file: File): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const processed = await processImage(file, {
    maxWidth: 1600,
    outputFormat: 'webp',
    quality: 0.86,
  });

  // Firebase Storage SDK 인스턴스 사용
  const storage = getStorage(app);
  const objectRef = ref(storage, `menus/${menuId}/image.webp`);
  
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


