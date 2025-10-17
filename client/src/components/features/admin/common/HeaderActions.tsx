import { Link } from "lucide-react";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shadcn/ui/dropdown-menu";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/src/redux/features/notification/notificationApi";

import socketIO from "socket.io-client";
const ENDPOINT =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:5000";
const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});

const HeaderActions = () => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isLoading, isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const [open, setOpen] = useState(false);

  // const [audio] = useState(new Audio("/audios/notification.mp3"));
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dnrxdohf7/video/upload/v1754043411/mixkit-gaming-lock-2848_utxeax.wav"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(
          (notification: any) => notification.status === "unread"
        )
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data: any) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus({ id });
  };

  const unreadCount = useMemo(
    () => notifications?.length || 0,
    [notifications]
  );

  return (
    <div className="flex items-center  gap-5 bg-transparent p-5">
      <ThemeToggle />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Notifications"
            className="relative inline-flex items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <IoNotifications size={20} className="cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] leading-4 text-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-0 overflow-hidden bg-surface dark:bg-surface-dark">
          <DropdownMenuLabel className="text-sm font-semibold py-3 px-3 flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-80 overflow-y-auto">
            {notifications && notifications.length > 0 ? (
              notifications.map((n: any) => (
                <DropdownMenuItem
                  key={n._id}
                  className="flex items-start gap-3 py-3 px-3 dark:hover:bg-gray-700 hover:bg-gray-200"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="mt-0.5 size-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={n.title}>
                      {n.title}
                    </p>
                    <p
                      className="text-xs text-muted-foreground line-clamp-2"
                      title={n.message}
                    >
                      {n.message}
                    </p>
                    {n.createdAt && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    className="text-xs text-primary hover:underline shrink-0 cursor-pointer"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleNotificationStatusChange(n._id);
                      refetch();
                    }}
                  >
                    Mark read
                  </button>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderActions;
