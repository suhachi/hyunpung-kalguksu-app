/**
 * 배달 주소 입력/선택 폼
 * 지오코딩 및 배달 가능 여부 확인
 */

import { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { geocode } from '../../lib/geo/geocode';
import { calculateDeliveryFee, canDeliverTo } from '../../lib/cart/deliveryFee';
import deliveryZonesConfig from '../../config/delivery-zones.json';
import type { DeliveryAddress } from '../../types/cart';
import { toast } from 'sonner';

interface AddressFormProps {
  value?: DeliveryAddress;
  onChange: (address: DeliveryAddress | null) => void;
  onValidationChange?: (valid: boolean) => void;
}

export function AddressForm({
  value,
  onChange,
  onValidationChange,
}: AddressFormProps) {
  const [address, setAddress] = useState(value?.address || '');
  const [detail, setDetail] = useState(value?.detail || '');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [deliveryFeeResult, setDeliveryFeeResult] = useState<{
    fee: number;
    distance: number;
    canDeliver: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (value?.lat && value?.lng) {
      validateAddress(value.address, value.detail, value.lat, value.lng);
    }
  }, []);

  async function handleGeocode() {
    if (!address.trim()) {
      toast.error('주소를 입력해주세요');
      return;
    }

    setIsGeocoding(true);
    try {
      const result = await geocode(address);
      
      // 상세 주소 포함
      const fullAddress = detail.trim()
        ? `${result.address} ${detail.trim()}`
        : result.address;

      const newAddress: DeliveryAddress = {
        address: result.address,
        detail: detail.trim(),
        lat: result.lat,
        lng: result.lng,
      };

      onChange(newAddress);
      validateAddress(result.address, detail, result.lat, result.lng);
    } catch (error: any) {
      console.error('Geocoding failed:', error);
      toast.error(error.message || '주소를 찾을 수 없습니다');
      onChange(null);
      setDeliveryFeeResult(null);
      onValidationChange?.(false);
    } finally {
      setIsGeocoding(false);
    }
  }

  function validateAddress(
    addr: string,
    addrDetail: string,
    lat: number,
    lng: number
  ) {
    const storeLocation = deliveryZonesConfig.storeLocation;
    const fullAddress = addrDetail.trim() ? `${addr} ${addrDetail.trim()` : addr;

    const result = calculateDeliveryFee(
      storeLocation.lat,
      storeLocation.lng,
      lat,
      lng,
      fullAddress,
      {
        useNightFee: true,
        weight: 'normal',
      }
    );

    if (result.canDeliver) {
      setDeliveryFeeResult({
        fee: result.fee,
        distance: result.distance,
        canDeliver: true,
        message: `배달 가능 (거리: ${(result.distance / 1000).toFixed(1)}km, 배달비: ${result.fee.toLocaleString()}원)`,
      });
      onValidationChange?.(true);
    } else if (result.isBlacklisted) {
      setDeliveryFeeResult({
        fee: 0,
        distance: result.distance,
        canDeliver: false,
        message: '배달 불가 지역입니다',
      });
      onValidationChange?.(false);
    } else if (result.distance > (deliveryZonesConfig.maxDistance || 5000)) {
      setDeliveryFeeResult({
        fee: 0,
        distance: result.distance,
        canDeliver: false,
        message: `배달 가능 거리를 초과했습니다 (${(result.distance / 1000).toFixed(1)}km)`,
      });
      onValidationChange?.(false);
    } else {
      setDeliveryFeeResult({
        fee: 0,
        distance: result.distance,
        canDeliver: false,
        message: '배달 불가 지역입니다',
      });
      onValidationChange?.(false);
    }
  }

  function handleAddressChange(newAddress: string) {
    setAddress(newAddress);
    // 주소 변경 시 기존 검증 결과 초기화
    if (deliveryFeeResult) {
      setDeliveryFeeResult(null);
      onValidationChange?.(false);
    }
    onChange(null);
  }

  function handleDetailChange(newDetail: string) {
    setDetail(newDetail);
    // 상세 주소만 변경 시 재검증
    if (value?.lat && value?.lng) {
      validateAddress(value.address, newDetail, value.lat, value.lng);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="delivery-address" className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#D61C1C]" />
          배달 주소 *
        </Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="delivery-address"
            placeholder="주소를 입력하고 검색 버튼을 클릭하세요"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleGeocode();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleGeocode}
            disabled={isGeocoding || !address.trim()}
            size="default"
          >
            {isGeocoding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              '검색'
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          도로명 주소 또는 지번 주소를 입력하세요
        </p>
      </div>

      {value?.lat && value?.lng && (
        <div>
          <Label htmlFor="delivery-detail">상세 주소</Label>
          <Input
            id="delivery-detail"
            placeholder="동/호수, 건물명 등"
            value={detail}
            onChange={(e) => handleDetailChange(e.target.value)}
            className="mt-1"
          />
        </div>
      )}

      {/* 배달 가능 여부 및 배달비 표시 */}
      {deliveryFeeResult && (
        <Alert
          variant={deliveryFeeResult.canDeliver ? 'default' : 'destructive'}
          className={deliveryFeeResult.canDeliver ? 'border-green-200 bg-green-50' : ''}
        >
          {deliveryFeeResult.canDeliver ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription className={deliveryFeeResult.canDeliver ? 'text-green-800' : ''}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{deliveryFeeResult.message}</span>
              {deliveryFeeResult.canDeliver && (
                <span className="text-sm font-semibold text-[#D61C1C]">
                  {deliveryFeeResult.fee.toLocaleString()}원
                </span>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 안내 메시지 */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          배달 가능 거리: {((deliveryZonesConfig.maxDistance || 5000) / 1000).toFixed(1)}km 이내
        </AlertDescription>
      </Alert>
    </div>
  );
}

