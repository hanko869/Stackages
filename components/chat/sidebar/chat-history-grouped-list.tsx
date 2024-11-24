"use client";

import { isToday, isYesterday, subMonths, subWeeks } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon, Check, X } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/types/supabase";
import { twMerge } from "tailwind-merge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

// Memoized group header with optional show all button
const GroupHeader = memo(function GroupHeader({
  title,
  showAllButton,
}: {
  title: string;
  showAllButton?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-1 px-2">
      <span className="text-xs font-semibold text-neutral-500">{title}</span>
      {showAllButton}
    </div>
  );
});

// Memoized chat item
const ChatItem = memo(function ChatItem({
  chat,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  chat: Chat;
  isActive: boolean;
  onDelete: (chatId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="group flex items-center justify-between py-1 hover:text-primary/50 transition-colors">
        <Link
          href={`/chat/${chat.id}`}
          onClick={() => setOpenMobile(false)}
          className={twMerge(
            "flex-1 truncate text-xs",
            isActive && "text-sky-500"
          )}
        >
          {chat.title || "New Chat"}
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteDialog(true);
          }}
          className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
        >
          <TrashIcon className="h-3 w-3" />
        </button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(chat.id);
                setShowDeleteDialog(false);
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

// Group chats by date
function groupChatsByDate(chats: Chat[]): GroupedChats {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.created_at);

      if (isToday(chatDate)) {
        groups.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat);
      } else if (chatDate > oneWeekAgo) {
        groups.lastWeek.push(chat);
      } else if (chatDate > oneMonthAgo) {
        groups.lastMonth.push(chat);
      } else {
        groups.older.push(chat);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats
  );
}

export function GroupedChatList({
  chats,
  currentChatId,
  setOpenMobile,
  limit,
  showAllHistory,
  setShowAllHistory,
}: {
  chats: Chat[];
  currentChatId: string;
  setOpenMobile: (open: boolean) => void;
  limit?: number;
  showAllHistory?: boolean;
  setShowAllHistory?: (show: boolean) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();

  // Apply limit here
  const displayedChats = showAllHistory ? chats : chats.slice(0, limit);
  const groupedChats = groupChatsByDate(displayedChats);

  console.log({
    totalChats: chats.length,
    displayedChats: displayedChats.length,
    limit,
    shouldShowButton: Boolean(chats.length > (limit || 0) && setShowAllHistory),
  });

  // Create the show all button if we have more chats than the limit
  const showAllButton = chats.length > (limit || 0) && setShowAllHistory && (
    <button
      onClick={() => {
        if (setShowAllHistory) {
          setShowAllHistory(!showAllHistory);
        }
      }}
      className="text-[10px] text-neutral-500 hover:text-primary transition-colors"
    >
      {showAllHistory ? "Show less" : "Show all"}
    </button>
  );

  // Find the first non-empty group
  const firstGroup =
    groupedChats.today.length > 0
      ? "today"
      : groupedChats.yesterday.length > 0
      ? "yesterday"
      : groupedChats.lastWeek.length > 0
      ? "lastWeek"
      : groupedChats.lastMonth.length > 0
      ? "lastMonth"
      : groupedChats.older.length > 0
      ? "older"
      : null;

  const handleDelete = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat?id=${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete chat");

      toast({
        description: (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-teal-500" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Chat deleted successfully</p>
                <p className="text-sm text-gray-500">
                  The chat and its messages have been removed
                </p>
              </div>
            </div>
          </div>
        ),
        duration: 4000,
        className: "bg-white border-teal-200 rounded-xl",
      });

      if (chatId === currentChatId) {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast({
        variant: "destructive",
        description: (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Failed to delete chat</p>
                <p className="text-sm text-gray-500">
                  Please try again or contact support if the issue persists
                </p>
              </div>
            </div>
          </div>
        ),
        duration: 4000,
        className: "bg-white border-red-200 rounded-xl",
      });
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {groupedChats.today.length > 0 && (
            <>
              <GroupHeader
                title="Today"
                showAllButton={
                  firstGroup === "today" ? showAllButton : undefined
                }
              />
              {groupedChats.today.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </>
          )}

          {groupedChats.yesterday.length > 0 && (
            <>
              <GroupHeader
                title="Yesterday"
                showAllButton={
                  firstGroup === "yesterday" ? showAllButton : undefined
                }
              />
              {groupedChats.yesterday.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </>
          )}

          {groupedChats.lastWeek.length > 0 && (
            <>
              <GroupHeader title="Last 7 days" />
              {groupedChats.lastWeek.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </>
          )}

          {groupedChats.lastMonth.length > 0 && (
            <>
              <GroupHeader title="Last 30 days" />
              {groupedChats.lastMonth.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </>
          )}

          {groupedChats.older.length > 0 && (
            <>
              <GroupHeader title="Older" />
              {groupedChats.older.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
