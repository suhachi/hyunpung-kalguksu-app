/**
 * 고객센터 채팅 관련 타입 정의
 * Phase 3-2: Support Chat
 */

export interface ChatSession {
  id: string;
  userId: string;
  userName?: string;
  userPhone?: string;
  open: boolean;
  lastAt: number;
  lastMessage?: string;
  assignedTo?: string; // 담당 관리자 UID
  createdAt: number;
  updatedAt: number;
}

export type MessageSender = 'user' | 'admin' | 'bot';

export type MessageType = 'text' | 'image';

export interface ChatMessage {
  id: string;
  sessionId: string;
  from: MessageSender;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  at: number;
  readByAdmin?: boolean;
  readByUser?: boolean;
}

export interface SendMessageParams {
  sessionId: string;
  from: MessageSender;
  type: MessageType;
  text?: string;
  imageUrl?: string;
}

/**
 * 운영 시간 체크
 */
export interface BusinessHours {
  start: string; // "09:00"
  end: string;   // "21:00"
}

export interface AutoReply {
  enabled: boolean;
  message: string;
  businessHours: BusinessHours;
}
