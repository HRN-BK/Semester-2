"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Subject, CreateSubjectInput, UpdateSubjectInput } from "@/types/subject"
import * as subjectApi from "@/lib/api/subjects"
import { useToast } from "@/providers/toast-provider"

interface SubjectContextType {
  subjects: Subject[]
  loading: boolean
  error: string | null
  fetchSubjects: () => Promise<void>
  getSubject: (id: string) => Promise<Subject | undefined>
  addSubject: (data: CreateSubjectInput) => Promise<void>
  editSubject: (id: string, data: UpdateSubjectInput) => Promise<void>
  removeSubject: (id: string) => Promise<void>
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined)

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const data = await subjectApi.getSubjects()
      setSubjects(data)
      setError(null)
    } catch (err) {
      setError("Không thể tải danh sách môn học")
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách môn học",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getSubject = async (id: string) => {
    try {
      return await subjectApi.getSubjectById(id)
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin môn học",
        variant: "destructive",
      })
      return undefined
    }
  }

  const addSubject = async (data: CreateSubjectInput) => {
    try {
      const newSubject = await subjectApi.createSubject(data)
      setSubjects(prev => [newSubject, ...prev])
      toast({
        title: "Thành công",
        description: `Đã thêm môn học ${newSubject.name}`,
      })
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể thêm môn học",
        variant: "destructive",
      })
      throw err
    }
  }

  const editSubject = async (id: string, data: UpdateSubjectInput) => {
    try {
      const updatedSubject = await subjectApi.updateSubject(id, data)
      setSubjects(prev =>
        prev.map(subject => (subject.id === id ? updatedSubject : subject))
      )
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin môn học",
      })
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật môn học",
        variant: "destructive",
      })
      throw err
    }
  }

  const removeSubject = async (id: string) => {
    try {
      await subjectApi.deleteSubject(id)
      setSubjects(prev => prev.filter(subject => subject.id !== id))
      toast({
        title: "Đã xóa",
        description: "Đã xóa môn học khỏi danh sách",
      })
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa môn học",
        variant: "destructive",
      })
      throw err
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        loading,
        error,
        fetchSubjects,
        getSubject,
        addSubject,
        editSubject,
        removeSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  )
}

export const useSubjects = () => {
  const context = useContext(SubjectContext)
  if (context === undefined) {
    throw new Error("useSubjects must be used within a SubjectProvider")
  }
  return context
}
