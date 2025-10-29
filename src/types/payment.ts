// NICEPAY 결제 요청 파라미터
export interface NicePayAuthRequest {
  MID: string;              // 상점 ID
  Amt: string;              // 결제 금액
  Moid: string;             // 주문번호 (orderId)
  GoodsName: string;        // 상품명
  BuyerName: string;        // 구매자명
  BuyerTel: string;         // 구매자 전화번호
  BuyerEmail: string;       // 구매자 이메일
  ReturnURL: string;        // 결제 결과 수신 URL
  VbankExpDate?: string;    // 가상계좌 입금마감일
  EdiDate: string;          // 전문 생성일시 (YYYYMMDDhhmmss)
  SignData: string;         // 해시값 (위변조 검증)
}

// NICEPAY 결제 승인 요청
export interface NicePayApproveRequest {
  TID: string;              // 거래 ID
  AuthToken: string;        // 인증 토큰
  Amt: string;              // 결제 금액
  MID: string;              // 상점 ID
  Moid: string;             // 주문번호
  SignData: string;         // 해시값
  EdiDate: string;          // 전문 생성일시
}

// NICEPAY 응답
export interface NicePayResponse {
  ResultCode: string;       // 결과코드 (0000: 성공)
  ResultMsg: string;        // 결과메시지
  TID?: string;             // 거래 ID
  Moid?: string;            // 주문번호
  Amt?: string;             // 결제 금액
  AuthToken?: string;       // 인증 토큰
  CardName?: string;        // 카드사명
  CardQuota?: string;       // 할부개월
  CardNum?: string;         // 카드번호 (마스킹)
  PayMethod?: string;       // 결제수단
  GoodsName?: string;       // 상품명
  BuyerName?: string;       // 구매자명
  BuyerTel?: string;        // 구매자 전화번호
  BuyerEmail?: string;      // 구매자 이메일
  AuthDate?: string;        // 승인일시
}

// NICEPAY 취소 요청
export interface NicePayCancelRequest {
  TID: string;              // 거래 ID
  MID: string;              // 상점 ID
  Moid: string;             // 주문번호
  CancelAmt: string;        // 취소 금액
  CancelMsg: string;        // 취소 사유
  PartialCancelCode?: string; // 부분취소 코드
  EdiDate: string;          // 전문 생성일시
  SignData: string;         // 해시값
}

// 클라이언트 결제 요청 데이터
export interface PaymentRequest {
  orderId: string;
  amount: number;
  goodsName: string;
  buyerName: string;
  buyerTel: string;
  buyerEmail: string;
}

// 결제 결과
export interface PaymentResult {
  success: boolean;
  orderId: string;
  tid?: string;
  amount?: number;
  resultCode?: string;
  resultMsg?: string;
  authToken?: string;
  cardName?: string;
  cardNum?: string;
}
