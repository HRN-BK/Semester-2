"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/providers/toast-provider"
import { Loader2 } from "lucide-react"
import { Subject } from "@/types/subject"

const formSchema = z.object({
  name: z.string().min(2, "Tên môn học cần ít nhất 2 ký tự"),
  code: z.string().min(2, "Mã môn học cần ít nhất 2 ký tự"),
  credits: z.coerce.number().min(1, "Số tín chỉ phải lớn hơn 0"),
  semester: z.coerce.number().min(1).max(10, "Học kỳ từ 1 đến 10"),
  description: z.string().optional(),
  color: z.string().min(1, "Vui lòng chọn màu"),
})

type FormValues = z.infer<typeof formSchema>

interface SubjectFormProps {
  initialData?: Subject
  onSubmit: (data: FormValues) => Promise<void>
  isSubmitting?: boolean
}

export function SubjectForm({ 
  initialData, 
  onSubmit, 
  isSubmitting: externalIsSubmitting 
}: SubjectFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      code: initialData?.code || "",
      credits: initialData?.credits || 3,
      semester: initialData?.semester || 1,
      description: initialData?.description || "",
      color: initialData?.color || "#3b82f6",
    },
  })

  const colors = [
    { name: "Xanh dương", value: "#3b82f6" },
    { name: "Xanh lá", value: "#10b981" },
    { name: "Vàng", value: "#f59e0b" },
    { name: "Đỏ", value: "#ef4444" },
    { name: "Tím", value: "#8b5cf6" },
    { name: "Hồng", value: "#ec4899" },
  ]

  const handleSubmit = async (data: FormValues) => {
    try {
      await onSubmit(data)
      toast({
        title: initialData ? "Cập nhật thành công" : "Thêm môn học thành công",
        description: initialData 
          ? "Đã cập nhật thông tin môn học" 
          : `Đã thêm môn học ${data.name}`,
      })
      router.push("/subjects")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi lưu môn học",
        variant: "destructive",
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting || externalIsSubmitting

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField name="name">
          <FormItem>
            <FormLabel>Tên môn học</FormLabel>
            <FormControl>
              <Input 
                placeholder="Nhập tên môn học" 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

                <FormLabel>Mã môn học</FormLabel>

        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số tín chỉ</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={1} 
                  disabled={isSubmitting} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Học kỳ</FormLabel>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
                {...field}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semester) => (
                  <option key={semester} value={semester}>
                    Học kỳ {semester}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <FormField name="color">
            <FormItem>
              <FormLabel>Màu sắc</FormLabel>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {colors.map((color) => (
                  <div key={color.value} className="flex items-center">
                    <input
                      type="radio"
                      id={color.value}
                      value={color.value}
                      className="sr-only"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor={color.value}
                      className="flex-1 flex items-center justify-center p-2 rounded-md cursor-pointer border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="sr-only">{color.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả về môn học..."
                  className="min-h-[100px]"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4 md:col-span-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : initialData ? (
              "Cập nhật môn học"
            ) : (
              "Thêm môn học"
            )}
          </Button>
        </div>
      </div>
    </Form>
  )
}
