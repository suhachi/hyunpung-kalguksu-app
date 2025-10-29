/**
 * 관리자 고객지원 채팅 관리 페이지
 * Phase 3-2: Support Chat
 */

import { useEffect, useState, useRef } from 'react';
import { Send, MessageSquare, Clock, Check, CheckCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { FEATURE_FLAGS } from '../../config/env';
import type { ChatSession, ChatMessage } from '../../types/support';
import { toast } from 'sonner@2.0.3';

const USE_FIREBASE = false;

export default function Support() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 지원 기능 비활성화 체크
  if (!FEATURE_FLAGS.support) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            고객 지원 기능이 비활성화되어 있습니다. 환경 변수에서 VITE_SUPPORT_ENABLED=true로 설정하세요.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // 세션 목록 로드
  async function loadSessions() {
    try {
      setLoading(true);

      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 세션 로드
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessionsObj: Record<string, ChatSession> = JSON.parse(sessionsData);
        const sessionsList = Object.values(sessionsObj);
        
        // 최신순 정렬 (미응답 우선)
        sessionsList.sort((a, b) => {
          // 미응답 세션 우선
          const aHasUnread = hasUnreadMessages(a.id);
          const bHasUnread = hasUnreadMessages(b.id);
          
          if (aHasUnread && !bHasUnread) return -1;
          if (!aHasUnread && bHasUnread) return 1;
          
          // 그 다음 최신순
          return b.lastAt - a.lastAt;
        });

        setSessions(sessionsList);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      toast.error('세션 목록을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  // 미응답 메시지 체크
  function hasUnreadMessages(sessionId: string): boolean {
    const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
    const msgs: ChatMessage[] = JSON.parse(messagesData);
    return msgs.some((m) => m.from === 'user' && !m.readByAdmin);
  }

  // 메시지 로드
  async function loadMessages(sessionId: string) {
    try {
      if (USE_FIREBASE) {
        // TODO: Firebase 연동
      } else {
        // Mock: localStorage에서 메시지 로드
        const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
        const msgs: ChatMessage[] = JSON.parse(messagesData);
        
        // 읽음 처리
        const updatedMsgs = msgs.map((m) => {
          if (m.from === 'user' && !m.readByAdmin) {
            return { ...m, readByAdmin: true };
          }
          return m;
        });
        
        localStorage.setItem(`chat_messages_${sessionId}`, JSON.stringify(updatedMsgs));
        setMessages(updatedMsgs);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('메시지를 불러오는데 실패했습니다');
    }
  }

  // 메시지 전송
  async function sendMessage() {
    if (!selectedSession || !inputText.trim() || sending) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId: selectedSession.id,
        from: 'admin',
        type: 'text',
        text,
        at: Date.now(),
        readByUser: false,
      };

      if (USE_FIREBASE) {
        // TODO: Firebase에 메시지 추가 + FCM 푸시
      } else {
        // Mock: localStorage에 메시지 추가
        const messagesData = localStorage.getItem(`chat_messages_${selectedSession.id}`) || '[]';
        const allMessages: ChatMessage[] = JSON.parse(messagesData);
        allMessages.push(newMessage);
        localStorage.setItem(`chat_messages_${selectedSession.id}`, JSON.stringify(allMessages));
        
        setMessages(allMessages);

        // 세션 업데이트
        const sessionsData = localStorage.getItem('chat_sessions') || '{}';
        const sessionsObj: Record<string, ChatSession> = JSON.parse(sessionsData);
        sessionsObj[selectedSession.id] = {
          ...selectedSession,
          lastMessage: text,
          lastAt: Date.now(),
          updatedAt: Date.now(),
        };
        localStorage.setItem('chat_sessions', JSON.stringify(sessionsObj));
        
        // 세션 목록 업데이트
        loadSessions();
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

  // 통계
  const openSessions = sessions.filter((s) => s.open);
  const unreadCount = sessions.filter((s) => hasUnreadMessages(s.id)).length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E1C10]">고객 지원 채팅</h1>
          <p className="text-sm text-[#2E1C10]/60">
            실시간 1:1 고객 문의 관리
          </p>
        </div>
        <Button
          variant="outline"
          onClick={loadSessions}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 세션</CardDescription>
            <CardTitle className="text-3xl">{sessions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 inline mr-1" />
              누적 문의
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>진행 중</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{openSessions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <Clock className="w-3 h-3 inline mr-1" />
              열린 세션
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>미응답</CardDescription>
            <CardTitle className="text-3xl text-red-600">{unreadCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              답변 필요
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 미응답 알림 */}
      {unreadCount > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {unreadCount}개의 세션에 답변이 필요합니다.
          </AlertDescription>
        </Alert>
      )}

      {/* 채팅 UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* 세션 목록 (좌측) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>문의 목록</CardTitle>
            <CardDescription>
              미응답 우선 정렬
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  문의가 없습니다
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {sessions.map((session) => {
                    const unread = hasUnreadMessages(session.id);
                    const isSelected = selectedSession?.id === session.id;

                    return (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#D61C1C] text-white'
                            : unread
                            ? 'bg-red-50 hover:bg-red-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-[#2E1C10]'}`}>
                            {session.userName || session.userId.substring(0, 12)}
                          </span>
                          {unread && !isSelected && (
                            <Badge variant="destructive" className="h-5">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? 'text-white/80' : 'text-[#2E1C10]/60'}`}>
                          {session.lastMessage || '메시지 없음'}
                        </p>
                        <p className={`text-xs mt-1 ${isSelected ? 'text-white/60' : 'text-[#2E1C10]/40'}`}>
                          {new Date(session.lastAt).toLocaleString('ko-KR')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 채팅 영역 (우측) */}
        <Card className="lg:col-span-2">
          {selectedSession ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedSession.userName || selectedSession.userId}
                    </CardTitle>
                    <CardDescription>
                      세션 ID: {selectedSession.id}
                    </CardDescription>
                  </div>
                  <Badge variant={selectedSession.open ? 'default' : 'secondary'}>
                    {selectedSession.open ? '진행 중' : '종료'}
                  </Badge>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="p-4 h-[400px] flex flex-col">
                {/* 메시지 목록 */}
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <AdminMessageBubble key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* 입력 영역 */}
                <div className="mt-4">
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
                      placeholder="답변을 입력하세요..."
                      disabled={sending || !selectedSession.open}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputText.trim() || sending || !selectedSession.open}
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
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p>세션을 선택하세요</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

/**
 * 관리자용 메시지 말풍선
 */
function AdminMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.from === 'user';
  const isBot = message.from === 'bot';

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
      <div className="max-w-[75%]">
        {/* 보낸 사람 */}
        <p className={`text-xs text-[#2E1C10]/60 mb-1 px-1 ${isUser ? 'text-left' : 'text-right'}`}>
          {isUser ? '👤 고객' : isBot ? '🤖 자동 응답' : '👨‍💼 나'}
        </p>

        {/* 메시지 */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gray-100 text-[#2E1C10]'
              : isBot
              ? 'bg-blue-50 text-[#2E1C10]'
              : 'bg-[#D61C1C] text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
        </div>

        {/* 시간 + 읽음 */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isUser ? 'justify-start' : 'justify-end'}`}>
          <p className="text-xs text-[#2E1C10]/40">
            {new Date(message.at).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {!isUser && !isBot && (
            <>
              {message.readByUser ? (
                <CheckCheck className="w-3 h-3 text-green-600" />
              ) : (
                <Check className="w-3 h-3 text-[#2E1C10]/40" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
