// Mock data for Telecom Foundation LMS
export interface Student {
  id: string
  name: string
  subjects: {
    [key: string]: {
      completion: number
      level: "Bronze" | "Silver" | "Gold"
      xp: number
      lastActivity: string
      accuracy: number
      timeOnTask: number
    }
  }
  compositeScore: number
  atRisk: boolean
}

export interface Class {
  id: string
  name: string
  subject: string
  grade: string
  students: Student[]
  avgCompletion: number
  avgAccuracy: number
  atRiskCount: number
}

export interface Teacher {
  id: string
  name: string
  classes: Class[]
  teacherScore: number
  avgCompletion: number
  avgAccuracy: number
  atRiskCount: number
  trend: "up" | "down" | "stable"
}

export interface Principal {
  id: string
  name: string
}

export interface School {
  id: string
  name: string
  city: string
  principal: Principal
  teachers: Teacher[]
  principalScore: number
}

// Pakistani names for realistic mock data
const femaleNames = [
  "Ayesha",
  "Fatima",
  "Maryam",
  "Hira",
  "Sana",
  "Sara",
  "Zoya",
  "Mahnoor",
  "Noor",
  "Laiba",
  "Iqra",
  "Amna",
  "Zainab",
  "Khadija",
  "Rabia",
  "Sidra",
  "Nimra",
  "Farah",
  "Samina",
  "Rubina",
  "Shaista",
  "Nadia",
  "Saima",
  "Uzma",
]

const maleNames = [
  "Ahmed",
  "Ali",
  "Hassan",
  "Hussain",
  "Bilal",
  "Umar",
  "Saad",
  "Zain",
  "Hamza",
  "Fahad",
  "Adeel",
  "Farhan",
  "Imran",
  "Tariq",
  "Shahid",
  "Rashid",
  "Kamran",
  "Salman",
  "Waseem",
  "Naeem",
  "Asif",
  "Arif",
  "Khalid",
  "Majid",
]

const surnames = [
  "Khan",
  "Ahmad",
  "Raza",
  "Siddiqui",
  "Malik",
  "Shah",
  "Qureshi",
  "Chaudhry",
  "Sheikh",
  "Butt",
  "Awan",
  "Bhatti",
  "Mughal",
  "Rajput",
  "Dar",
  "Lone",
  "Mirza",
  "Baig",
  "Hashmi",
  "Ansari",
  "Gilani",
  "Naqvi",
  "Rizvi",
  "Kazmi",
]

const subjects = ["Maths", "Science", "Quranic Studies", "English"]

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Rawalpindi",
  "Hyderabad",
  "Gujranwala",
]

// Helper functions
const getRandomName = (gender: "male" | "female") => {
  const firstNames = gender === "female" ? femaleNames : maleNames
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  return `${firstName} ${surname}`
}

const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const generateNormalDistribution = (mean: number, stdDev: number, min = 0, max = 100) => {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()

  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  const value = z * stdDev + mean

  return Math.max(min, Math.min(max, Math.round(value)))
}

const generateStudent = (): Student => {
  const gender = Math.random() > 0.5 ? "female" : "male"
  const name = getRandomName(gender)

  const subjects: Student["subjects"] = {}
  let totalScore = 0

  for (const subject of ["Maths", "Science", "Quranic Studies", "English"]) {
    const completion = generateNormalDistribution(62, 18)
    const accuracy = generateNormalDistribution(68, 15)
    const xp = Math.floor(Math.random() * 10000)
    const level = xp > 7000 ? "Gold" : xp > 4000 ? "Silver" : "Bronze"

    subjects[subject] = {
      completion: completion,
      level: level,
      xp: xp,
      lastActivity: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
      accuracy: accuracy,
      timeOnTask: Math.floor(Math.random() * 300) + 30,
    }

    totalScore += (completion + accuracy) / 2
  }

  const compositeScore = Math.round(totalScore / 4)
  const atRisk = compositeScore < 50 || Object.values(subjects).some((s) => s.completion < 40 || s.accuracy < 50)

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: name,
    subjects: subjects,
    compositeScore: compositeScore,
    atRisk: atRisk,
  }
}

const generateClass = (subject: string, grade: string): Class => {
  const studentCount = Math.floor(Math.random() * 11) + 20 // 20-30 students
  const students = Array.from({ length: studentCount }, generateStudent)

  const avgCompletion = Math.round(
    students.reduce((acc, student) => acc + student.subjects[subject]?.completion || 0, 0) / students.length,
  )

  const avgAccuracy = Math.round(
    students.reduce((acc, student) => acc + student.subjects[subject]?.accuracy || 0, 0) / students.length,
  )

  const atRiskCount = students.filter((student) => student.atRisk).length

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `Grade ${grade} ${subject}`,
    subject: subject,
    grade: grade,
    students: students,
    avgCompletion: avgCompletion,
    avgAccuracy: avgAccuracy,
    atRiskCount: atRiskCount,
  }
}

const generateTeacher = (): Teacher => {
  const gender = Math.random() > 0.6 ? "female" : "male" // More female teachers
  const name = getRandomName(gender)

  const classCount = Math.floor(Math.random() * 3) + 1 // 1-3 classes
  const classes = Array.from({ length: classCount }, () => {
    const subject = getRandomElement(subjects)
    const grade = Math.floor(Math.random() * 5) + 6 // Grades 6-10
    return generateClass(subject, grade.toString())
  })

  const allStudents = classes.flatMap((cls) => cls.students)
  const avgCompletion = Math.round(
    allStudents.reduce((acc, student) => {
      const studentAvg = Object.values(student.subjects).reduce((sum, subj) => sum + subj.completion, 0) / 4
      return acc + studentAvg
    }, 0) / allStudents.length,
  )

  const avgAccuracy = Math.round(
    allStudents.reduce((acc, student) => {
      const studentAvg = Object.values(student.subjects).reduce((sum, subj) => sum + subj.accuracy, 0) / 4
      return acc + studentAvg
    }, 0) / allStudents.length,
  )

  const atRiskCount = allStudents.filter((student) => student.atRisk).length
  const teacherScore = Math.round((avgCompletion + avgAccuracy) / 2)

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: name,
    classes: classes,
    teacherScore: teacherScore,
    avgCompletion: avgCompletion,
    avgAccuracy: avgAccuracy,
    atRiskCount: atRiskCount,
    trend: getRandomElement(["up", "down", "stable"]),
  }
}

const generateSchool = (city: string, index: number): School => {
  const teacherCount = Math.floor(Math.random() * 5) + 6 // 6-10 teachers
  const teachers = Array.from({ length: teacherCount }, generateTeacher)

  const principalGender = Math.random() > 0.7 ? "female" : "male"
  const principal = {
    id: Math.random().toString(36).substr(2, 9),
    name: getRandomName(principalGender),
  }

  const principalScore = Math.round(teachers.reduce((acc, teacher) => acc + teacher.teacherScore, 0) / teachers.length)

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `TF Public School ${city}`,
    city: city,
    principal: principal,
    teachers: teachers,
    principalScore: principalScore,
  }
}

// Generate mock data
const schools = cities.map((city, index) => generateSchool(city, index))

export const mockData = {
  schools: schools,
  subjects: subjects,
  cities: cities,
}

export default mockData
