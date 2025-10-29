/**
 * 고객 지원 1:1 채팅 페이지
 * Phase 3-2: Support Chat
 */

import { useEffect, useState, useRef } from 'react';
import { Send, Image as ImageIcon, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { FEATURE_FLAGS } from '../../config/env';
import type { ChatSession, ChatMessage, MessageSender } from '../../types/support';
import { toast } from 'sonner@2.0.3';

const USE_FIREBASE = false;

// 운영 시간 체크
function isBusinessHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  
  // 월-토: 09:00-21:00
  if (day >= 1 && day <= 6) {
    return hour >= 9 && hour < 21;
  }
  
  // 일요일: 10:00-20:00
  if (day === 0) {
    return hour >= 10 && hour < 20;
  }
  
  return false;
}

function getAutoReplyMessage(): string {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour < 9) {
    return '안녕하세요! 현풍닭칼국수입니다. 현재 영업시간 외입니다. 평일·토요일 09:00-21:00, 일요일 10:00-20:00에 문의해 주시면 빠르게 답변드리겠습니다. 🙏';
  } else if (hour >= 21) {
    return '안녕하세요! 현풍닭칼국수입니다. 오늘 영업이 종료되었습니다. 내일 오전 9시 이후 문의해 주시면 빠르게 답변드리겠습니다. 😊';
  } else {
    return '안녕하세요! 현풍닭칼국수입니다. 현재 영업시간 외입니다. 영업시간 내에 문의해 주시면 빠르게 답변드리겠습니다.';
  }
}

export default function Support() {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 지원 기능 비활성화 체크
  if (!FEATURE_FLAGS.support) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertCircle className="w-16 h-16 text-[#2E1C10]/40 mb-4" />
        <h2 className="text-xl text-[#2E1C10] mb-2">
          고객 지원 준비 중
        </h2>
        <p className="text-[#2E1C10]/60 text-center">
          현재 고객 지원 기능을 준비 중입니다.<br />
          문의사항은 전화로 연락 부탁드립니다.
        </p>
        <Button
          className="mt-6"
          onClick={() => (window.location.href = 'tel:010-2068-4732')}
        >
          📞 전화 문의하기
        </Button>
      </div>
    );
  }

  useEffect(() => {
    loadChatSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 자동 스크롤
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // 채팅 세션 로드 (없으면 생성)
  async function loadChatSession() {
    try {
      setLoading(true);

      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 세션 로드
        const userId = localStorage.getItem('mockUserId') || 'guest_' + Date.now();
        localStorage.setItem('mockUserId', userId);

        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessions: Record<string, ChatSession> = JSON.parse(sessionsData);

        // 기존 세션 찾기 또는 생성
        let userSession = Object.values(sessions).find((s) => s.userId === userId);

        if (!userSession) {
          // 새 세션 생성
          userSession = {
            id: `session_${Date.now()}`,
            userId,
            open: true,
            lastAt: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          sessions[userSession.id] = userSession;
          localStorage.setItem('chat_sessions', JSON.stringify(sessions));

          // 환영 메시지 + 운영시간 체크
          const welcomeMessages: ChatMessage[] = [
            {
              id: `msg_${Date.now()}_1`,
              sessionId: userSession.id,
              from: 'bot',
              type: 'text',
              text: '안녕하세요! 현풍닭칼국수입니다. 무엇을 도와드릴까요? 😊',
              at: Date.now(),
              readByUser: true,
            },
          ];

          if (!isBusinessHours()) {
            welcomeMessages.push({
              id: `msg_${Date.now()}_2`,
              sessionId: userSession.id,
              from: 'bot',
              type: 'text',
              text: getAutoReplyMessage(),
              at: Date.now() + 100,
              readByUser: true,
            });
          }

          const messagesData = localStorage.getItem(`chat_messages_${userSession.id}`) || '[]';
          const existingMessages: ChatMessage[] = JSON.parse(messagesData);
          const allMessages = [...welcomeMessages, ...existingMessages];
          localStorage.setItem(`chat_messages_${userSession.id}`, JSON.stringify(allMessages));
          
          setMessages(allMessages);
        } else {
          // 기존 메시지 로드
          const messagesData = localStorage.getItem(`chat_messages_${userSession.id}`) || '[]';
          setMessages(JSON.parse(messagesData));
        }

        setSession(userSession);
      }
    } catch (error) {
      console.error('Failed to load chat session:', error);
      toast.error('채팅을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  // 메시지 전송
  async function sendMessage() {
    if (!session || !inputText.trim() || sending) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId: session.id,
        from: 'user',
        type: 'text',
        text,
        at: Date.now(),
        readByAdmin: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firebase에 메시지 추가
      } else {
        // Mock: localStorage에 메시지 추가
        const messagesData = localStorage.getItem(`chat_messages_${session.id}`) || '[]';
        const allMessages: ChatMessage[] = JSON.parse(messagesData);
        allMessages.push(newMessage);
        localStorage.setItem(`chat_messages_${session.id}`, JSON.stringify(allMessages));
        
        setMessages(allMessages);

        // 세션 업데이트
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessions: Record<string, ChatSession> = JSON.parse(sessionsData);
        sessions[session.id] = {
          ...session,
          lastMessage: text,
          lastAt: Date.now(),
          updatedAt: Date.now(),
        };
        localStorage.setItem('chat_sessions', JSON.stringify(sessions));
      }

      toast.success('메시지가 전송되었습니다');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('메시지 전송에 실패했습니다');
      setInputText(text); // 복원
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#D61C1C]/10 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-[#2E1C10]/60">채팅 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-[#D61C1C] text-white">
              🍜
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-[#2E1C10]">현풍닭칼국수 고객센터</h2>
            <p className="text-sm text-[#2E1C10]/60">
              {isBusinessHours() ? (
                <span className="text-green-600">● 응답 가능</span>
              ) : (
                <span className="text-gray-400">○ 영업시간 외</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 운영시간 알림 */}
      {!isBusinessHours() && (
        <Alert className="m-4 mb-0">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            현재 영업시간이 아닙니다. 영업시간 내에 답변 드리겠습니다.
            <br />
            <span className="text-sm">평일·토 09:00-21:00 | 일요일 10:00-20:00</span>
          </AlertDescription>
        </Alert>
      )}

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="메시지를 입력하세요..."
            disabled={sending}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || sending}
            size="icon"
            className="bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-[#2E1C10]/40 mt-2 text-center">
          전화 문의: 010-2068-4732
        </p>
      </div>
    </div>
  );
}

/**
 * 메시지 말풍선 컴포넌트
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.from === 'user';
  const isBot = message.from === 'bot';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* 보낸 사람 */}
        {!isUser && (
          <p className="text-xs text-[#2E1C10]/60 mb-1 px-1">
            {isBot ? '🤖 자동 응답' : '👤 관리자'}
          </p>
        )}

        {/* 메시지 */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-[#D61C1C] text-white'
              : isBot
              ? 'bg-blue-50 text-[#2E1C10]'
              : 'bg-white text-[#2E1C10] border border-gray-200'
          }`}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}
          {message.type === 'image' && message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="첨부 이미지"
              className="rounded-lg max-w-full"
            />
          )}
        </div>

        {/* 시간 */}
        <p className={`text-xs text-[#2E1C10]/40 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.at).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
