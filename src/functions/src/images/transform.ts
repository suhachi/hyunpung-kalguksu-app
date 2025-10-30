/**
 * 이미지 변환 파이프라인 (Firebase Storage Trigger)
 * 원본 이미지 업로드 시 썸네일 및 리사이즈 버전 자동 생성
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sharp from 'sharp';
import { Readable } from 'stream';

const storage = admin.storage();
const bucket = storage.bucket();

/**
 * 이미지 최종 업로드 시 트리거
 * menus/{menuId}/{fileName} 경로의 이미지 처리
 */
const IMAGE_TRANSFORM_RUN_OPTIONS = {
  timeoutSeconds: 300,
  memory: '1GB' as const,
  minInstances: 0,
  maxInstances: 3,
};

export const onMenuImageFinalize = functions
  .region('asia-northeast3')
  .runWith(IMAGE_TRANSFORM_RUN_OPTIONS)
  .storage.object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    if (!filePath) {
      console.warn('[onMenuImageFinalize] No file path');
      return;
    }

    // menus/{menuId}/{fileName} 패턴 확인
    const menuImageMatch = filePath.match(/^menus\/([^\/]+)\/(.+)$/);
    if (!menuImageMatch) {
      console.log(`[onMenuImageFinalize] Skipping non-menu image: ${filePath}`);
      return;
    }

    const [, menuId, fileName] = menuImageMatch;

    // 썸네일/리사이즈 버전은 이미 처리된 것이므로 스킵
    if (fileName.includes('thumb_') || fileName.includes('resized_') || fileName.includes('orig_')) {
      console.log(`[onMenuImageFinalize] Skipping processed image: ${filePath}`);
      return;
    }

    // 원본 파일명 저장 (orig_ 접두사)
    const fileExt = fileName.split('.').pop() || 'webp';
    const baseName = fileName.replace(`.${fileExt}`, '');
    const origFileName = `orig_${baseName}.${fileExt}`;

    try {
      const file = bucket.file(filePath);
      
      // 파일 다운로드
      const [fileBuffer] = await file.download();

      // Sharp를 사용한 이미지 처리
      const image = sharp(fileBuffer);

      // 원본 메타데이터 가져오기
      const metadata = await image.metadata();
      const width = metadata.width || 1600;
      const height = metadata.height || 1600;

      // 1. 원본 파일명으로 복사 (orig_ 접두사)
      const origPath = `menus/${menuId}/${origFileName}`;
      const origFile = bucket.file(origPath);
      await origFile.save(fileBuffer, {
        contentType: object.contentType || 'image/webp',
        cacheControl: 'public,max-age=31536000', // 1년
        metadata: {
          metadata: {
            ...object.metadata,
            processedBy: 'firebase-functions',
            originalPath: filePath,
          },
        },
      });
      console.log(`[onMenuImageFinalize] Original saved: ${origPath}`);

      // 2. 썸네일 생성 (640px width, WebP)
      const thumbBuffer = await image
        .resize(640, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      const thumbPath = `menus/${menuId}/thumb_640_${baseName}.webp`;
      const thumbFile = bucket.file(thumbPath);
      await thumbFile.save(thumbBuffer, {
        contentType: 'image/webp',
        cacheControl: 'public,max-age=31536000',
        metadata: {
          metadata: {
            processedBy: 'firebase-functions',
            type: 'thumbnail',
            width: '640',
            originalPath: filePath,
          },
        },
      });
      console.log(`[onMenuImageFinalize] Thumbnail created: ${thumbPath}`);

      // 3. 리사이즈 버전 생성 (1200px width, WebP)
      if (width > 1200) {
        const resizedBuffer = await image
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 90 })
          .toBuffer();

        const resizedPath = `menus/${menuId}/resized_1200_${baseName}.webp`;
        const resizedFile = bucket.file(resizedPath);
        await resizedFile.save(resizedBuffer, {
          contentType: 'image/webp',
          cacheControl: 'public,max-age=31536000',
          metadata: {
            metadata: {
              processedBy: 'firebase-functions',
              type: 'resized',
              width: '1200',
              originalPath: filePath,
            },
          },
        });
        console.log(`[onMenuImageFinalize] Resized created: ${resizedPath}`);
      }

      // 4. 업로드된 원본 파일은 삭제하고 orig_ 버전만 유지
      // (선택사항: 원본도 유지하려면 이 부분 제거)
      // await file.delete();
      // console.log(`[onMenuImageFinalize] Original file deleted: ${filePath}`);

      console.log(`[onMenuImageFinalize] Image processing completed for: ${filePath}`);
    } catch (error) {
      console.error(`[onMenuImageFinalize] Error processing image ${filePath}:`, error);
      // 실패해도 원본은 유지되므로 계속 진행
    }
  });

