/**
 * 알림 인박스 페이지
 * 알림 목록 표시 및 딥링크 처리
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Package, Ticket, Star, CreditCard, X, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '../../lib/notifications.api';
import { getCurrentUser } from '../../lib/auth';
import type { Notification } from '../../types/notification';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'sonner';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  order_status_changed: <Package className="w-5 h-5 text-[#D61C1C]" />,
  coupon_issued: <Ticket className="w-5 h-5 text-[#C7A45A]" />,
  review_reminder: <Star className="w-5 h-5 text-[#F37021]" />,
  points_earned: <CreditCard className="w-5 h-5 text-[#D61C1C]" />,
};

const TYPE_LABELS: Record<string, string> = {
  order_status_changed: '주문 알림',
  coupon_issued: '쿠폰',
  review_reminder: '리뷰',
  points_earned: '포인트',
  system: '시스템',
};

export function Inbox() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);

  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  async function loadNotifications() {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getNotifications(user.uid);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      toast.error('알림을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }

  async function handleNotificationClick(notification: Notification) {
    if (!user) return;

    // 읽음 처리
    if (!notification.read) {
      setMarkingAsRead(notification.id);
      try {
        await markAsRead(user.uid, notification.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        );
      } catch (error) {
        console.error('Failed to mark as read:', error);
      } finally {
        setMarkingAsRead(null);
      }
    }

    // 딥링크 처리
    if (notification.deepLink) {
      navigate(notification.deepLink);
    } else if (notification.type === 'order_status_changed' && notification.data?.orderId) {
      navigate(`/orders/${notification.data.orderId}`);
    } else if (notification.type === 'coupon_issued') {
      navigate('/coupons');
    } else if (notification.type === 'review_reminder' && notification.data?.orderId) {
      navigate(`/review/${notification.data.orderId}`);
    } else if (notification.type === 'points_earned') {
      navigate('/points');
    }
  }

  async function handleMarkAllAsRead() {
    if (!user) return;

    try {
      await markAllAsRead(user.uid);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('모든 알림을 읽음 처리했습니다');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('알림 읽음 처리에 실패했습니다');
    }
  }

  async function handleDeleteNotification(notificationId: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) return;

    try {
      await deleteNotification(user.uid, notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      toast.success('알림이 삭제되었습니다');
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast.error('알림 삭제에 실패했습니다');
    }
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-[#2E1C10]/60">로그인이 필요합니다</p>
        <Button onClick={() => navigate('/login')} className="mt-4">
          로그인
        </Button>
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 pb-32">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#D61C1C]" />
          <div>
            <h1 className="text-2xl text-[#2E1C10]">알림</h1>
            <p className="text-sm text-[#2E1C10]/60">
              {unreadCount > 0 && (
                <Badge variant="destructive" className="mr-2">
                  {unreadCount}개의 읽지 않은 알림
                </Badge>
              )}
              총 {notifications.length}건
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            모두 읽음
          </Button>
        )}
      </div>

      {/* 알림 목록 */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D61C1C]"></div>
        </div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-[#2E1C10]/20" />
            <p className="text-[#2E1C10]/60">알림이 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onClick={() => handleNotificationClick(notification)}
              onDelete={(e) => handleDeleteNotification(notification.id, e)}
              markingAsRead={markingAsRead === notification.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 개별 알림 카드
 */
interface NotificationCardProps {
  notification: Notification;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
  markingAsRead: boolean;
}

function NotificationCard({
  notification,
  onClick,
  onDelete,
  markingAsRead,
}: NotificationCardProps) {
  const createdAt = notification.createdAt instanceof Date
    ? notification.createdAt
    : typeof notification.createdAt === 'string'
      ? new Date(notification.createdAt)
      : new Date();

  const typeIcon = TYPE_ICONS[notification.type] || <Bell className="w-5 h-5 text-[#2E1C10]/60" />;
  const typeLabel = TYPE_LABELS[notification.type] || '알림';

  return (
    <Card
      className={`cursor-pointer transition-colors ${
        !notification.read
          ? 'border-[#D61C1C] bg-[#D61C1C]/5'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{typeIcon}</div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {typeLabel}
                </Badge>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-[#D61C1C]" />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <h3 className={`font-semibold ${!notification.read ? 'text-[#2E1C10]' : 'text-[#2E1C10]/80'}`}>
              {notification.title}
            </h3>
            <p className="text-sm text-[#2E1C10]/60 mt-1">{notification.body}</p>

            <p className="text-xs text-[#2E1C10]/40 mt-2">
              {format(createdAt, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

