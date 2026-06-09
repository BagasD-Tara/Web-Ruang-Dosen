"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, User, Trophy, TrendingUp, Shield } from "lucide-react";
// import { getLeaderboard } from "@/app/lib/api/quiz";
import type { LeaderboardEntry } from "@/app/types/quiz";
import { MOCK_LEADERBOARD } from "@/app/lib/mock/quizMock";

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardMahasiswaPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<"all_time" | "this_week">("all_time");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEntries(MOCK_LEADERBOARD);
    setLoading(false);
  }, [filter]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const currentUser = entries.find((e) => e.isCurrentUser);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">RD</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">Ruang Dosen</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Leaderboard</h1>
          <p className="text-gray-500 mt-1">
            Rewarding academic excellence and consistent engagement across the semester.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            {top3.length > 0 && (
              <div className="flex items-end justify-center gap-4 mb-8">
                {/* Rank 2 */}
                {top3[1] && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center w-56 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center overflow-hidden relative">
                      <User className="w-8 h-8 text-gray-500" />
                      <span className="absolute -bottom-1 -right-1 text-xl">🥈</span>
                    </div>
                    <p className="font-bold text-gray-900">{top3[1].studentName}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                      {top3[1].totalXp.toLocaleString()} XP
                    </p>
                  </div>
                )}
                {/* Rank 1 */}
                {top3[0] && (
                  <div className="bg-blue-600 rounded-2xl p-6 text-center w-64 shadow-lg -mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center overflow-hidden relative border-4 border-white/40">
                      <User className="w-10 h-10 text-white/60" />
                      <span className="absolute -bottom-1 -right-1 text-2xl">🥇</span>
                    </div>
                    <p className="font-bold text-white text-lg">{top3[0].studentName}</p>
                    <span className="inline-block mt-2 bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {top3[0].totalXp.toLocaleString()} XP
                    </span>
                  </div>
                )}
                {/* Rank 3 */}
                {top3[2] && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center w-56 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-3 flex items-center justify-center overflow-hidden relative">
                      <User className="w-8 h-8 text-gray-500" />
                      <span className="absolute -bottom-1 -right-1 text-xl">🥉</span>
                    </div>
                    <p className="font-bold text-gray-900">{top3[2].studentName}</p>
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                      {top3[2].totalXp.toLocaleString()} XP
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg">Ranking List</h2>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setFilter("this_week")}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                      filter === "this_week"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    This Week
                  </button>
                  <button
                    onClick={() => setFilter("all_time")}
                    className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                      filter === "all_time"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50">
                    <th className="text-left px-6 py-3">Position</th>
                    <th className="text-left px-6 py-3">Student Name</th>
                    <th className="text-left px-6 py-3">Course Completion</th>
                    <th className="text-right px-6 py-3">Total XP</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((entry) => (
                    <tr
                      key={entry.studentId}
                      className={`border-t border-gray-100 ${
                        entry.isCurrentUser ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          entry.isCurrentUser
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {MEDAL[entry.rank] ?? entry.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                            {entry.studentName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {entry.isCurrentUser
                                ? `You (${entry.studentName})`
                                : entry.studentName}
                            </p>
                            {entry.isCurrentUser && (
                              <p className="text-xs text-gray-400">Last active: 2h ago</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${entry.courseCompletion}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{entry.courseCompletion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                        {entry.totalXp.toLocaleString()} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-gray-100 text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Load More Rankings ▾
                </button>
              </div>
            </div>

            {/* Bottom stats (untuk current user) */}
            {currentUser && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-semibold text-gray-700">Achievement Milestone</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Top 5%</p>
                  <p className="text-xs text-gray-500 mt-1">You are among the most active participants this semester.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <p className="text-sm font-semibold text-gray-700">Weekly Velocity</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">+1,240 XP</p>
                  <p className="text-xs text-gray-500 mt-1">Consistent improvement in module completion speed.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-semibold text-gray-700">Next Reward</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">Academic Badge</p>
                  <p className="text-xs text-gray-500 mt-1">50 XP until next level</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-blue-700">Ruang Dosen</p>
            <p className="text-xs text-gray-400">© 2024 Ruang Dosen Academic Platform. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <a href="#" className="hover:text-gray-600">Help Center</a>
            <a href="#" className="hover:text-gray-600">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}