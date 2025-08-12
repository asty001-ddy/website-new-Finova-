"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageSquare } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

export default function StudentProfilePage() {
  const [notes, setNotes] = useState("")
  const router = useRouter()
  const params = useParams()

  // For demo, using first student
  const student = mockData.schools[0].teachers[0].classes[0].students[0]

  const getLevelColor = (level: string) => {
    const colors = {
      Bronze: "bg-amber-600",
      Silver: "bg-gray-400",
      Gold: "bg-yellow-500",
    }
    return colors[level as keyof typeof colors]
  }

  // Mock progress data over time
  const progressData = [
    { week: "Week 1", Maths: 45, Science: 52, "Quranic Studies": 38, English: 48 },
    { week: "Week 2", Maths: 52, Science: 58, "Quranic Studies": 45, English: 55 },
    { week: "Week 3", Maths: 58, Science: 65, "Quranic Studies": 52, English: 62 },
    { week: "Week 4", Maths: 65, Science: 72, "Quranic Studies": 58, English: 68 },
  ]

  // Radar chart data
  const radarData = Object.entries(student.subjects).map(([subject, data]) => ({
    subject: subject.replace(" Studies", ""),
    completion: data.completion,
    accuracy: data.accuracy,
    engagement: Math.floor(data.timeOnTask / 3), // Convert to 0-100 scale
  }))

  return (
    <DashboardLayout role="teacher" title="Student Profile">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Class
          </Button>
        </div>

        {/* Student Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant={student.atRisk ? "destructive" : "default"}>
                    {student.atRisk ? "At Risk" : "On Track"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Composite Score: {student.compositeScore}%</span>
                </div>
              </div>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Guardian
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(student.subjects).map(([subject, data]) => (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getLevelColor(data.level)}`} />
                      <span className="text-sm">{data.level}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{data.completion}%</span>
                    </div>
                    <Progress value={data.completion} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span>{data.accuracy}%</span>
                    </div>
                    <Progress value={data.accuracy} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>XP: {data.xp.toLocaleString()}</span>
                    <span>Time: {data.timeOnTask}min</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Competency Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Competency Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Completion" dataKey="completion" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Radar name="Accuracy" dataKey="accuracy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Maths" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="Science" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="Quranic Studies" stroke="#ffc658" strokeWidth={2} />
                <Line type="monotone" dataKey="English" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { subject: "Maths", title: "Algebra Basics", score: 85, date: "2 days ago" },
                  { subject: "Science", title: "Cell Structure", score: 92, date: "4 days ago" },
                  { subject: "English", title: "Grammar Review", score: 78, date: "1 week ago" },
                  { subject: "Quranic Studies", title: "Surah Al-Fatiha", score: 88, date: "1 week ago" },
                ].map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{quiz.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {quiz.subject} • {quiz.date}
                      </p>
                    </div>
                    <Badge variant={quiz.score >= 80 ? "default" : "secondary"}>{quiz.score}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Math Wizard", icon: "🧙‍♂️", earned: true },
                  { name: "Science Explorer", icon: "🔬", earned: true },
                  { name: "Reading Champion", icon: "📚", earned: false },
                  { name: "Quiz Master", icon: "🏆", earned: true },
                  { name: "Consistent Learner", icon: "⭐", earned: false },
                  { name: "Team Player", icon: "🤝", earned: true },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg text-center ${
                      badge.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <p className="text-sm font-medium">{badge.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add notes about this student's progress, behavior, or areas for improvement..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
            <Button className="mt-3">Save Notes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
