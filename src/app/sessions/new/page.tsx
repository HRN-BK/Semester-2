"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar as CalendarIcon, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { vi } from "date-fns/locale"

// Mock subjects data - in a real app, this would come from your database/API
const subjects = [
  { id: '1', name: 'Toán học', color: 'bg-blue-500' },
  { id: '2', name: 'Vật lý', color: 'bg-green-500' },
  { id: '3', name: 'Hóa học', color: 'bg-purple-500' },
  { id: '4', name: 'Sinh học', color: 'bg-yellow-500' },
  { id: '5', name: 'Tiếng Anh', color: 'bg-red-500' },
]

export default function NewSessionPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [duration, setDuration] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // In a real app, you would submit this data to your API
    console.log({
      subjectId: selectedSubject,
      date,
      duration,
      notes
    })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/sessions")
    }, 1000)
  }


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild className="h-8 w-8">
          <Link href="/sessions">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thêm phiên học mới</h1>
          <p className="text-muted-foreground">
            Ghi lại thông tin phiên học của bạn
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin phiên học</CardTitle>
          <CardDescription>
            Điền đầy đủ thông tin về phiên học của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Môn học</Label>
                  <select
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    required
                  >
                    <option value="">Chọn môn học</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Ngày học</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: vi })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Thời gian học (phút)</Label>
                <div className="relative">
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    placeholder="Nhập số phút học"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    phút
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                <Textarea
                  id="notes"
                  placeholder="Ví dụ: Chương 1-3, Bài tập về nhà, Ôn tập..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/sessions">Hủy</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang lưu...' : 'Lưu phiên học'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
