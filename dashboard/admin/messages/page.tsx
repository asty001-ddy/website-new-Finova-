"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Search, Plus, Users, CheckCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messageDialog, setMessageDialog] = useState(false)

  // Mock message data
  const messages = [
    {
      id: "msg-1",
      subject: "Monthly Performance Review",
      content: "Please review the monthly performance metrics and submit your reports by Friday.",
      recipients: ["All Principals"],
      sentAt: "2024-01-16T10:30:00Z",
      status: "Sent",
      readCount: 4,
      totalRecipients: 5,
      priority: "High",
    },
    {
      id: "msg-2",
      subject: "New Curriculum Guidelines",
      content: "Updated curriculum guidelines for Q2 2024 are now available in the resource center.",
      recipients: ["All Teachers"],
      sentAt: "2024-01-15T14:20:00Z",
      status: "Sent",
      readCount: 28,
      totalRecipients: 35,
      priority: "Medium",
    },
    {
      id: "msg-3",
      subject: "System Maintenance Notice",
      content: "Scheduled maintenance will occur this weekend. Please save your work.",
      recipients: ["All Users"],
      sentAt: "2024-01-14T09:15:00Z",
      status: "Sent",
      readCount: 156,
      totalRecipients: 200,
      priority: "Low",
    },
    {
      id: "msg-4",
      subject: "Achievement Recognition Program",
      content: "Congratulations to all schools that achieved excellence ratings this quarter!",
      recipients: ["Top Performing Schools"],
      sentAt: "2024-01-13T16:45:00Z",
      status: "Sent",
      readCount: 3,
      totalRecipients: 3,
      priority: "High",
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityColor = (priority: string) => {
    const colors = {
      High: "bg-red-500",
      Medium: "bg-yellow-500",
      Low: "bg-green-500",
    }
    return colors[priority as keyof typeof colors] || "bg-gray-500"
  }

  const getReadPercentage = (readCount: number, totalRecipients: number) => {
    return Math.round((readCount / totalRecipients) * 100)
  }

  return (
    <DashboardLayout role="admin" title="Message Center">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">{messages.length}</div>
              <p className="text-xs text-gray-300">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">This Month</CardTitle>
              <Send className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {messages.filter((m) => new Date(m.sentAt).getMonth() === new Date().getMonth()).length}
              </div>
              <p className="text-xs text-gray-300">Messages sent</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Recipients</CardTitle>
              <Users className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {messages.reduce((acc, msg) => acc + msg.totalRecipients, 0)}
              </div>
              <p className="text-xs text-gray-300">People reached</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-[#116a38]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Read Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#6cbd45]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#6cbd45]">
                {Math.round(
                  messages.reduce((acc, msg) => acc + getReadPercentage(msg.readCount, msg.totalRecipients), 0) /
                    messages.length,
                )}
                %
              </div>
              <p className="text-xs text-gray-300">Read rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <Card className="bg-black/20 border-[#116a38]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#6cbd45] flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Message History
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black ml-2">
                  {messages.length} Messages
                </Badge>
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-300" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 text-white bg-black/40 border-[#116a38]"
                  />
                </div>
                <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                      <Plus className="h-4 w-4 mr-2" />
                      Compose Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-black/90 border-[#116a38]">
                    <DialogHeader>
                      <DialogTitle className="text-[#6cbd45] text-xl">Compose New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-white">Recipients</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Select recipients..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#116a38]">
                              <SelectItem value="all-principals">🏫 All Principals</SelectItem>
                              <SelectItem value="all-teachers">👨‍🏫 All Teachers</SelectItem>
                              <SelectItem value="all-users">👥 All Users</SelectItem>
                              <SelectItem value="top-schools">🏆 Top Performing Schools</SelectItem>
                              <SelectItem value="custom">🎯 Custom Selection</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-white">Priority</label>
                          <Select>
                            <SelectTrigger className="bg-black/40 border-[#116a38] text-white">
                              <SelectValue placeholder="Set priority..." />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#116a38]">
                              <SelectItem value="high">🔴 High Priority</SelectItem>
                              <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                              <SelectItem value="low">🟢 Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Subject</label>
                        <Input
                          placeholder="Enter message subject..."
                          className="text-white bg-black/40 border-[#116a38]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white">Message Content</label>
                        <Textarea
                          placeholder="Type your message here..."
                          rows={6}
                          className="text-white bg-black/40 border-[#116a38]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-[#6cbd45] to-[#5ba83a] text-black font-bold">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="bg-black/40 border-[#116a38] text-white">
                          💾 Save Draft
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMessages.map((message, index) => (
                <Card
                  key={message.id}
                  className="game-card cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-black/60 to-[#116a38]/20 border-[#116a38] hover:border-[#6cbd45] animate-bounce-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg text-white">{message.subject}</CardTitle>
                          <Badge className={`${getPriorityColor(message.priority)} text-white text-xs`}>
                            {message.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{message.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>📧 To: {message.recipients.join(", ")}</span>
                          <span>📅 {new Date(message.sentAt).toLocaleDateString()}</span>
                          <span>🕐 {new Date(message.sentAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#6cbd45]">{message.readCount}</div>
                          <div className="text-xs text-gray-400">Read</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{message.totalRecipients}</div>
                          <div className="text-xs text-gray-400">Total</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-400">
                            {getReadPercentage(message.readCount, message.totalRecipients)}%
                          </div>
                          <div className="text-xs text-gray-400">Read Rate</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-black/40 border-[#116a38] text-white">
                          📊 Analytics
                        </Button>
                        <Button variant="outline" size="sm" className="bg-black/40 border-[#116a38] text-white">
                          🔄 Resend
                        </Button>
                      </div>
                    </div>
                    {/* Read progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Read Progress</span>
                        <span>{getReadPercentage(message.readCount, message.totalRecipients)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="xp-bar h-full transition-all duration-1000"
                          style={{ width: `${getReadPercentage(message.readCount, message.totalRecipients)}%` }}
                        ></div>
                      </div>
                    </div>
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
