"use client"

import { useRouter } from "next/navigation"
import { useSubjects } from "@/contexts/subject-context"
import { SubjectForm } from "@/components/subjects/subject-form"

export default function NewSubjectPage() {
  const router = useRouter()
  const { addSubject } = useSubjects()

  const handleSubmit = async (data: any) => {
    await addSubject(data)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Thêm môn học mới</h1>
        <p className="text-muted-foreground">
          Điền thông tin chi tiết về môn học mới
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <SubjectForm 
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
