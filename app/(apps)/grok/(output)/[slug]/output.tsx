"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  ArrowRightCircle,
  Trophy,
  MessageCircle,
  Rocket,
  AlertTriangle,
  TrendingUp,
  Heart,
  Repeat,
  Zap,
  Star,
  MessageSquare,
  Clock,
  Sparkles,
  Flame,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/dashboard/share";
import { type OutputProps } from "./types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Output({ generationData }: OutputProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  if (!generationData?.parameters) {
    return <div>Loading...</div>;
  }

  const {
    seoMetadata,
    launchStats,
    timeline,
    topComments,
    makerMistakes,
    competitorDrama,
    plotTwists,
    bingoCard,
    founderProfile,
  } = generationData.parameters;

  // Validate required data
  if (!seoMetadata || !launchStats || !timeline || !founderProfile) {
    return <div>Missing required data</div>;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-50 border-b border-orange-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Navigation and Share */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <Link href="/apps/producthunt">
              <Button
                variant="outline"
                className="hover:text-orange-500 hover:bg-white/80 transition-all"
              >
                <ArrowRightCircle className="w-4 h-4 mr-2" />
                Simulate Another Launch
              </Button>
            </Link>
            <ShareButtons
              text={`${seoMetadata.title} Launch Score: ${launchStats.launchScore}% 🚀`}
              path={window.location.pathname}
              marginTop="mt-0"
            />
          </div>

          {/* Launch Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard
              icon={<Trophy className="w-6 h-6 text-orange-500" />}
              label="Upvotes"
              value={launchStats.upvotes}
              gradient="from-orange-500/10 to-amber-500/10"
            />
            <StatsCard
              icon={<MessageCircle className="w-6 h-6 text-blue-500" />}
              label="Comments"
              value={launchStats.comments}
              gradient="from-blue-500/10 to-indigo-500/10"
            />
            <StatsCard
              icon={<TrendingUp className="w-6 h-6 text-green-500" />}
              label="Featured"
              value={
                launchStats.featured
                  ? "Yes! 🎉"
                  : `No ${launchStats.rejectionReason ? "😅" : "😢"}`
              }
              gradient="from-green-500/10 to-emerald-500/10"
            />
            <StatsCard
              icon={<Rocket className="w-6 h-6 text-purple-500" />}
              label="Launch Score"
              value={`${launchStats.launchScore}%`}
              gradient="from-purple-500/10 to-pink-500/10"
            />
          </div>

          {/* Rejection Reason (if exists and not featured) */}
          {!launchStats.featured && launchStats.rejectionReason && (
            <div className="mt-4 bg-white/80 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Why not featured: </span>
                {launchStats.rejectionReason}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid gap-8">
        {/* Upvote Chart */}
        {timeline && timeline.length > 0 && (
          <motion.div
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Upvote Progression
              </h2>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeline}>
                  <defs>
                    <linearGradient
                      id="upvoteGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(time) => time.replace(" PST", "")}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                            <p className="font-medium text-sm">{label}</p>
                            <p className="text-orange-500 text-sm">
                              {payload[0].value} upvotes
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {timeline.find((t) => t.time === label)?.event}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="upvoteCount"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#upvoteGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Founder Profile */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              The Founder
            </h2>
            <span className="text-sm bg-white px-3 py-1 rounded-full">
              Reputation: {founderProfile.reputation}/100
            </span>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium mb-2">{founderProfile.name}</p>
              <p className="text-sm text-gray-600 mb-2">
                "{founderProfile.catchphrase}"
              </p>
              <p className="text-xs text-gray-500">
                Archetype: {founderProfile.archetype}
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 italic">
                "{founderProfile.typicalTweet}"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {founderProfile.quirks.map((quirk, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-2 text-sm text-gray-600"
                >
                  {quirk}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bingo Card */}
        {bingoCard && bingoCard.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Launch Day Bingo
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500/20 border-2 border-blue-500" />
                  <span className="text-xs text-gray-600">Not Yet</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-500" />
                  <span className="text-xs text-gray-600">Happened</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white rounded-xl border border-blue-100 shadow-inner">
              {bingoCard.map((square, index) => (
                <motion.div
                  key={index}
                  className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                    square.isChecked
                      ? "bg-blue-500/10 border-blue-500"
                      : "bg-blue-50/30 border-blue-200 hover:border-blue-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute top-2 right-2">
                    {square.isChecked ? (
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors" />
                    )}
                  </div>
                  <div className="p-4">
                    <p
                      className={`text-sm ${
                        square.isChecked ? "text-blue-700" : "text-gray-600"
                      }`}
                    >
                      {square.text}
                    </p>
                    {square.isChecked && square.timestamp && (
                      <div className="mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <p className="text-xs text-blue-500">
                          {square.timestamp}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Optional: Add BINGO lines visualization */}
            <div className="mt-4 flex justify-between items-center px-2">
              <p className="text-sm text-gray-500">
                {bingoCard.filter((square) => square.isChecked).length} of 16
                squares checked
              </p>
              <p className="text-sm font-medium text-blue-600">
                {bingoCard.filter((square) => square.isChecked).length >= 4
                  ? "BINGO! 🎉"
                  : "Keep going!"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        {timeline && timeline.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Launch Timeline
            </h2>

            {/* Scrollable container with fade effect */}
            <div className="relative">
              {/* Top fade gradient */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-orange-50 to-transparent z-10" />

              {/* Bottom fade gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-amber-50 to-transparent z-10" />

              {/* Scrollable content */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-50 hover:scrollbar-thumb-orange-300">
                {timeline.map((event, index) => (
                  <TimelineEvent key={index} event={event} />
                ))}
              </div>
            </div>

            {/* Optional: Time range indicator */}
            <div className="mt-4 flex justify-between text-xs text-gray-500 px-2">
              <span>{timeline[0]?.time}</span>
              <span>{timeline[timeline.length - 1]?.time}</span>
            </div>
          </motion.div>
        )}

        {/* Plot Twists */}
        {plotTwists && plotTwists.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              Plot Twists
            </h2>
            <div className="space-y-4">
              {plotTwists.map((twist, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-pink-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-700">{twist.moment}</p>
                  </div>
                  <p className="text-sm text-gray-600 bg-pink-50/50 rounded-md p-2.5">
                    {twist.reaction}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Maker Mistakes */}
        {makerMistakes && makerMistakes.length > 0 && (
          <motion.div
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Maker Mistakes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {makerMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-red-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-sm">#{index + 1}</span>
                    <p className="text-sm text-gray-600">{mistake}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Competitor Drama and Top Comments Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Competitor Drama */}
          {competitorDrama && competitorDrama.length > 0 && (
            <motion.div
              className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-violet-500" />
                Competitor Drama
              </h2>
              <div className="space-y-4">
                {competitorDrama.map((drama, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-violet-100"
                  >
                    <p className="font-medium text-sm mb-2">
                      {drama.competitor}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      "{drama.comment}"
                    </p>
                    <p className="text-sm text-gray-500 bg-violet-50/50 rounded-md p-2.5">
                      {drama.drama}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Top Comments */}
          {topComments && topComments.length > 0 && (
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-500" />
                Memorable Comments
              </h2>
              <div className="space-y-4">
                {topComments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-indigo-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm text-indigo-600">
                        @{comment.author}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          comment.impact > 0
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        Impact: {comment.impact > 0 ? "+" : ""}
                        {comment.impact}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "{comment.comment}"
                    </p>
                    <p className="text-xs text-gray-500 bg-indigo-50/50 rounded-md p-2">
                      {comment.reaction}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function StatsCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6 hover:shadow-lg transition-all`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function TimelineEvent({ event }: { event: any }) {
  return (
    <motion.div
      className="p-4 rounded-lg bg-white border border-orange-100/50 hover:shadow-sm transition-all"
      whileHover={{ scale: 1.005 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900">
            {event.time}
          </span>
          <span className="text-sm text-orange-500">+{event.upvoteCount}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-2">{event.event}</p>
      <div className="bg-orange-50/50 rounded-md p-2.5 text-xs text-gray-600">
        {event.impact}
      </div>
    </motion.div>
  );
}
