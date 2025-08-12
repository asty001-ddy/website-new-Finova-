"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, BookOpen, TrendingUp, Plus, Search, Award, Clock, Trophy, Star, Zap } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [quizDialog, setQuizDialog] = useState(false)
  const router = useRouter()

  // For demo, using first teacher
  const teacher = mockData.schools[0].teachers[0]
  const classes = teacher.classes

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalStudents = classes.reduce((acc, cls) => acc + cls.students.length, 0)

  const getSubjectColor = (subject: string) => {
    const colors = {
      Maths: "bg-blue-500",
      Science: "bg-green-500",
      "Quranic Studies": "bg-purple-500",
      English: "bg-orange-500",
    }
    return colors[subject as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Header Info */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#6cbd45]">
              <Award className="h-5 w-5 text-[#6cbd45]" />
              {teacher.name} - {mockData.schools[0].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-300">Teacher Score</p>
                <p className="text-2xl font-bold text-white">{teacher.teacherScore}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Total Students</p>
                <p className="text-2xl font-bold text-white">{totalStudents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Avg Completion</p>
                <p className="text-2xl font-bold text-white">{teacher.avgCompletion}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Active Streak</p>
                <p className="text-2xl font-bold text-white">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6cbd45]">My Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{classes.length}</div>
              <p className="text-xs text-gray-300">Active classes</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6cbd45]">Avg Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{teacher.avgAccuracy}%</div>
              <p className="text-xs text-gray-300">Quiz performance</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6cbd45]">At-Risk Students</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{teacher.atRiskCount}</div>
              <p className="text-xs text-gray-300">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6cbd45]">Quizzes Created</CardTitle>
              <Clock className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-300">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* My Classes */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                My Classes
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {classes.length} Active
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300" />
                  <Input
                    placeholder="Search classes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 text-white bg-black/40 border-[#116a38]"
                  />
                </div>
                <Dialog open={quizDialog} onOpenChange={setQuizDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] hover:from-[#5ba83a] hover:to-[#4a9930] text-black font-bold">
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
                          <label className="text-sm font-medium text-white">Subject Realm</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Choose your realm..." />
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">Time Limit (minutes)</label>
                          <Input type="number" placeholder="30" className="text-white bg-black/40 border-[#116a38]" />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">XP Reward</label>
                          <Input type="number" placeholder="500" className="text-white bg-black/40 border-[#116a38]" />
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
              {filteredClasses.map((cls, index) => (
                <Card
                  key={cls.id}
                  className="game-card cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3 relative">
                    {/* Subject icon and level indicator */}
                    <div className="absolute -top-2 -right-2">
                      <Badge className="level-badge text-xs">LVL {Math.floor(cls.avgCompletion / 20) + 1}</Badge>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${getSubjectColor(cls.subject)} animate-pulse`} />
                        {cls.name}
                      </CardTitle>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">{cls.subject}</Badge>
                      <Badge variant="outline" className="text-gray-300">
                        {cls.students.length} Heroes
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {/* Progress bars with game styling */}
                      <div>
                        <div className="flex justify-between text-sm text-white mb-1">
                          <span>Quest Progress</span>
                          <span className="font-bold text-[#6cbd45]">{cls.avgCompletion}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="xp-bar h-full transition-all duration-1000"
                            style={{ width: `${cls.avgCompletion}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm text-white mb-1">
                          <span>Accuracy Rate</span>
                          <span className="font-bold text-yellow-400">{cls.avgAccuracy}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full transition-all duration-1000"
                            style={{ width: `${cls.avgAccuracy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-[#6cbd45]">{cls.students.length}</div>
                          <div className="text-xs text-gray-400">Students</div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                          <div className="text-lg font-bold text-red-400">{cls.atRiskCount}</div>
                          <div className="text-xs text-gray-400">At Risk</div>
                        </div>
                      </div>

                      {/* XP and achievements */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#116a38]">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-yellow-400 font-bold">
                            {Math.floor(cls.avgCompletion * 10)} XP
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-purple-400 font-bold">
                            {Math.floor(cls.avgAccuracy / 20)} Badges
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-[#116a38] to-[#6cbd45] hover:from-[#6cbd45] hover:to-[#8ed55a] text-white font-bold transition-all duration-300 hover:scale-105"
                      onClick={() => router.push(`/dashboard/teacher/class/${cls.id}`)}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Enter Classroom
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
