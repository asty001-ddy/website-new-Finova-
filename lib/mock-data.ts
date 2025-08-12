// Types
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "principal" | "teacher" | "student"
  avatar?: string
  level?: number
  xp?: number
  maxXp?: number
  schoolId?: string
  classIds?: string[]
  achievements?: Achievement[]
  createdAt: Date
  lastActive: Date
}

export interface School {
  id: string
  name: string
  location: string
  principalId: string
  teacherIds: string[]
  studentCount: number
  classCount: number
  establishedYear: number
  type: "primary" | "secondary" | "higher_secondary"
  status: "active" | "inactive"
  performance: {
    averageScore: number
    totalQuizzes: number
    activeStudents: number
    completionRate: number
  }
}

export interface Class {
  id: string
  name: string
  subject: string
  grade: number
  schoolId: string
  teacherId: string
  studentIds: string[]
  schedule: {
    day: string
    startTime: string
    endTime: string
  }[]
  performance: {
    averageScore: number
    totalQuizzes: number
    completionRate: number
  }
}

export interface Quiz {
  id: string
  title: string
  subject: string
  grade: number
  teacherId: string
  classId: string
  questions: Question[]
  timeLimit: number
  totalMarks: number
  difficulty: "easy" | "medium" | "hard"
  status: "draft" | "published" | "completed"
  createdAt: Date
  dueDate: Date
  attempts: QuizAttempt[]
}

export interface Question {
  id: string
  text: string
  type: "multiple_choice" | "true_false" | "short_answer"
  options?: string[]
  correctAnswer: string | number
  marks: number
  explanation?: string
}

export interface QuizAttempt {
  id: string
  quizId: string
  studentId: string
  answers: { questionId: string; answer: string | number }[]
  score: number
  totalMarks: number
  timeSpent: number
  completedAt: Date
  feedback?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "quiz" | "streak" | "score" | "participation"
  requirement: number
  xpReward: number
  unlockedAt?: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  subject: string
  content: string
  type: "announcement" | "personal" | "system"
  priority: "low" | "medium" | "high"
  isRead: boolean
  sentAt: Date
  attachments?: string[]
}

// Mock Data
export const mockUsers: User[] = [
  // Admin
  {
    id: "admin-1",
    name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@telecomfoundation.edu.pk",
    role: "admin",
    level: 15,
    xp: 2850,
    maxXp: 3000,
    achievements: [],
    createdAt: new Date("2023-01-15"),
    lastActive: new Date(),
  },

  // Principals
  {
    id: "principal-1",
    name: "Prof. Fatima Khan",
    email: "fatima.khan@school1.edu.pk",
    role: "principal",
    schoolId: "school-1",
    level: 12,
    xp: 1950,
    maxXp: 2000,
    achievements: [],
    createdAt: new Date("2023-02-01"),
    lastActive: new Date(),
  },
  {
    id: "principal-2",
    name: "Mr. Ali Raza",
    email: "ali.raza@school2.edu.pk",
    role: "principal",
    schoolId: "school-2",
    level: 10,
    xp: 1450,
    maxXp: 1500,
    achievements: [],
    createdAt: new Date("2023-02-15"),
    lastActive: new Date(),
  },

  // Teachers
  {
    id: "teacher-1",
    name: "Ms. Ayesha Malik",
    email: "ayesha.malik@school1.edu.pk",
    role: "teacher",
    schoolId: "school-1",
    classIds: ["class-1", "class-2"],
    level: 8,
    xp: 750,
    maxXp: 1000,
    achievements: [],
    createdAt: new Date("2023-03-01"),
    lastActive: new Date(),
  },
  {
    id: "teacher-2",
    name: "Mr. Muhammad Usman",
    email: "muhammad.usman@school1.edu.pk",
    role: "teacher",
    schoolId: "school-1",
    classIds: ["class-3"],
    level: 6,
    xp: 450,
    maxXp: 500,
    achievements: [],
    createdAt: new Date("2023-03-15"),
    lastActive: new Date(),
  },

  // Students
  {
    id: "student-1",
    name: "Zara Ahmed",
    email: "zara.ahmed@student.edu.pk",
    role: "student",
    schoolId: "school-1",
    classIds: ["class-1"],
    level: 5,
    xp: 320,
    maxXp: 400,
    achievements: [],
    createdAt: new Date("2023-04-01"),
    lastActive: new Date(),
  },
  {
    id: "student-2",
    name: "Hassan Ali",
    email: "hassan.ali@student.edu.pk",
    role: "student",
    schoolId: "school-1",
    classIds: ["class-1"],
    level: 4,
    xp: 280,
    maxXp: 300,
    achievements: [],
    createdAt: new Date("2023-04-05"),
    lastActive: new Date(),
  },
]

