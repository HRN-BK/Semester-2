"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSubjects } from "@/contexts/subject-context"
import { SubjectForm } from "@/components/subjects/subject-form"
import { Subject } from "@/types/subject"

export default function EditSubjectPage() {
  const router = useRouter()
  const { id } = useParams()
  const { getSubject, editSubject } = useSubjects()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const data = await getSubject(id as string)
        if (data) {
          setSubject(data)
        } else {
          router.push('/subjects')
        }
      } catch (error) {
        console.error("Error fetching subject:", error)
        router.push('/subjects')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchSubject()
    }
  }, [id, getSubject, router])

  const handleSubmit = async (data: any) => {
    if (!subject) return
    await editSubject(subject.id, data)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Đang tải thông tin môn học...</p>
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Không tìm thấy môn học</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Chỉnh sửa môn học</h1>
        <p className="text-muted-foreground">
          Cập nhật thông tin môn học
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <SubjectForm 
          initialData={subject}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
