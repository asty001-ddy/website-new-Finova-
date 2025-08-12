"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Trophy, TrendingUp, GraduationCap, MessageSquare, Calendar, Star, Award } from "lucide-react"
import { getPrincipalStats, mockUsers } from "@/lib/mock-data"

export default function PrincipalDashboard() {
  const stats = getPrincipalStats("principal-1")
  const user = {
    name: "Prof. Fatima Khan",
    email: "fatima.khan@school1.edu.pk",
    level: 12,
    xp: 1950,
    maxXp: 2000,
  }

  const teachers = mockUsers.filter((u) => u.role === "teacher" && u.schoolId === "school-1")

  if (!stats) return <div>Loading...</div>

  return (
    <DashboardLayout role="principal" user={user}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Welcome back, <span className="text-gradient">Principal</span>! 🎓
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Leading {stats.schoolName} to educational excellence
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card animate-bounce-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Teachers</p>
                  <p className="text-3xl font-bold text-white">{stats.totalTeachers}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    All active
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
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
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stats.activeStudents} active
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-bounce-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Classes</p>
                  <p className="text-3xl font-bold text-white">{stats.totalClasses}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    All running
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
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
                    +2.5% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="dashboard-card animate-slide-in-left">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                School Performance
              </CardTitle>
              <CardDescription>Track your school's academic progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Overall Performance</span>
                  <span className="text-white">{stats.averageScore.toFixed(1)}%</span>
                </div>
                <Progress value={stats.averageScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Completion Rate</span>
                  <span className="text-white">{stats.completionRate.toFixed(1)}%</span>
                </div>
                <Progress value={stats.completionRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Student Engagement</span>
                  <span className="text-white">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Important events and meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Staff Meeting</p>
                  <p className="text-xs text-gray-400">9:00 AM - Conference Room</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Parent-Teacher Conference</p>
                  <p className="text-xs text-gray-400">2:00 PM - Main Hall</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Academic Review</p>
                  <p className="text-xs text-gray-400">4:00 PM - Principal's Office</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teachers Overview */}
        <Card className="dashboard-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Teaching Staff
            </CardTitle>
            <CardDescription>Monitor your teachers' performance and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher, index) => (
                <div
                  key={teacher.id}
                  className="leaderboard-item animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{teacher.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{teacher.name}</h3>
                      <p className="text-sm text-gray-400">{teacher.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="level-badge">Level {teacher.level}</Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {teacher.classIds?.length || 0} classes
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {teacher.xp}/{teacher.maxXp} XP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dashboard-card animate-bounce-in">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription>Manage your school efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="quest-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <Users className="w-4 h-4 mr-2" />
                Manage Teachers
              </Button>
              <Button className="quest-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <BookOpen className="w-4 h-4 mr-2" />
                View Classes
              </Button>
              <Button className="quest-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="quest-button bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
                <Award className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
