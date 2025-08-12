"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Users, TrendingUp, Search, Trophy, Star, Zap } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Collect all classes from all schools
  const allClasses = mockData.schools.flatMap((school) =>
    school.teachers.flatMap((teacher) =>
      teacher.classes.map((cls) => ({
        ...cls,
        teacherName: teacher.name,
        schoolName: school.name,
        schoolCity: school.city,
      })),
    ),
  )

  const filteredClasses = allClasses.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.schoolName.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <DashboardLayout role="admin" title="All Classes">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">{allClasses.length}</div>
              <p className="text-xs text-gray-300">Across all schools</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {allClasses.reduce((acc, cls) => acc + cls.students.length, 0)}
              </div>
              <p className="text-xs text-gray-300">Active learners</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {Math.round(allClasses.reduce((acc, cls) => acc + cls.avgCompletion, 0) / allClasses.length)}%
              </div>
              <p className="text-xs text-gray-300">System average</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">At-Risk Students</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {allClasses.reduce((acc, cls) => acc + cls.atRiskCount, 0)}
              </div>
              <p className="text-xs text-gray-300">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                All Classes Overview
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {allClasses.length} Classes
                </Badge>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300" />
                <Input
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64 text-white bg-black/40 border-[#116a38]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses
                .sort((a, b) => b.avgCompletion - a.avgCompletion)
                .map((cls, index) => (
                  <Card
                    key={cls.id}
                    className="game-card cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-3 relative">
                      <div className="absolute -top-2 -right-2">
                        <Badge className="level-badge text-xs">LVL {Math.floor(cls.avgCompletion / 20) + 1}</Badge>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${getSubjectColor(cls.subject)} animate-pulse`} />
                          {cls.name}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs">
                          {cls.subject}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300 text-xs">
                          {cls.students.length} Students
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-400">
                        <div>🏫 {cls.schoolName}</div>
                        <div>👨‍🏫 {cls.teacherName}</div>
                        <div>📍 {cls.schoolCity}</div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* Progress indicators */}
                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>Completion Rate</span>
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
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                            <div className="text-lg font-bold text-[#6cbd45]">{cls.totalQuizzes}</div>
                            <div className="text-xs text-gray-400">Total Quizzes</div>
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
                        View Class Details
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
