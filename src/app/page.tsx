"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, FileText, LineChart, BookOpen } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Theo dõi thời gian học",
    description: "Theo dõi các phiên học và tối ưu hóa lịch học tập của bạn.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Tổ chức ghi chú",
    description: "Lưu trữ tất cả tài liệu học tập của bạn ở một nơi và dễ dàng truy cập.",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Theo dõi tiến độ",
    description: "Theo dõi tiến độ học tập với các thống kê và phân tích chi tiết.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Quản lý môn học",
    description: "Tổ chức và quản lý các môn học một cách hiệu quả.",
  },
]

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-6 pb-12">
            <div className="mx-auto flex max-w-[700px] flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Học tập thông minh hơn
                </h1>
                <p className="text-lg text-muted-foreground">
                  Quản lý hành trình học tập của bạn với nền tảng toàn diện của chúng tôi.
                  Tổ chức, theo dõi và tối ưu hóa việc học tập một cách hiệu quả.
                </p>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild>
                  <Link href="/subjects">Bắt đầu ngay</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">Tính năng nổi bật</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 transition-all hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
