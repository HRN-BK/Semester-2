"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock, BookOpen, Calendar as CalendarIcon, Filter, Search } from "lucide-react"
import Link from "next/link"

type Session = {
  id: string
  subject: string
  duration: string
  date: string
  notes?: string
  subjectColor: string
}

export default function SessionsPage() {
  // Sample data - in a real app, this would come from your database/API
  const sessions: Session[] = [
    { 
      id: '1', 
      subject: 'Toán học', 
      duration: '2h 15m', 
      date: 'Hôm nay, 10:30 AM',
      notes: 'Chương 1-3: Giải tích',
      subjectColor: 'bg-blue-500'
    },
    { 
      id: '2', 
      subject: 'Vật lý', 
      duration: '1h 30m', 
      date: 'Hôm qua, 2:00 PM',
      notes: 'Bài tập chương 2',
      subjectColor: 'bg-green-500'
    },
    { 
      id: '3', 
      subject: 'Hóa học', 
      duration: '1h 45m', 
      date: 'Hôm qua, 10:00 AM',
      notes: 'Phản ứng oxi hóa khử',
      subjectColor: 'bg-purple-500'
    },
    { 
      id: '4', 
      subject: 'Sinh học', 
      duration: '1h 15m', 
      date: 'Thứ 2, 8:00 AM',
      notes: 'Ôn tập di truyền',
      subjectColor: 'bg-yellow-500'
    },
    { 
      id: '5', 
      subject: 'Tiếng Anh', 
      duration: '45m', 
      date: 'Chủ nhật, 3:30 PM',
      notes: 'Luyện nghe nâng cao',
      subjectColor: 'bg-red-500'
    },
  ]

  const totalDuration = sessions.reduce((total, session) => {
    const hours = parseFloat(session.duration) || 0
    return total + hours
  }, 0)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phiên học</h1>
          <p className="text-muted-foreground">
            Xem và quản lý các phiên học của bạn
          </p>
        </div>
        <Button asChild>
          <Link href="/sessions/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm phiên học
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thời gian</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDuration.toFixed(1)} giờ</div>
            <p className="text-xs text-muted-foreground">
              {sessions.length} phiên học
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Môn học</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(sessions.map(s => s.subject)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Môn đã học
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ngày học gần nhất</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hôm nay</div>
            <p className="text-xs text-muted-foreground">
              {sessions.filter(s => s.date.includes('Hôm nay')).length} phiên
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian trung bình</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalDuration / sessions.length).toFixed(1)}h/phiên
            </div>
            <p className="text-xs text-muted-foreground">
              Trung bình mỗi phiên
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Lịch sử học tập</CardTitle>
              <CardDescription>
                Tất cả các phiên học của bạn
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className={`h-10 w-1 rounded-full ${session.subjectColor}`} />
                  <div>
                    <p className="font-medium">{session.subject}</p>
                    <p className="text-sm text-muted-foreground">{session.notes}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.duration}</p>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
