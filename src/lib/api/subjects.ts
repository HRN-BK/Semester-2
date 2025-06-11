import { Subject, CreateSubjectInput, UpdateSubjectInput } from "@/types/subject"

// In a real app, replace this with actual API calls to your backend
const API_URL = '/api/subjects'

// Mock data for development
let mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Toán cao cấp',
    code: 'MATH101',
    credits: 4,
    description: 'Môn học về các khái niệm toán học nâng cao',
    semester: 1,
    color: '#3b82f6',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Lập trình cơ bản',
    code: 'PROG101',
    credits: 3,
    description: 'Nhập môn lập trình với Python',
    semester: 1,
    color: '#10b981',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export const getSubjects = async (): Promise<Subject[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...mockSubjects]
}

export const getSubjectById = async (id: string): Promise<Subject | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockSubjects.find(subject => subject.id === id)
}

export const createSubject = async (data: CreateSubjectInput): Promise<Subject> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const newSubject: Subject = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockSubjects = [...mockSubjects, newSubject]
  return newSubject
}

export const updateSubject = async (id: string, data: UpdateSubjectInput): Promise<Subject> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockSubjects.findIndex(subject => subject.id === id)
  if (index === -1) throw new Error('Subject not found')
  
  const updatedSubject = {
    ...mockSubjects[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  
  mockSubjects[index] = updatedSubject
  return updatedSubject
}

export const deleteSubject = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  mockSubjects = mockSubjects.filter(subject => subject.id !== id)
}
