import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { useFormField } from "./use-form-field"

type FormControlProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
}

export function FormControl({
  className,
  asChild = false,
  ...props
}: FormControlProps) {
  const { error } = useFormField()
  const Comp = asChild ? Slot : "div"
  
  return (
    <Comp
      className={cn(
        "relative w-full",
        error && "text-destructive",
        className
      )}
      {...props}
    />
  )
}
