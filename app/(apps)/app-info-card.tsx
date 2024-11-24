import AppInfo from "@/components/input/AppInfo";
import {
  Code2,
  Component,
  Lock,
  BarChart,
  FileCode,
  Server,
  Brain,
  Database,
  Clock,
  Sparkles,
} from "lucide-react";

interface AppInfoCardProps {
  title: string;
  colorScheme: {
    background: string;
    border: string;
    text: string;
    textMuted: string;
  };
  overview: {
    icon: React.ReactNode;
    title: string;
    description: string;
    docsLink?: {
      href: string;
      text: string;
    };
  };
  animation: React.ReactNode;
  implementation: {
    frontend: {
      path: string;
      description: string;
    };
    backend: {
      path: string;
      description: string;
    };
    ai: {
      path: string;
      description: string;
    };
  };
}

export function AppInfoCard({
  title,
  colorScheme,
  overview,
  animation,
  implementation,
}: AppInfoCardProps) {
  return (
    <AppInfo title={title} background={colorScheme.background}>
      {/* Quick Start Section */}
      <div
        className={`mt-4 p-3 bg-white/80 rounded-xl border-2 ${colorScheme.border} shadow-sm`}
      >
        <h3
          className={`font-medium text-base mb-2 ${colorScheme.text} flex items-center gap-2`}
        >
          {overview.icon}
          {overview.title}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {overview.description}
          {overview.docsLink && (
            <>
              {" "}
              <a
                href={overview.docsLink.href}
                target="_blank"
                className={`${colorScheme.text} font-medium hover:underline`}
              >
                {overview.docsLink.text}
              </a>
            </>
          )}
        </p>
      </div>

      <div className="py-4 flex justify-center">{animation}</div>

      {/* What's Included Section */}
      <div
        className={`space-y-3 p-3 bg-white/80 rounded-xl border-2 ${colorScheme.border} shadow-sm`}
      >
        <h3
          className={`font-medium ${colorScheme.text} flex items-center gap-2`}
        >
          <Component className="w-4 h-4" />
          What's Included
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* AI Integration */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Brain className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                AI Integration
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Integrations with OpenAI, Anthropic, xAI, Groq, Replicate,
              Elevenlabs and more
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              40+ hours saved
            </div>
          </div>

          {/* Frontend Components */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Code2 className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Frontend Components
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Landing pages, UI Components, Input Forms, Response Display
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              30+ hours saved
            </div>
          </div>

          {/* Backend Integration */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Backend Integration
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              API Routes, Auth, Rate limits, Tool Calls, JSON Schemas, Scraping
              tools
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              25+ hours saved
            </div>
          </div>

          {/* Infrastructure */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Database className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Infrastructure
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Supabase auth & database, RAG & vector embeddings, Emails, Storage
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              30+ hours saved
            </div>
          </div>

          {/* Monetization */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Lock className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Monetization
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Stripe/LemonSqueezy, Credit-based usage limits
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              20+ hours saved
            </div>
          </div>

          {/* Analytics & SEO */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <BarChart className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Analytics & SEO
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              PostHog, Meta Tags, Sitemap, Programmatic SEO-ready
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              15+ hours saved
            </div>
          </div>

          {/* Other AI Demo Apps */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                10 AI Demo Apps
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Chat, Text, Vision, Audio, PDF Analysis, Image Generation & more
            </p>
            <div
              className={`mt-2 pl-6 text-xs ${colorScheme.text} font-medium`}
            >
              100+ hours saved
            </div>
          </div>

          {/* Total Time Saved */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Total Development Time
              </span>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Estimated time saved compared to building from scratch
            </p>
            <div
              className={`mt-2 pl-6 text-md ${colorScheme.text} font-medium`}
            >
              260+ hours saved
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Details */}
      <div
        className={`mt-3 space-y-3 p-3 bg-white/80 rounded-xl border-2 ${colorScheme.border} shadow-sm`}
      >
        <h3
          className={`font-medium ${colorScheme.text} flex items-center gap-2`}
        >
          <FileCode className="w-4 h-4" />
          Implementation Details
        </h3>

        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Code2 className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Frontend
              </span>
            </div>
            <code className="text-xs bg-white px-2 py-1 rounded font-mono block ml-6 text-gray-600">
              {implementation.frontend.path}
            </code>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              {implementation.frontend.description}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                Backend API
              </span>
            </div>
            <code className="text-xs bg-white px-2 py-1 rounded font-mono block ml-6 text-gray-600">
              {implementation.backend.path}
            </code>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              {implementation.backend.description}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1.5">
              <Brain className={`w-4 h-4 ${colorScheme.textMuted}`} />
              <span className="font-medium text-sm text-gray-900">
                AI Logic
              </span>
            </div>
            <code className="text-xs bg-white px-2 py-1 rounded font-mono block ml-6 text-gray-600">
              {implementation.ai.path}
            </code>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              {implementation.ai.description}
            </p>
          </div>
        </div>
      </div>
    </AppInfo>
  );
}
