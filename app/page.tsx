"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, School, GraduationCap, Trophy, Users, BookOpen, Star, Zap, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Trophy className="w-12 h-12 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Telecom Foundation
              <span className="block text-gradient">Learning Quest</span>
            </h1>

            <p
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Embark on an epic educational journey with Pakistan's most advanced gamified learning management system.
              Level up your knowledge, unlock achievements, and compete with peers!
            </p>

            <div
              className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Gamified Learning
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                Achievement System
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Collaborative Platform
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Quest</h2>
          <p className="text-xl text-gray-400">Select your role to begin your educational adventure</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <Card className="role-card admin group animate-bounce-in">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">System Admin</CardTitle>
              <CardDescription className="text-gray-400">
                Master of the digital realm. Oversee all schools, manage the entire ecosystem, and unlock system-wide
                achievements.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <School className="w-4 h-4 mr-2 text-red-400" />
                  Manage All Schools
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-red-400" />
                  Oversee All Users
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Trophy className="w-4 h-4 mr-2 text-red-400" />
                  System Analytics
                </div>
              </div>
              <Link href="/dashboard/admin">
                <Button className="quest-button w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  Start Admin Quest
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Principal Card */}
          <Card className="role-card principal group animate-bounce-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <School className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">Principal</CardTitle>
              <CardDescription className="text-gray-400">
                Guardian of knowledge. Lead your school to greatness, manage teachers, and build an educational empire.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-400" />
                  Manage Teachers
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                  Oversee Classes
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Trophy className="w-4 h-4 mr-2 text-blue-400" />
                  School Performance
                </div>
              </div>
              <Link href="/dashboard/principal">
                <Button className="quest-button w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Start Principal Quest
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card className="role-card teacher group animate-bounce-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">Teacher</CardTitle>
              <CardDescription className="text-gray-400">
                Sage of wisdom. Create engaging quizzes, track student progress, and earn XP for every mind you inspire.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <BookOpen className="w-4 h-4 mr-2 text-green-400" />
                  Create Quizzes
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  Track Students
                </div>
                <div className="flex items-center justify-center text-sm text-gray-300">
                  <Star className="w-4 h-4 mr-2 text-green-400" />
                  Earn XP & Levels
                </div>
              </div>
              <Link href="/dashboard/teacher">
                <Button className="quest-button w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Start Teacher Quest
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Epic Features Await</h2>
          <p className="text-xl text-gray-400">Discover what makes our platform legendary</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card animate-slide-in-left">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Achievement System</h3>
              <p className="text-gray-400 text-sm">Unlock badges, earn XP, and climb the leaderboards</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-time Analytics</h3>
              <p className="text-gray-400 text-sm">Track progress with live performance metrics</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Collaborative Learning</h3>
              <p className="text-gray-400 text-sm">Connect with peers and learn together</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Interactive Quizzes</h3>
              <p className="text-gray-400 text-sm">Engaging assessments with instant feedback</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black/50 backdrop-blur-sm border-y border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-400">Schools Connected</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-400">Quizzes Created</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Telecom Foundation LMS</h3>
            <p className="text-gray-400 mb-6">Empowering education through gamification</p>
            <div className="text-sm text-gray-500">© 2024 Telecom Foundation. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
