"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSubjects } from "@/contexts/subject-context"
import { Subject } from "@/types/subject"
import { useToast } from "@/providers/toast-provider"

export function SubjectList() {
  const router = useRouter()
  const { subjects, loading, error, removeSubject } = useSubjects()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa môn học "${name}"?`)) return
    
    try {
      setDeletingId(id)
      await removeSubject(id)
    } catch (error) {
      console.error("Error deleting subject:", error)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading && subjects.length === 0) {
    return <div className="text-center py-8">Đang tải danh sách môn học...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground">Chưa có môn học nào</p>
        <Button onClick={() => router.push('/subjects/new')}>
          <Plus className="mr-2 h-4 w-4" /> Thêm môn học
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Danh sách môn học</h2>
        <Button onClick={() => router.push('/subjects/new')}>
          <Plus className="mr-2 h-4 w-4" /> Thêm môn học
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard 
            key={subject.id} 
            subject={subject} 
            onEdit={() => router.push(`/subjects/${subject.id}/edit`)}
            onDelete={() => handleDelete(subject.id, subject.name)}
            isDeleting={deletingId === subject.id}
          />
        ))}
      </div>
    </div>
  )
}

interface SubjectCardProps {
  subject: Subject
  onEdit: () => void
  onDelete: () => void
  isDeleting?: boolean
}

function SubjectCard({ subject, onEdit, onDelete, isDeleting }: SubjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{subject.name}</CardTitle>
            <CardDescription className="mt-1">{subject.code}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive/90"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Xóa</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            {subject.credits} tín chỉ
          </Badge>
          <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
            Học kỳ {subject.semester}
          </Badge>
        </div>
        {subject.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {subject.description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
