import * as React from "react"
import { useFormContext, FormProvider, UseFormReturn, FieldValues } from "react-hook-form"
import { cn } from "@/lib/utils"

// Form Component
type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  className?: string
  children: React.ReactNode
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  className,
  children,
  ...props
}: FormProps<T>) {
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

// Form Field Context
const FormFieldContext = React.createContext<{
  name: string
}>({ name: "" })

// Form Field Component
type FormFieldProps = {
  name: string
  children: React.ReactNode
}

export function FormField({ name, children }: FormFieldProps) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <div className="space-y-2">{children}</div>
    </FormFieldContext.Provider>
  )
}

// Hook to use form field
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    name: fieldContext.name,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-item-description`,
    formMessageId: `${fieldContext.name}-form-item-message`,
    ...fieldState,
  }
}

// Form Item Component
export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

// Form Label Component
type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function FormLabel({
  className,
  required,
  ...props
}: FormLabelProps) {
  const { error } = useFormField()
  
  return (
    <label
      className={cn(
        "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100",
        error && "text-destructive",
        className
      )}
      {...props}
    >
      {props.children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  )
}

// Form Control Component
export function FormControl({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { error } = useFormField()
  
  return (
    <div
      className={cn("relative", error && "text-destructive", className)}
      {...props}
    />
  )
}

// Form Description Component
export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

// Form Message Component
export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error } = useFormField()
  const body = error ? String(error.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
}
