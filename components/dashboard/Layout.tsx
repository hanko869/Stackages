import { Suspense } from "react";
import { ContentFooter } from "@/components/dashboard/Footer";
import Footer from "@/components/footers/Footer-1";
import { createClient } from "@/lib/utils/supabase/server";
import { Container } from "@/components/dashboard/Container";
import LoadingSpinner from "@/components/Loading";
import { ToolConfig } from "@/lib/types/toolconfig";
import { companyConfig } from "@/config";
import { UnifiedSidebar } from "@/components/dashboard/UnifiedSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  toolConfig: ToolConfig;
  showGreeting?: boolean;
}

export async function DashboardLayout({
  children,
  toolConfig,
  showGreeting = true,
}: DashboardLayoutProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div
        className="flex overflow-hidden bg-gray-100"
        data-theme={companyConfig.company.theme}
      >
        <UnifiedSidebar user={user} showChatHistory={false} />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <MainContent
                toolConfig={toolConfig}
                showGreeting={showGreeting}
                user={user}
              >
                <div className="pt-5">{children}</div>
              </MainContent>
            </Suspense>
            <ContentFooter />
          </div>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer
          companyConfig={toolConfig.company!}
          footerConfig={toolConfig.footerApp!}
        />
      </Suspense>
    </>
  );
}

async function MainContent({
  children,
  toolConfig,
  showGreeting,
  user,
}: {
  children: React.ReactNode;
  toolConfig: ToolConfig;
  showGreeting: boolean;
  user: any;
}) {
  const supabase = createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  let credits;
  if (user && toolConfig.paywall) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    credits = profile.credits;
  }

  return (
    <Container>
      {showGreeting && (
        <div className="flex items-center justify-between mb-8 px-6 py-4 bg-gray-50/50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-100">
              <span className="text-lg">👋🏼</span>
            </div>
            <div className="flex items-baseline gap-2">
              {user ? (
                <>
                  <span className="text-sm text-gray-500">Welcome back,</span>
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold text-gray-500">
                    Hi there,
                  </span>
                  <span className="text-sm text-gray-500">
                    log in below to start using the app
                  </span>
                </>
              )}
            </div>
          </div>
          {credits !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
              <span className="text-sm text-gray-600">
                {credits.toLocaleString()} credits
              </span>
            </div>
          )}
        </div>
      )}
      {children}{" "}
    </Container>
  );
}
