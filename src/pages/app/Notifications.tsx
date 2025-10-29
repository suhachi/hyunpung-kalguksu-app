/**
 * 알림함 페이지
 * 푸시 알림 내역 조회 및 관리
 * Phase 3-6: 푸시 알림 시스템
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Bell, BellOff, CheckCheck, ArrowLeft, Settings } from 'lucide-react';
import { toast } from 'sonner';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  markAsClicked,
} from '../../lib/notifications.api';
import type { Notification } from '../../types/notification';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock user ID (실제로는 인증된 사용자 ID 사용)
  const userId = 'mock-user-1';

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications(userId, 50);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      toast.error('알림을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('모든 알림을 읽음으로 표시했습니다');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('처리 중 오류가 발생했습니다');
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    // 읽음 및 클릭 처리
    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }
    await markAsClicked(notification.id);

    // 알림 타입에 따라 페이지 이동
    switch (notification.type) {
      case 'order_received':
      case 'order_cooking':
      case 'order_ready':
      case 'order_delivering':
      case 'order_completed':
      case 'order_cancelled':
        if (notification.data?.orderId) {
          navigate(`/order/${notification.data.orderId}`);
        }
        break;
      case 'coupon_issued':
        navigate('/coupons');
        break;
      case 'points_earned':
        navigate('/points');
        break;
      case 'review_reminder':
        if (notification.data?.orderId) {
          navigate(`/review/${notification.data.orderId}`);
        }
        break;
      case 'review_reply':
        navigate('/reviews');
        break;
      default:
        // 기타 알림은 클릭 처리만
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      order_received: '✅',
      order_cooking: '👨‍🍳',
      order_ready: '🍜',
      order_delivering: '🚚',
      order_completed: '✅',
      order_cancelled: '❌',
      coupon_issued: '🎁',
      points_earned: '💰',
      review_reminder: '✍️',
      review_reply: '💬',
      promotion: '🎉',
      system: '📢',
    };
    return icons[type] || '🔔';
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return '방금 전';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;

    return date.toLocaleDateString('ko-KR');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">알림</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg">알림</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </div>

            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                모두 읽음
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="max-w-md mx-auto p-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BellOff className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">알림이 없습니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all ${
                  notification.read
                    ? 'bg-white'
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {notification.body}
                        </p>
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
