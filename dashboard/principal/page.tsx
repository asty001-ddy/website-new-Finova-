"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, BookOpen, TrendingUp, MessageSquare, Search, Send, Award, Trophy, Star, Zap } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function PrincipalDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messageDialog, setMessageDialog] = useState(false)
  const router = useRouter()

  // For demo, using first school
  const school = mockData.schools[0]
  const teachers = school.teachers

  const filteredTeachers = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalStudents = teachers.reduce(
    (acc, teacher) => acc + teacher.classes.reduce((classAcc, cls) => classAcc + cls.students.length, 0),
    0,
  )

  const avgCompletion = Math.round(teachers.reduce((acc, teacher) => acc + teacher.avgCompletion, 0) / teachers.length)
  const avgAccuracy = Math.round(teachers.reduce((acc, teacher) => acc + teacher.avgAccuracy, 0) / teachers.length)

  const getPerformanceBadge = (score: number) => {
    if (score >= 80)
      return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">🏆 Excellent</Badge>
    if (score >= 60) return <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">⭐ Good</Badge>
    return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">🎯 Needs Support</Badge>
  }

  return (
    <DashboardLayout role="principal" title="Principal Dashboard">
      <div className="space-y-6">
        {/* Header Info */}
        <Card className="bg-black/20 border-[#116a38] achievement-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#6cbd45]">
              <Award className="h-5 w-5 text-[#6cbd45]" />
              {school.principal.name} - {school.name}
              <Badge className="level-badge ml-2">Level {school.principal.level}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">School Score</p>
                <p className="text-2xl font-bold text-white">{school.principalScore}%</p>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div className="xp-bar h-full" style={{ width: `${school.principalScore}%` }}></div>
                </div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">Teachers</p>
                <p className="text-2xl font-bold text-white">{teachers.length}</p>
                <p className="text-xs text-[#6cbd45]">+2 this month</p>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">Students</p>
                <p className="text-2xl font-bold text-white">{totalStudents}</p>
                <p className="text-xs text-[#6cbd45]">+15 this month</p>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-[#116a38]">
                <p className="text-sm text-gray-300">XP Earned</p>
                <p className="text-2xl font-bold text-yellow-400">{school.principal.xp.toLocaleString()}</p>
                <p className="text-xs text-gray-300">{school.city}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Teachers</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{teachers.length}</div>
              <p className="text-xs text-gray-300">Active educators</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-yellow-400">Top performing team</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{avgCompletion}%</div>
              <p className="text-xs text-gray-300">School average</p>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div className="xp-bar h-full" style={{ width: `${avgCompletion}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{avgAccuracy}%</div>
              <p className="text-xs text-gray-300">Quiz performance</p>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full"
                  style={{ width: `${avgAccuracy}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38] card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">At-Risk Students</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {teachers.reduce((acc, teacher) => acc + teacher.atRiskCount, 0)}
              </div>
              <p className="text-xs text-gray-300">Need attention</p>
              <Badge variant="outline" className="text-xs mt-1">
                Priority focus
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Teachers Leaderboard */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Teachers Leaderboard
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {teachers.length} Heroes
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 bg-black/40 border-[#116a38] text-white"
                  />
                </div>
                <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Broadcast Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-[#116a38]">
                    <DialogHeader>
                      <DialogTitle className="text-[#6cbd45]">Send Message to Teachers</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white">Select Teachers</label>
                        <Select>
                          <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                            <SelectValue placeholder="Choose teachers..." />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-[#116a38]">
                            <SelectItem value="all">🎯 All Teachers</SelectItem>
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Subject</label>
                        <Input placeholder="Message subject..." className="bg-black/40 border-[#116a38] text-white" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Message</label>
                        <Textarea
                          placeholder="Type your message..."
                          rows={4}
                          className="bg-black/40 border-[#116a38] text-white"
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers
                .sort((a, b) => b.teacherScore - a.teacherScore)
                .map((teacher, index) => (
                  <Card
                    key={teacher.id}
                    className={`game-card cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in ${
                      index < 3 ? "achievement-glow" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
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

                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Users className="h-5 w-5 text-[#6cbd45]" />
                          {teacher.name}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                          📚 {teacher.classes.length} Classes
                        </Badge>
                        <Badge variant="outline" className="text-gray-300">
                          Level {teacher.level}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* Teacher score with visual indicator */}
                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Teacher Performance</span>
                            <span className="font-bold text-[#6cbd45]">{teacher.teacherScore}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="xp-bar h-full transition-all duration-1000"
                              style={{ width: `${teacher.teacherScore}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                            <div className="text-lg font-bold text-[#6cbd45]">{teacher.totalStudents}</div>
                            <div className="text-xs text-gray-400">Students</div>
                          </div>
                          <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                            <div className="text-lg font-bold text-red-400">{teacher.atRiskCount}</div>
                            <div className="text-xs text-gray-400">At Risk</div>
                          </div>
                        </div>

                        {/* Additional metrics */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center">
                            <div className="text-sm font-bold text-white">{teacher.avgCompletion}%</div>
                            <div className="text-xs text-gray-400">Completion</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-white">{teacher.avgAccuracy}%</div>
                            <div className="text-xs text-gray-400">Accuracy</div>
                          </div>
                        </div>

                        {/* Performance badge */}
                        <div className="flex justify-center">{getPerformanceBadge(teacher.teacherScore)}</div>

                        {/* XP and achievements */}
                        <div className="flex justify-between items-center pt-2 border-t border-[#116a38]">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-bold">{teacher.xp.toLocaleString()} XP</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-purple-400 font-bold">{teacher.badges.length} Badges</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-[#116a38] to-[#6cbd45] hover:from-[#6cbd45] hover:to-[#8ed55a] text-white font-bold transition-all duration-300 hover:scale-105"
                        onClick={() => router.push(`/dashboard/principal/teacher/${teacher.id}`)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        View Teacher Profile
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
