"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Clock, TrendingUp, Search, Plus, Trophy, Star, Zap, Play } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [createDialog, setCreateDialog] = useState(false)

  // Generate mock quiz data
  const quizzes = [
    {
      id: "quiz-1",
      title: "Mathematics Mastery Challenge",
      subject: "Maths",
      difficulty: "Gold",
      questions: 15,
      timeLimit: 45,
      xpReward: 750,
      status: "Active",
      participants: 234,
      avgScore: 78,
      school: "Telecom Foundation Model School Lahore",
      teacher: "Ustad Muhammad Akram",
      createdAt: "2024-01-15",
    },
    {
      id: "quiz-2",
      title: "Science Explorer Quest",
      subject: "Science",
      difficulty: "Silver",
      questions: 12,
      timeLimit: 30,
      xpReward: 500,
      status: "Active",
      participants: 189,
      avgScore: 82,
      school: "Telecom Foundation School Karachi",
      teacher: "Miss Farah Naz",
      createdAt: "2024-01-14",
    },
    {
      id: "quiz-3",
      title: "Quranic Knowledge Challenge",
      subject: "Quranic Studies",
      difficulty: "Bronze",
      questions: 10,
      timeLimit: 25,
      xpReward: 300,
      status: "Completed",
      participants: 156,
      avgScore: 85,
      school: "Telecom Foundation School Islamabad",
      teacher: "Ustad Abdul Rahman",
      createdAt: "2024-01-13",
    },
    {
      id: "quiz-4",
      title: "English Grammar Adventure",
      subject: "English",
      difficulty: "Silver",
      questions: 20,
      timeLimit: 40,
      xpReward: 600,
      status: "Draft",
      participants: 0,
      avgScore: 0,
      school: "Telecom Foundation School Faisalabad",
      teacher: "Miss Sadia Khatoon",
      createdAt: "2024-01-16",
    },
  ]

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.school.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSubjectColor = (subject: string) => {
    const colors = {
      Maths: "bg-blue-500",
      Science: "bg-green-500",
      "Quranic Studies": "bg-purple-500",
      English: "bg-orange-500",
    }
    return colors[subject as keyof typeof colors] || "bg-gray-500"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Bronze: "bg-amber-600",
      Silver: "bg-gray-400",
      Gold: "bg-yellow-500",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-500"
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-green-500",
      Completed: "bg-blue-500",
      Draft: "bg-gray-500",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <DashboardLayout role="admin" title="Quiz Management">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Quizzes</CardTitle>
              <BookOpen className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">{quizzes.length}</div>
              <p className="text-xs text-gray-300">System wide</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Quizzes</CardTitle>
              <Play className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {quizzes.filter((q) => q.status === "Active").length}
              </div>
              <p className="text-xs text-gray-300">Currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Participants</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {quizzes.reduce((acc, quiz) => acc + quiz.participants, 0)}
              </div>
              <p className="text-xs text-gray-300">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Score</CardTitle>
              <Trophy className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {Math.round(
                  quizzes.filter((q) => q.avgScore > 0).reduce((acc, quiz) => acc + quiz.avgScore, 0) /
                    quizzes.filter((q) => q.avgScore > 0).length,
                )}
                %
              </div>
              <p className="text-xs text-gray-300">System average</p>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes Grid */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Quiz Management Center
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {quizzes.length} Quests
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300" />
                  <Input
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 text-white bg-black/40 border-[#116a38]"
                  />
                </div>
                <Dialog open={createDialog} onOpenChange={setCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Global Quest
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-black/90 border-[#116a38]">
                    <DialogHeader>
                      <DialogTitle className="text-[#6cbd45] text-xl">Create System-Wide Quest</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">Subject Realm</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Choose realm..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#116a38]">
                              <SelectItem value="maths">🔢 Maths Kingdom</SelectItem>
                              <SelectItem value="science">🧪 Science Laboratory</SelectItem>
                              <SelectItem value="quranic">📖 Quranic Studies</SelectItem>
                              <SelectItem value="english">📝 English Academy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">Difficulty Level</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Select challenge..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#116a38]">
                              <SelectItem value="bronze">🥉 Bronze Quest</SelectItem>
                              <SelectItem value="silver">🥈 Silver Challenge</SelectItem>
                              <SelectItem value="gold">🥇 Gold Master</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Quest Title</label>
                        <Input
                          placeholder="Enter epic quest name..."
                          className="text-white bg-black/40 border-[#116a38]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Quest Description</label>
                        <Textarea
                          placeholder="Describe the adventure..."
                          rows={3}
                          className="text-white bg-black/40 border-[#116a38]"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">Questions</label>
                          <Input type="number" placeholder="15" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">Time (min)</label>
                          <Input type="number" placeholder="30" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">XP Reward</label>
                          <Input type="number" placeholder="500" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                        🚀 Launch Global Quest
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  className="game-card cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3 relative">
                    <div className="absolute -top-2 -right-2">
                      <Badge className={`${getDifficultyColor(quiz.difficulty)} text-white text-xs font-bold`}>
                        {quiz.difficulty === "Bronze" ? "🥉" : quiz.difficulty === "Silver" ? "🥈" : "🥇"}{" "}
                        {quiz.difficulty}
                      </Badge>
                    </div>

                    <div className="absolute -top-2 -left-2">
                      <Badge className={`${getStatusColor(quiz.status)} text-white text-xs`}>{quiz.status}</Badge>
                    </div>

                    <div className="flex items-center justify-between mb-2 mt-2">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${getSubjectColor(quiz.subject)} animate-pulse`} />
                        {quiz.title}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs">
                        {quiz.subject}
                      </Badge>
                      <Badge variant="outline" className="text-gray-300 text-xs">
                        {quiz.questions} Questions
                      </Badge>
                    </div>

                    <div className="text-sm text-gray-400">
                      <div>🏫 {quiz.school}</div>
                      <div>👨‍🏫 {quiz.teacher}</div>
                      <div>📅 Created: {quiz.createdAt}</div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {/* Quiz stats */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-[#6cbd45]">{quiz.participants}</div>
                          <div className="text-xs text-gray-400">Participants</div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-yellow-400">{quiz.avgScore}%</div>
                          <div className="text-xs text-gray-400">Avg Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-blue-400">{quiz.timeLimit}m</div>
                          <div className="text-xs text-gray-400">Time Limit</div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-purple-400">{quiz.xpReward}</div>
                          <div className="text-xs text-gray-400">XP Reward</div>
                        </div>
                      </div>

                      {/* Progress bar for completion rate */}
                      {quiz.status === "Active" && (
                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Completion Rate</span>
                            <span className="font-bold text-[#6cbd45]">{Math.floor(Math.random() * 40) + 60}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="xp-bar h-full transition-all duration-1000"
                              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* XP and achievements */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#116a38]">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400 font-bold">{quiz.xpReward} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-blue-400 font-bold">{quiz.timeLimit}min</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button variant="outline" className="bg-black/40 border-[#116a38] text-white hover:bg-[#116a38]">
                        📊 Analytics
                      </Button>
                      <Button className="bg-gradient-to-r from-[#116a38] to-[#6cbd45] hover:from-[#6cbd45] hover:to-[#8ed55a] text-white font-bold transition-all duration-300 hover:scale-105">
                        <Zap className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