export const mockSchools: School[] = [
  {
    id: "school-1",
    name: "Telecom Foundation Model School Islamabad",
    location: "Islamabad, Pakistan",
    principalId: "principal-1",
    teacherIds: ["teacher-1", "teacher-2"],
    studentCount: 450,
    classCount: 18,
    establishedYear: 2010,
    type: "secondary",
    status: "active",
    performance: {
      averageScore: 85.5,
      totalQuizzes: 156,
      activeStudents: 445,
      completionRate: 92.3,
    },
  },
  {
    id: "school-2",
    name: "Telecom Foundation School Lahore",
    location: "Lahore, Punjab",
    principalId: "principal-2",
    teacherIds: ["teacher-3", "teacher-4"],
    studentCount: 380,
    classCount: 15,
    establishedYear: 2012,
    type: "secondary",
    status: "active",
    performance: {
      averageScore: 82.1,
      totalQuizzes: 134,
      activeStudents: 375,
      completionRate: 89.7,
    },
  },
  {
    id: "school-3",
    name: "Telecom Foundation School Karachi",
    location: "Karachi, Sindh",
    principalId: "principal-3",
    teacherIds: ["teacher-5", "teacher-6"],
    studentCount: 520,
    classCount: 22,
    establishedYear: 2008,
    type: "higher_secondary",
    status: "active",
    performance: {
      averageScore: 87.8,
      totalQuizzes: 189,
      activeStudents: 515,
      completionRate: 94.1,
    },
  },
]

export const mockClasses: Class[] = [
  {
    id: "class-1",
    name: "Mathematics Grade 9A",
    subject: "Mathematics",
    grade: 9,
    schoolId: "school-1",
    teacherId: "teacher-1",
    studentIds: ["student-1", "student-2"],
    schedule: [
      { day: "Monday", startTime: "08:00", endTime: "09:00" },
      { day: "Wednesday", startTime: "10:00", endTime: "11:00" },
      { day: "Friday", startTime: "09:00", endTime: "10:00" },
    ],
    performance: {
      averageScore: 78.5,
      totalQuizzes: 12,
      completionRate: 95.2,
    },
  },
  {
    id: "class-2",
    name: "Physics Grade 10B",
    subject: "Physics",
    grade: 10,
    schoolId: "school-1",
    teacherId: "teacher-1",
    studentIds: ["student-3", "student-4"],
    schedule: [
      { day: "Tuesday", startTime: "11:00", endTime: "12:00" },
      { day: "Thursday", startTime: "08:00", endTime: "09:00" },
    ],
    performance: {
      averageScore: 82.1,
      totalQuizzes: 8,
      completionRate: 88.9,
    },
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    grade: 9,
    teacherId: "teacher-1",
    classId: "class-1",
    questions: [
      {
        id: "q1",
        text: "What is the value of x in the equation 2x + 5 = 15?",
        type: "multiple_choice",
        options: ["3", "5", "7", "10"],
        correctAnswer: 1,
        marks: 5,
        explanation: "Solving: 2x + 5 = 15, 2x = 10, x = 5",
      },
      {
        id: "q2",
        text: "Is the equation x² - 4 = 0 a quadratic equation?",
        type: "true_false",
        correctAnswer: 1,
        marks: 3,
        explanation: "Yes, it has the form ax² + bx + c = 0",
      },
    ],
    timeLimit: 30,
    totalMarks: 8,
    difficulty: "medium",
    status: "published",
    createdAt: new Date("2024-01-15"),
    dueDate: new Date("2024-01-25"),
    attempts: [],
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: "ach-1",
    title: "First Steps",
    description: "Complete your first quiz",
    icon: "🎯",
    type: "quiz",
    requirement: 1,
    xpReward: 50,
  },
  {
    id: "ach-2",
    title: "Quiz Master",
    description: "Complete 10 quizzes",
    icon: "🏆",
    type: "quiz",
    requirement: 10,
    xpReward: 200,
  },
  {
    id: "ach-3",
    title: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: "⭐",
    type: "score",
    requirement: 100,
    xpReward: 150,
  },
  {
    id: "ach-4",
    title: "Streak Champion",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    type: "streak",
    requirement: 7,
    xpReward: 300,
  },
]

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "admin-1",
    receiverId: "teacher-1",
    subject: "New Curriculum Updates",
    content: "Please review the updated mathematics curriculum for Grade 9.",
    type: "announcement",
    priority: "high",
    isRead: false,
    sentAt: new Date("2024-01-20T10:30:00"),
    attachments: ["curriculum-math-grade9.pdf"],
  },
  {
    id: "msg-2",
    senderId: "principal-1",
    receiverId: "teacher-1",
    subject: "Parent-Teacher Meeting",
    content: "Reminder about the upcoming parent-teacher meeting on Friday.",
    type: "personal",
    priority: "medium",
    isRead: true,
    sentAt: new Date("2024-01-19T14:15:00"),
  },
]

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function getSchoolById(id: string): School | undefined {
  return mockSchools.find((school) => school.id === id)
}

