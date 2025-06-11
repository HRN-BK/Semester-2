"use client"

import * as React from "react"
import { useToast } from "@/providers/toast-provider"
import { Toast, ToastAction, ToastDescription, ToastTitle } from "@/components/ui/toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <>
      {toasts.map(({ id, title, description, action, variant }) => (
        <Toast
          key={id}
          variant={variant}
          className="mb-2"
          onClick={() => dismiss(id)}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
        </Toast>
      ))}
    </>
  )
}
