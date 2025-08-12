"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
  Home,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "principal" | "teacher"
  title: string
}

export default function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: `/dashboard/${role}`, icon: LayoutDashboard },
    { name: "Classes", href: `/dashboard/${role}/classes`, icon: Users },
    { name: "Quizzes", href: `/dashboard/${role}/quizzes`, icon: BookOpen },
    { name: "Messages", href: `/dashboard/${role}/messages`, icon: MessageSquare },
    { name: "Reports", href: `/dashboard/${role}/reports`, icon: BarChart3 },
    { name: "Settings", href: `/dashboard/${role}/settings`, icon: Settings },
  ]

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-red-500",
      principal: "bg-blue-500",
      teacher: "bg-green-500",
    }
    return colors[role as keyof typeof colors]
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#116a38]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#6cbd45] to-[#116a38] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">TF</span>
          </div>
          <div>
            <h2 className="font-semibold text-[#6cbd45]">Telecom Foundation</h2>
            <Badge className={`text-xs ${getRoleColor(role)} text-white`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/")}>
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#116a38]">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-[#116a38] bg-black/40 backdrop-blur-sm">
          <SidebarContent />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#116a38] bg-black/60 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold text-[#6cbd45]">{title}</h1>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
