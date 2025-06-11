import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormField } from "./use-form-field"

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export function FormLabel({
  className,
  required,
  children,
  ...props
}: FormLabelProps) {
  const { error } = useFormField()
  
  return (
    <label
      className={cn(
        "block text-sm font-medium leading-6 text-foreground",
        error && "text-destructive",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  )
}
