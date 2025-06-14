"use client";

import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/utils/supabase/client";
import { Database } from "@/lib/types/supabase";
import { GroupedChatList } from "@/components/chat/sidebar/chat-history-grouped-list";

type Chat = Database["public"]["Tables"]["chats"]["Row"];
const fetcher = async (): Promise<Chat[]> => {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Auth error:", userError);
      return [];
    }

    const { data: chats, error: chatsError } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (chatsError) {
      console.error("Chats fetch error:", chatsError);
      return [];
    }

    return chats || [];
  } catch (error) {
    console.error("Fetcher error:", error);
    return [];
  }
};

interface SidebarHistoryProps {
  user?: User;
  limit?: number;
  showAllHistory?: boolean;
  setShowAllHistory?: (show: boolean) => void;
}

export function SidebarHistory({
  user,
  limit,
  showAllHistory,
  setShowAllHistory,
}: SidebarHistoryProps) {
  const { setOpenMobile } = useSidebar();
  const { id } = useParams();
  const { data: history, isLoading } = useSWR<Chat[]>(
    user ? ["chats", user.id] : null,
    fetcher,
    {
      fallbackData: [],
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="flex flex-col space-y-1">
            {[44, 32, 28, 64, 52].map((item) => (
              <div key={item} className="h-8 flex gap-2 px-2 items-center">
                <div
                  className="h-4 rounded-md flex-1 bg-sidebar-accent-foreground/10"
                  style={{ width: `${item}%` }}
                />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <div className="text-xs text-neutral-500 italic">
        Login to view chat history
      </div>
    );
  }

  return (
    <div>
      <GroupedChatList
        chats={history || []}
        currentChatId={id as string}
        setOpenMobile={setOpenMobile}
        limit={limit}
        showAllHistory={showAllHistory}
        setShowAllHistory={setShowAllHistory}
      />
    </div>
  );
}
