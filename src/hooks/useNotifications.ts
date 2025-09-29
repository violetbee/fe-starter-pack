import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../store/index";
import instance from "../utils/axios";

interface Notification {
  id: string;
  title: string;
  message: string;
  status: string;
  createdAt: string;
  isRead: boolean;
  userId: string;
  type: string;
  data: {
    requestId: string;
    status: "APPROVED" | "REJECTED";
    postType?: string;
    slug?: string;
  };
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  markAsReadAsync: (notificationId: string) => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: notificationsData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await instance.get("/notification");
      return response.data.data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  const markAsReadAsync = useCallback(async (notificationId: string) => {
    try {
      await instance.patch(`/notification/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  const handleNewNotification = useCallback(
    (notification: Notification) => {
      setTimeout(() => {
        if (notification.type === "reward_earned") {
          queryClient.invalidateQueries({
            queryKey: ["enrollment-status"],
          });
        }
      }, 0);

      setNotifications((prev) => {
        const exists = prev.some((n) => n.id === notification.id);
        if (exists) {
          return prev;
        }
        return [notification, ...prev];
      });
    },
    [queryClient, dispatch]
  );

  useEffect(() => {
    if (socket && user && session?.accessToken) {
      return;
    }

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }

    if (!user || !session?.accessToken) {
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_API_WS, {
      auth: {
        token: session.accessToken,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      upgrade: true,
      rememberUpgrade: true,
      forceNew: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", (reason: string) => {
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error: any) => {
      setIsConnected(false);
    });

    newSocket.on("notification", (notification: Notification) => {
      setNotifications((prev) => {
        const exists = prev.some((n) => n.id === notification.id);
        if (exists) {
          return prev;
        }
        return [notification, ...prev];
      });

      setTimeout(() => {
        if (notification.type === "reward_earned") {
          const currentQueryClient = queryClient;
          const currentDispatch = dispatch;

          currentQueryClient.invalidateQueries({
            queryKey: ["enrollment-status"],
          });
        }
      }, 100);
    });

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
    };
  }, []);

  const markAsRead = useCallback(
    (notificationId: string) => {
      if (socket) {
        socket.emit("notification_read", { notificationId });
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    },
    [socket]
  );

  const markAllAsRead = useCallback(() => {
    if (socket) {
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

      socket.emit("notifications_read", { notificationIds: unreadIds });
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
    }
  }, [socket, notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    markAsReadAsync,
  };
};