export function getClassById(id: string): Class | undefined {
  return mockClasses.find((cls) => cls.id === id)
}

export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.id === id)
}

export function getClassesByTeacherId(teacherId: string): Class[] {
  return mockClasses.filter((cls) => cls.teacherId === teacherId)
}

export function getStudentsByClassId(classId: string): User[] {
  const classData = getClassById(classId)
  if (!classData) return []
  return mockUsers.filter((user) => classData.studentIds.includes(user.id))
}

export function getQuizzesByTeacherId(teacherId: string): Quiz[] {
  return mockQuizzes.filter((quiz) => quiz.teacherId === teacherId)
}

export function getMessagesByUserId(userId: string): Message[] {
  return mockMessages.filter((msg) => msg.receiverId === userId || msg.senderId === userId)
}

// Dashboard stats helpers
export function getAdminStats() {
  return {
    totalSchools: mockSchools.length,
    totalTeachers: mockUsers.filter((u) => u.role === "teacher").length,
    totalStudents: mockUsers.filter((u) => u.role === "student").length,
    totalQuizzes: mockQuizzes.length,
    averagePerformance:
      mockSchools.reduce((acc, school) => acc + school.performance.averageScore, 0) / mockSchools.length,
    activeUsers: mockUsers.filter((u) => {
      const daysSinceActive = (Date.now() - u.lastActive.getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceActive <= 7
    }).length,
  }
}

export function getPrincipalStats(principalId: string) {
  const principal = getUserById(principalId)
  const school = mockSchools.find((s) => s.principalId === principalId)

  if (!school) return null

  return {
    schoolName: school.name,
    totalTeachers: school.teacherIds.length,
    totalStudents: school.studentCount,
    totalClasses: school.classCount,
    averageScore: school.performance.averageScore,
    completionRate: school.performance.completionRate,
    activeStudents: school.performance.activeStudents,
  }
}

export function getTeacherStats(teacherId: string) {
  const teacher = getUserById(teacherId)
  const classes = getClassesByTeacherId(teacherId)
  const quizzes = getQuizzesByTeacherId(teacherId)

  const totalStudents = classes.reduce((acc, cls) => acc + cls.studentIds.length, 0)
  const averageScore = classes.reduce((acc, cls) => acc + cls.performance.averageScore, 0) / classes.length || 0
  const completionRate = classes.reduce((acc, cls) => acc + cls.performance.completionRate, 0) / classes.length || 0

  return {
    totalClasses: classes.length,
    totalStudents,
    totalQuizzes: quizzes.length,
    averageScore,
    completionRate,
    level: teacher?.level || 1,
    xp: teacher?.xp || 0,
    maxXp: teacher?.maxXp || 100,
  }
}
