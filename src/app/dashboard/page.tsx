"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, BarChart, Plus, Bookmark, Target } from "lucide-react"
import Link from "next/link"
import { useSubjects } from "@/contexts/subject-context"

export default function DashboardPage() {
  const { subjects } = useSubjects()
  
  // Calculate stats
  const totalSubjects = subjects.length
  const totalCredits = subjects.reduce((sum, subject) => sum + (subject.credits || 0), 0)
  
  // Sample data - in a real app, this would come from your database/API
  const stats = [
    { 
      name: 'Tổng giờ học', 
      value: '24.5h', 
      change: '+2.5h', 
      changeType: 'increase',
      icon: <Clock className="h-5 w-5" />
    },
    { 
      name: 'Môn học', 
      value: totalSubjects.toString(), 
      change: `+${Math.max(0, totalSubjects - 3)}`, 
      changeType: totalSubjects > 3 ? 'increase' : 'decrease',
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      name: 'Tín chỉ', 
      value: totalCredits.toString(), 
      change: `+${totalCredits - 12}`, 
      changeType: totalCredits > 12 ? 'increase' : 'decrease',
      icon: <Bookmark className="h-5 w-5" />
    },
    { 
      name: 'Mục tiêu', 
      value: '75%', 
      change: '+5%', 
      changeType: 'increase',
      icon: <Target className="h-5 w-5" />
    },
  ]

  const recentSessions = [
    { subject: 'Toán học', duration: '2h 15m', date: 'Hôm nay, 10:30 AM' },
    { subject: 'Vật lý', duration: '1h 30m', date: 'Hôm qua, 2:00 PM' },
    { subject: 'Hóa học', duration: '1h 45m', date: 'Hôm qua, 10:00 AM' },
  ]

  const upcomingTasks = [
    { title: 'Hoàn thành bài tập Toán', due: 'Ngày mai', subject: 'Toán học' },
    { title: 'Ôn thi Vật lý', due: '2 ngày tới', subject: 'Vật lý' },
    { title: 'Đọc chương 5', due: '3 ngày tới', subject: 'Sinh học' },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bảng điều khiển</h1>
          <p className="text-muted-foreground">
            Tổng quan về hoạt động học tập của bạn
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/subjects/new">
              <Plus className="mr-2 h-4 w-4" />
              Thêm môn học
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} so với tuần trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Sessions */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Phiên học gần đây</CardTitle>
                <CardDescription>Hoạt động học tập của bạn</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sessions">Xem tất cả</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                  </div>
                  <div className="font-medium bg-muted/50 px-3 py-1 rounded-full text-sm">
                    {session.duration}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Công việc sắp tới</CardTitle>
                <CardDescription>Nhiệm vụ và hạn chót của bạn</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tasks">Xem tất cả</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start group">
                  <div className="mr-3 mt-1.5 h-2.5 w-2.5 rounded-full bg-sky-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {task.subject} • Hạn chót: {task.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
