"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Users, BookOpen, TrendingUp, Award } from "lucide-react"
import mockData from "@/lib/mock-data"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function SchoolDetailPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const params = useParams()

  // For demo, using first school
  const school = mockData.schools[0]
  const teachers = school.teachers

  const filteredTeachers = teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalStudents = teachers.reduce(
    (acc, teacher) => acc + teacher.classes.reduce((classAcc, cls) => classAcc + cls.students.length, 0),
    0,
  )

  const getPerformanceBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500">Excellent</Badge>
    if (score >= 60) return <Badge className="bg-yellow-500">Good</Badge>
    return <Badge variant="destructive">Needs Support</Badge>
  }

  return (
    <DashboardLayout role="admin" title="School Details">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
        </div>

        {/* School Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6" />
              {school.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Principal</p>
                <p className="text-lg font-semibold">{school.principal.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="text-lg font-semibold">{school.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">School Score</p>
                <p className="text-lg font-semibold">{school.principalScore}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-lg font-semibold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="text-xs text-muted-foreground">Active educators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(teachers.reduce((acc, teacher) => acc + teacher.avgCompletion, 0) / teachers.length)}%
              </div>
              <p className="text-xs text-muted-foreground">School average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(teachers.reduce((acc, teacher) => acc + teacher.avgAccuracy, 0) / teachers.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Quiz performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teachers.reduce((acc, teacher) => acc + teacher.atRiskCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Teachers Performance</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Teacher Score</TableHead>
                  <TableHead>Avg Completion</TableHead>
                  <TableHead>Avg Accuracy</TableHead>
                  <TableHead>At-Risk</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers
                  .sort((a, b) => b.teacherScore - a.teacherScore)
                  .map((teacher, index) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index < 3 && (
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                          )}
                          <span className="font-medium">{teacher.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.classes.length}</TableCell>
                      <TableCell>{teacher.classes.reduce((acc, cls) => acc + cls.students.length, 0)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{teacher.teacherScore}%</span>
                          {teacher.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.avgCompletion}%</TableCell>
                      <TableCell>{teacher.avgAccuracy}%</TableCell>
                      <TableCell>
                        <Badge variant={teacher.atRiskCount > 5 ? "destructive" : "secondary"}>
                          {teacher.atRiskCount}
                        </Badge>
                      </TableCell>
                      <TableCell>{getPerformanceBadge(teacher.teacherScore)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/admin/teacher/${teacher.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
