export interface Subject {
  id: string
  name: string
  code: string
  credits: number
  description?: string
  semester: number
  color: string
  createdAt: string
  updatedAt: string
}

export type CreateSubjectInput = Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateSubjectInput = Partial<CreateSubjectInput>
