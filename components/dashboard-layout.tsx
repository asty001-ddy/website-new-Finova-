"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  School,
  GraduationCap,
  Trophy,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "principal" | "teacher"
  user: {
    name: string
    email: string
    avatar?: string
    level?: number
    xp?: number
    maxXp?: number
  }
}

const roleConfig = {
  admin: {
    title: "Admin Dashboard",
    color: "from-red-500 to-red-600",
    navigation: [
      { name: "Overview", href: "/dashboard/admin", icon: Home },
      { name: "Schools", href: "/dashboard/admin/schools", icon: School },
      { name: "Classes", href: "/dashboard/admin/classes", icon: BookOpen },
      { name: "Quizzes", href: "/dashboard/admin/quizzes", icon: GraduationCap },
      { name: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
      { name: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  },
  principal: {
    title: "Principal Dashboard",
    color: "from-blue-500 to-blue-600",
    navigation: [
      { name: "Overview", href: "/dashboard/principal", icon: Home },
      { name: "Teachers", href: "/dashboard/principal/teachers", icon: Users },
      { name: "Classes", href: "/dashboard/principal/classes", icon: BookOpen },
      { name: "Quizzes", href: "/dashboard/principal/quizzes", icon: GraduationCap },
      { name: "Messages", href: "/dashboard/principal/messages", icon: MessageSquare },
      { name: "Reports", href: "/dashboard/principal/reports", icon: BarChart3 },
      { name: "Settings", href: "/dashboard/principal/settings", icon: Settings },
    ],
  },
  teacher: {
    title: "Teacher Dashboard",
    color: "from-green-500 to-green-600",
    navigation: [
      { name: "Overview", href: "/dashboard/teacher", icon: Home },
      { name: "My Classes", href: "/dashboard/teacher/classes", icon: BookOpen },
      { name: "Quizzes", href: "/dashboard/teacher/quizzes", icon: GraduationCap },
      { name: "Messages", href: "/dashboard/teacher/messages", icon: MessageSquare },
      { name: "Reports", href: "/dashboard/teacher/reports", icon: BarChart3 },
      { name: "Settings", href: "/dashboard/teacher/settings", icon: Settings },
    ],
  },
}

export function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const config = roleConfig[role]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-black/90 backdrop-blur-xl border-r border-green-500/20 transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-green-500/20">
            <div className="flex items-center space-x-3">
              <div
                className={cn("w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center", config.color)}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">TF LMS</h2>
                <p className="text-xs text-gray-400 capitalize">{role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-green-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                {user.level && (
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Level {user.level}</Badge>
                    {user.xp && user.maxXp && (
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {config.navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-green-500/20">
            <div className="text-xs text-gray-500 text-center">Telecom Foundation LMS v1.0</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-green-500/20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-white">{config.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
