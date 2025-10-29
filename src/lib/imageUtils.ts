/**
 * 이미지 처리 유틸리티
 * - 리사이징 (1600px max)
 * - WebP 변환 (품질 0.8)
 */

export interface ImageProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'webp' | 'jpeg' | 'png';
}

const DEFAULT_OPTIONS: Required<ImageProcessOptions> = {
  maxWidth: 1600,
  maxHeight: 1600,
  quality: 0.8,
  outputFormat: 'webp',
};

/**
 * 이미지 파일을 리사이징하고 WebP로 변환
 */
export async function processImage(
  file: File,
  options: ImageProcessOptions = {}
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));

    img.onload = () => {
      try {
        // 리사이징 계산
        let { width, height } = img;
        const aspectRatio = width / height;

        if (width > opts.maxWidth || height > opts.maxHeight) {
          if (width > height) {
            width = opts.maxWidth;
            height = Math.round(width / aspectRatio);
          } else {
            height = opts.maxHeight;
            width = Math.round(height * aspectRatio);
          }
        }

        // Canvas에 그리기
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Blob으로 변환
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert canvas to blob'));
            }
          },
          `image/${opts.outputFormat}`,
          opts.quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    reader.readAsDataURL(file);
  });
}

/**
 * 여러 이미지 파일을 병렬 처리
 */
export async function processImages(
  files: File[],
  options: ImageProcessOptions = {}
): Promise<Blob[]> {
  return Promise.all(files.map((file) => processImage(file, options)));
}

/**
 * 파일 크기 검증 (3MB 제한)
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 3 * 1024 * 1024; // 3MB

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: '이미지 파일만 업로드 가능합니다.' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: '이미지는 3MB 이하로 업로드해주세요.' };
  }

  return { valid: true };
}

/**
 * 파일 배열 검증
 */
export function validateImageFiles(files: File[]): { valid: boolean; error?: string } {
  if (files.length === 0) {
    return { valid: true }; // 사진 없는 리뷰도 허용
  }

  if (files.length > 5) {
    return { valid: false, error: '사진은 최대 5장까지 업로드 가능합니다.' };
  }

  for (const file of files) {
    const result = validateImageFile(file);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
}

/**
 * 이미지 URL을 Blob으로 변환 (미리보기용)
 */
export function createImagePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * 미리보기 URL 해제
 */
export function revokeImagePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
