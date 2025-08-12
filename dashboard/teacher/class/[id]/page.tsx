"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, BookOpen, Plus, Search, Clock, Trophy, Star, Zap, ArrowLeft } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClassDetailPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [quizDialog, setQuizDialog] = useState(false)
  const router = useRouter()
  const params = useParams()
  const classId = params.id as string

  // Find the class from mock data
  const teacher = mockData.schools[0].teachers[0]
  const classData = teacher.classes.find((cls) => cls.id === classId) || teacher.classes[0]

  const filteredStudents = classData.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const getPerformanceBadge = (student: any) => {
    if (student.completionRate >= 80 && student.accuracy >= 80) {
      return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">🏆 Excellent</Badge>
    }
    if (student.completionRate >= 60 && student.accuracy >= 70) {
      return <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">⭐ Good</Badge>
    }
    if (student.isAtRisk) {
      return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">🚨 At Risk</Badge>
    }
    return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">📈 Improving</Badge>
  }

  return (
    <DashboardLayout role="teacher" title={`Class: ${classData.name}`}>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4 bg-black/40 border-[#116a38] text-white hover:bg-[#116a38]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Class Header */}
        <Card className="bg-black/20 border-[#116a38] achievement-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#6cbd45]">
              <div className={`w-4 h-4 rounded-full ${getSubjectColor(classData.subject)} animate-pulse`} />
              {classData.name} - {classData.subject}
              <Badge className="level-badge ml-2">Level {Math.floor(classData.avgCompletion / 20) + 1}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">Total Students</p>
                <p className="text-2xl font-bold text-white">{classData.students.length}</p>
                <p className="text-xs text-[#6cbd45]">Active learners</p>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">Avg Completion</p>
                <p className="text-2xl font-bold text-white">{classData.avgCompletion}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div className="xp-bar h-full" style={{ width: `${classData.avgCompletion}%` }}></div>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">Avg Accuracy</p>
                <p className="text-2xl font-bold text-white">{classData.avgAccuracy}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full"
                    style={{ width: `${classData.avgAccuracy}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">At-Risk Students</p>
                <p className="text-2xl font-bold text-red-400">{classData.atRiskCount}</p>
                <p className="text-xs text-gray-300">Need attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Quizzes</CardTitle>
              <BookOpen className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{classData.activeQuizzes}</div>
              <p className="text-xs text-gray-300">Currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Quizzes</CardTitle>
              <Clock className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{classData.totalQuizzes}</div>
              <p className="text-xs text-gray-300">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Top Performers</CardTitle>
              <Trophy className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {classData.students.filter((s) => s.completionRate >= 80 && s.accuracy >= 80).length}
              </div>
              <p className="text-xs text-gray-300">Excellent students</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Class XP</CardTitle>
              <Star className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {classData.students.reduce((acc, s) => acc + s.xp, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-300">Total earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Heroes
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {classData.students.length} Students
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 text-white bg-black/40 border-[#116a38]"
                  />
                </div>
                <Dialog open={quizDialog} onOpenChange={setQuizDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Quest
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-black/90 border-[#116a38]">
                    <DialogHeader>
                      <DialogTitle className="text-[#6cbd45] text-xl">Create New Learning Quest</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">Quest Type</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Choose quest type..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#116a38]">
                              <SelectItem value="quiz">📝 Knowledge Quiz</SelectItem>
                              <SelectItem value="assignment">📚 Assignment</SelectItem>
                              <SelectItem value="project">🎯 Project</SelectItem>
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
                              <SelectItem value="bronze">🥉 Bronze Quest (Easy)</SelectItem>
                              <SelectItem value="silver">🥈 Silver Challenge (Medium)</SelectItem>
                              <SelectItem value="gold">🥇 Gold Master (Hard)</SelectItem>
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">XP Reward</label>
                          <Input type="number" placeholder="500" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">Time Limit (minutes)</label>
                          <Input type="number" placeholder="30" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                        🚀 Launch Quest
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents
                .sort((a, b) => b.xp - a.xp)
                .map((student, index) => (
                  <Card
                    key={student.id}
                    className={`game-card cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in ${
                      index < 3 ? "achievement-glow" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3 relative">
                      {/* Rank indicator for top 3 */}
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                          <Badge
                            className={`${
                              index === 0
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                : index === 1
                                  ? "bg-gradient-to-r from-gray-300 to-gray-500"
                                  : "bg-gradient-to-r from-amber-600 to-amber-800"
                            } text-black font-bold animate-pulse`}
                          >
                            #{index + 1}
                          </Badge>
                        </div>
                      )}

                      {/* Level indicator */}
                      <div className="absolute -top-2 -left-2">
                        <Badge className="level-badge text-xs">LVL {student.level}</Badge>
                      </div>

                      <div className="flex items-center justify-between mb-2 mt-2">
                        <CardTitle className="text-lg text-white">{student.name}</CardTitle>
                        {student.isAtRisk && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            🚨 At Risk
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs">
                          🔥 {student.streak} day streak
                        </Badge>
                        <Badge variant="outline" className="text-gray-300 text-xs">
                          {student.badges.length} badges
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* Progress indicators */}
                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Completion Rate</span>
                            <span className="font-bold text-[#6cbd45]">{student.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="xp-bar h-full transition-all duration-1000"
                              style={{ width: `${student.completionRate}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Accuracy Rate</span>
                            <span className="font-bold text-yellow-400">{student.accuracy}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full transition-all duration-1000"
                              style={{ width: `${student.accuracy}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Performance badge */}
                        <div className="flex justify-center">{getPerformanceBadge(student)}</div>

                        {/* XP and level info */}
                        <div className="flex justify-between items-center pt-2 border-t border-[#116a38]">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-bold">{student.xp.toLocaleString()} XP</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            Last active: {new Date(student.lastActive).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-[#116a38] to-[#6cbd45] hover:from-[#6cbd45] hover:to-[#8ed55a] text-white font-bold transition-all duration-300 hover:scale-105"
                        onClick={() => router.push(`/dashboard/teacher/student/${student.id}`)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        View Student Profile
                      </Button>
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
