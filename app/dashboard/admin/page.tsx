"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { School, Users, BookOpen, Trophy, TrendingUp, AlertCircle, CheckCircle, Clock, Star } from "lucide-react"
import { getAdminStats, mockSchools } from "@/lib/mock-data"

export default function AdminDashboard() {
  const stats = getAdminStats()
  const user = {
    name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@telecomfoundation.edu.pk",
    level: 15,
    xp: 2850,
    maxXp: 3000,
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Welcome back, <span className="text-gradient">System Admin</span>! 🏆
          </h1>
          <p className="text-xl text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Your educational empire awaits your command
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card animate-bounce-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Schools</p>
                  <p className="text-3xl font-bold text-white">{stats.totalSchools}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <School className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card animate-bounce-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Teachers</p>
                  <p className="text-3xl font-bold text-white">{stats.totalTeachers}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5 this week
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
                  <p className="text-sm text-gray-400 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12 today
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
                  <p className="text-sm text-gray-400 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
                  <p className="text-xs text-green-400 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    98% online
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
                System Performance
              </CardTitle>
              <CardDescription>Overall platform metrics and health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Average Performance</span>
                  <span className="text-white">{stats.averagePerformance.toFixed(1)}%</span>
                </div>
                <Progress value={stats.averagePerformance} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">System Uptime</span>
                  <span className="text-white">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">User Satisfaction</span>
                  <span className="text-white">96.5%</span>
                </div>
                <Progress value={96.5} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system events and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">New school registered: TF School Peshawar</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">System backup completed successfully</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Scheduled maintenance reminder</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schools Overview */}
        <Card className="dashboard-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <School className="w-5 h-5 mr-2 text-blue-400" />
              Schools Performance
            </CardTitle>
            <CardDescription>Monitor all schools in your network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSchools.map((school, index) => (
                <div
                  key={school.id}
                  className="leaderboard-item animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <School className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{school.name}</h3>
                      <p className="text-sm text-gray-400">{school.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {school.performance.averageScore.toFixed(1)}% avg
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {school.studentCount} students
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {school.performance.completionRate.toFixed(1)}% completion
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
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="quest-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Add School
              </Button>
              <Button className="quest-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                View Reports
              </Button>
              <Button className="quest-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Manage Users
              </Button>
              <Button className="quest-button bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700">
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
