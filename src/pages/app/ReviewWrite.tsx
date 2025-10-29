import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Upload, X, Image as ImageIcon, Loader2, Gift } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner@2.0.3';
import {
  processImages,
  validateImageFiles,
  createImagePreviewUrl,
  revokeImagePreviewUrl,
} from '../../lib/imageUtils';
import { earnPoints } from '../../lib/points.api';
import { issueCoupon } from '../../lib/coupons.api';
import { FEATURE_FLAGS } from '../../config/env';
import type { Order } from '../../types/order';
import type { ReviewFormData } from '../../types/review';

// Firebase 사용 여부 (개발 시 false)
const USE_FIREBASE = false;

// 포인트 정책
const POINTS_POLICY = {
  reviewPhotoBonus: 200, // 사진 리뷰 추가 포인트
  reviewTextBonus: 100,  // 일반 리뷰 포인트
};

export default function ReviewWrite() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock UID (실제로는 Auth에서 가져옴)
  const uid = 'user_001';

  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    text: '',
    photos: [],
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);

  const MAX_TEXT_LENGTH = 200;
  const MAX_PHOTOS = 5;

  // 주문 정보 로드
  useEffect(() => {
    loadOrder();
  }, [orderId]);

  // 미리보기 URL 정리
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => revokeImagePreviewUrl(url));
    };
  }, [previewUrls]);

  async function loadOrder() {
    try {
      if (USE_FIREBASE) {
        // TODO: Firebase에서 주문 조회
      } else {
        // Mock 데이터
        const mockOrder: Order = {
          id: orderId!,
          userId: 'user-001',
          storeId: 'store-hyunpung',
          orderNumber: 'HP2024102800001',
          items: [
            {
              menuId: 'menu-001',
              name: '현풍닭칼국수',
              basePrice: 10000,
              quantity: 1,
              options: [],
              totalPrice: 10000,
            },
          ],
          subtotal: 10000,
          deliveryFee: 3000,
          finalAmount: 13000,
          status: 'done',
          orderType: 'delivery',
          deliveryInfo: {
            address: '대구 달성군 현풍읍',
            phone: '010-1234-5678',
            request: '',
          },
          payment: {
            method: 'card',
            status: 'authorized',
          },
          createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
        };

        setOrder(mockOrder);
      }
    } catch (error) {
      console.error('Failed to load order:', error);
      toast.error('주문 정보를 불러올 수 없습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  function handleRatingClick(rating: number) {
    setFormData((prev) => ({ ...prev, rating }));
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    if (text.length <= MAX_TEXT_LENGTH) {
      setFormData((prev) => ({ ...prev, text }));
    }
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    if (formData.photos.length + files.length > MAX_PHOTOS) {
      toast.error(`사진은 최대 ${MAX_PHOTOS}장까지 업로드할 수 있습니다.`);
      return;
    }

    const validation = validateImageFiles(files);
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }

    // 미리보기 URL 생성
    const newPreviewUrls = files.map((file) => createImagePreviewUrl(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  }

  function handlePhotoRemove(index: number) {
    // 미리보기 URL 해제
    revokeImagePreviewUrl(previewUrls[index]);

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit() {
    // 유효성 검사
    if (formData.rating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    if (formData.text.trim().length === 0) {
      toast.error('리뷰 내용을 작성해주세요.');
      return;
    }

    if (formData.text.trim().length < 10) {
      toast.error('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);

    try {
      let photoUrls: string[] = [];

      // 사진 업로드
      if (formData.photos.length > 0) {
        if (USE_FIREBASE) {
          // Firebase Storage 업로드
          const processedImages = await processImages(formData.photos);
          // TODO: Firebase Storage 업로드 및 URL 가져오기
          setUploadProgress(50);
          // photoUrls = await uploadImagesToStorage(processedImages);
          setUploadProgress(100);
        } else {
          // Mock: 미리보기 URL 사용
          photoUrls = previewUrls;
        }
      }

      const reviewData = {
        storeId: order!.storeId,
        orderId: orderId!,
        uid: 'user-001', // TODO: 실제 UID
        userName: '김고객',
        rating: formData.rating,
        text: formData.text.trim(),
        photos: photoUrls,
        hasPhoto: photoUrls.length > 0,
        createdAt: Date.now(),
        rewardIssued: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firestore에 리뷰 저장
      } else {
        // Mock: localStorage에 저장
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({ ...reviewData, id: `review-${Date.now()}` });
        localStorage.setItem('reviews', JSON.stringify(reviews));
      }

      // 포인트 적립 (포인트 기능이 활성화된 경우)
      if (FEATURE_FLAGS.points) {
        try {
          const pointsAmount = photoUrls.length > 0 
            ? POINTS_POLICY.reviewPhotoBonus 
            : POINTS_POLICY.reviewTextBonus;

          await earnPoints({
            uid,
            amount: pointsAmount,
            ref: {
              kind: 'review',
              id: `review-${Date.now()}`,
            },
            note: `${photoUrls.length > 0 ? '사진 ' : ''}리뷰 작성 포인트`,
          });

          toast.success(
            `리뷰가 등록되었어요! 🎁 ${pointsAmount}P가 적립되었습니다.`,
            { icon: <Gift className="w-4 h-4" /> }
          );
        } catch (error) {
          console.error('Failed to earn review points:', error);
          toast.success('리뷰가 등록되었어요!');
        }
      } else {
        toast.success('리뷰가 등록되었어요!');
      }

      // 사진 리뷰 쿠폰 발급
      if (photoUrls.length > 0) {
        try {
          // 사진 리뷰 쿠폰 자동 발급
          await issueCoupon(
            {
              type: 'photo_review',
              amount: 3000,
              minSpend: 10000,
              expiryDays: 30,
              title: '사진 리뷰 작성 감사 쿠폰',
              description: '10,000원 이상 주문 시 사용 가능',
              targetUsers: [uid],
              issueLimit: 1,
            },
            'system',
            '시스템'
          );
          
          setTimeout(() => {
            toast.success('3,000원 할인 쿠폰이 발급되었어요! 다음 주문에 사용해 보세요.');
          }, 1000);
        } catch (error) {
          console.error('Failed to issue photo review coupon:', error);
        }
      }

      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error('Failed to submit review:', error);
      toast.error('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D61C1C]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-[#8B7355]">주문을 찾을 수 없습니다.</p>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </div>
    );
  }

  const displayRating = hoverRating || formData.rating;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-[#333] mb-2">리뷰 작성</h1>
        <p className="text-[#8B7355]">
          주문하신 메뉴는 어떠셨나요?
        </p>
      </div>

      {/* 주문 정보 */}
      <Card className="p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-[#F9F6F3] rounded-lg flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-[#C7A45A]" />
          </div>
          <div className="flex-1">
            <p className="text-[#333] mb-1">
              {order.items.map((item) => item.name).join(', ')}
            </p>
            <p className="text-[#8B7355]">
              주문번호: {order.orderNumber}
            </p>
          </div>
        </div>
      </Card>

      {/* 별점 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          별점을 선택해주세요 <span className="text-[#D61C1C]">*</span>
        </label>
        <div className="flex items-center gap-2 justify-center py-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingClick(rating)}
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                className={`w-12 h-12 ${
                  rating <= displayRating
                    ? 'fill-[#F37021] text-[#F37021]'
                    : 'text-[#E5DDD5]'
                }`}
              />
            </button>
          ))}
        </div>
        {formData.rating > 0 && (
          <p className="text-center text-[#8B7355] mt-2">
            {formData.rating === 5 && '최고예요! ⭐'}
            {formData.rating === 4 && '맛있어요! 😊'}
            {formData.rating === 3 && '괜찮아요'}
            {formData.rating === 2 && '별로예요'}
            {formData.rating === 1 && '아쉬워요'}
          </p>
        )}
      </div>

      {/* 텍스트 리뷰 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          리뷰 내용 <span className="text-[#D61C1C]">*</span>
        </label>
        <Textarea
          value={formData.text}
          onChange={handleTextChange}
          placeholder="메뉴의 맛, 양, 배달 속도 등 솔직한 리뷰를 남겨주세요. (최소 10자)"
          rows={5}
          className="resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-[#8B7355]">
            사진과 함께 작성하시면 <span className="text-[#D61C1C]">3,000원 쿠폰</span>을 드려요!
          </p>
          <p className="text-[#8B7355]">
            {formData.text.length}/{MAX_TEXT_LENGTH}
          </p>
        </div>
      </div>

      {/* 사진 업로드 */}
      <div className="mb-6">
        <label className="block text-[#333] mb-3">
          사진 ({formData.photos.length}/{MAX_PHOTOS})
        </label>

        <div className="grid grid-cols-3 gap-3">
          {/* 미리보기 */}
          {previewUrls.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img src={url} alt={`리뷰 사진 ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handlePhotoRemove(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* 업로드 버튼 */}
          {formData.photos.length < MAX_PHOTOS && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-[#E5DDD5] flex flex-col items-center justify-center cursor-pointer hover:border-[#D61C1C] hover:bg-[#FFF5F5] transition-colors">
              <Upload className="w-8 h-8 text-[#8B7355] mb-2" />
              <span className="text-[#8B7355]">사진 추가</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {formData.photos.length > 0 && (
          <p className="text-[#8B7355] mt-2">
            💡 사진은 최대 3MB, {MAX_PHOTOS}장까지 업로드 가능합니다.
          </p>
        )}
      </div>

      {/* 업로드 진행률 */}
      {uploadProgress > 0 && (
        <div className="mb-6">
          <div className="h-2 bg-[#E5DDD5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D61C1C] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-center text-[#8B7355] mt-2">
            업로드 중... {uploadProgress}%
          </p>
        </div>
      )}

      {/* 제출 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5DDD5]">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/order/${orderId}`)}
            disabled={submitting}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || formData.rating === 0 || formData.text.trim().length < 10}
            className="flex-1 bg-[#D61C1C] hover:bg-[#B91818]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                등록 중...
              </>
            ) : (
              '리뷰 등록'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
