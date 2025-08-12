"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Trophy, TrendingUp, GraduationCap, Star, Clock, CheckCircle, Plus, Eye } from "lucide-react"
import { getTeacherStats, getClassesByTeacherId, getStudentsByClassId } from "@/lib/mock-data"

export default function TeacherDashboard() {
  const stats = getTeacherStats("teacher-1")
  const classes = getClassesByTeacherId("teacher-1")
  const user = {
    name: "Ms. Ayesha Malik",
    email: "ayesha.malik@school1.edu.pk",
    level: 8,
    xp: 750,
    maxXp: 1000,
  }

  return (
    <DashboardLayout role="teacher" user={user}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Welcome back, <span className="text-gradient">Teacher</span>! 📚
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Ready to inspire minds and earn XP today?
          </p>
          <div className="flex justify-center mt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Badge className="level-badge text-lg px-6 py-2">
              <Star className="w-4 h-4 mr-2" />
              Level {stats.level} Educator
            </Badge>
          </div>
        </div>

        {/* XP Progress */}
        <Card className="dashboard-card animate-bounce-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Experience Points</h3>
                <p className="text-sm text-gray-400">Keep teaching to level up!</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">
                  {stats.xp}/{stats.maxXp} XP
                </p>
                <p className="text-xs text-gray-400">{stats.maxXp - stats.xp} XP to next level</p>
              </div>
            </div>
            <Progress value={(stats.xp / stats.maxXp) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card animate-bounce-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">My Classes</p>
                  <p className="text-3xl font-bold text-white">{stats.totalClasses}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Active subjects
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-bounce-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <Users className="w-3 h-3 mr-1" />
                    Across all classes
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-bounce-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Quizzes Created</p>
                  <p className="text-3xl font-bold text-white">{stats.totalQuizzes}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    +2 this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-bounce-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-white">{stats.averageScore.toFixed(1)}%</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Overview */}
        <Card className="dashboard-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              My Classes
            </CardTitle>
            <CardDescription>Manage your teaching assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((classItem, index) => {
                const students = getStudentsByClassId(classItem.id)
                return (
                  <div
                    key={classItem.id}
                    className="leaderboard-item animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{classItem.name}</h3>
                        <p className="text-sm text-gray-400">
                          Grade {classItem.grade} • {classItem.subject}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-400 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {students.length} students
                          </span>
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {classItem.schedule.length} sessions/week
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {classItem.performance.averageScore.toFixed(1)}% avg
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="dashboard-card animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-400" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest teaching achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Quiz "Algebra Fundamentals" completed</p>
                  <p className="text-xs text-gray-400">+50 XP earned • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Achievement unlocked: "Quiz Master"</p>
                  <p className="text-xs text-gray-400">+100 XP bonus • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">New student joined Math Grade 9A</p>
                  <p className="text-xs text-gray-400">Class size: 25 students • 2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription>Streamline your teaching workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="quest-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-20 flex-col">
                  <Plus className="w-6 h-6 mb-2" />
                  Create Quiz
                </Button>
                <Button className="quest-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  View Students
                </Button>
                <Button className="quest-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-20 flex-col">
                  <Trophy className="w-6 h-6 mb-2" />
                  View Reports
                </Button>
                <Button className="quest-button bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 h-20 flex-col">
                  <GraduationCap className="w-6 h-6 mb-2" />
                  Grade Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
