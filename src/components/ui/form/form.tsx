import * as React from "react"
import { 
  FormProvider, 
  UseFormReturn, 
  FieldValues, 
  useForm as useHookForm,
  UseFormProps,
  DefaultValues,
  SubmitHandler
} from "react-hook-form"
import { cn } from "@/lib/utils"

type FormProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  className?: string
  children: React.ReactNode
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  className,
  children,
  ...props
}: FormProps<TFieldValues> & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
) {
  return useHookForm<TFieldValues>({
    mode: "onChange",
    ...props,
  })
}
