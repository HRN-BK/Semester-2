import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormField } from "./use-form-field"

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  message?: string | React.ReactNode
}

export function FormMessage({
  className,
  children,
  message,
  ...props
}: FormMessageProps) {
  const { error } = useFormField()
  const body = error ? String(error) : message || children

  if (!body) {
    return null
  }

  return (
    <p
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
}
