"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { School, Users, TrendingUp, MessageSquare, Search, Send, Trophy, Star, Zap } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messageDialog, setMessageDialog] = useState(false)
  const [selectedPrincipals, setSelectedPrincipals] = useState<string[]>([])
  const router = useRouter()

  const schools = mockData.schools
  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusText = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Schools</CardTitle>
              <School className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">{schools.length}</div>
              <p className="text-xs text-gray-300">Across Pakistan</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Principals</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">{schools.length}</div>
              <p className="text-xs text-gray-300">School leaders</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg School Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {Math.round(schools.reduce((acc, school) => acc + school.principalScore, 0) / schools.length)}%
              </div>
              <p className="text-xs text-gray-300">System average</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Messages Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">24</div>
              <p className="text-xs text-gray-300">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Schools Overview */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#6cbd45]" />
                Schools Leaderboard
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {schools.length} Schools
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schools..."
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
                      <DialogTitle className="text-[#6cbd45]">Send Message to Principals</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white">Select Recipients</label>
                        <Select>
                          <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                            <SelectValue placeholder="Choose principals..." />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-[#116a38]">
                            <SelectItem value="all">🏆 All Principals</SelectItem>
                            {schools.map((school) => (
                              <SelectItem key={school.id} value={school.id}>
                                {school.principal.name} - {school.name}
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
              {filteredSchools
                .sort((a, b) => b.principalScore - a.principalScore)
                .map((school, index) => (
                  <Card
                    key={school.id}
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
                          <School className="h-5 w-5 text-[#6cbd45]" />
                          {school.name}
                        </CardTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                          📍 {school.city}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300">
                          👨‍💼 {school.principal.name}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* School score with visual indicator */}
                        <div>
                          <div className="flex justify-between text-sm text-white mb-1">
                            <span>School Performance</span>
                            <span className="font-bold text-[#6cbd45]">{school.principalScore}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ${
                                school.principalScore >= 80
                                  ? "bg-gradient-to-r from-green-500 to-green-400"
                                  : school.principalScore >= 60
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                    : "bg-gradient-to-r from-red-500 to-red-400"
                              }`}
                              style={{ width: `${school.principalScore}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                            <div className="text-lg font-bold text-[#6cbd45]">{school.teachers.length}</div>
                            <div className="text-xs text-gray-400">Teachers</div>
                          </div>
                          <div className="bg-black/40 rounded-lg p-2 text-center border border-[#116a38]">
                            <div className="text-lg font-bold text-blue-400">
                              {school.teachers.reduce(
                                (acc, teacher) =>
                                  acc + teacher.classes.reduce((classAcc, cls) => classAcc + cls.students.length, 0),
                                0,
                              )}
                            </div>
                            <div className="text-xs text-gray-400">Students</div>
                          </div>
                        </div>

                        {/* Performance badge */}
                        <div className="flex justify-center">
                          <Badge
                            className={`${
                              school.principalScore >= 80
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                                : school.principalScore >= 60
                                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                                  : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                            } font-bold px-3 py-1`}
                          >
                            {getStatusText(school.principalScore)}
                          </Badge>
                        </div>

                        {/* XP and achievements */}
                        <div className="flex justify-between items-center pt-2 border-t border-[#116a38]">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-bold">
                              {Math.floor(school.principalScore * 100)} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-purple-400 font-bold">
                              {Math.floor(school.principalScore / 20)} Badges
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-[#116a38] to-[#6cbd45] hover:from-[#6cbd45] hover:to-[#8ed55a] text-white font-bold transition-all duration-300 hover:scale-105"
                        onClick={() => router.push(`/dashboard/admin/school/${school.id}`)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Inspect School
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
