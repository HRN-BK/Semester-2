"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubjectList } from "@/components/subjects/subject-list"

export default function SubjectsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý môn học</h1>
          <p className="text-muted-foreground">
            Xem và quản lý các môn học của bạn
          </p>
        </div>
        <Button onClick={() => router.push('/subjects/new')}>
          <Plus className="mr-2 h-4 w-4" /> Thêm môn học
        </Button>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <SubjectList />
      </div>
    </div>
  )
}
