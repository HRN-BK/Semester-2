import * as React from "react"
import { useFormContext, get, FieldValues, FieldPath } from "react-hook-form"

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
}

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

export function useFormField<TFieldValues extends FieldValues = FieldValues>() {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext<TFieldValues>()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const fieldState = getFieldState(fieldContext.name as FieldPath<TFieldValues>, formState)
  const error = get(formState.errors, fieldContext.name)?.message as string | undefined

  return {
    name: fieldContext.name as FieldPath<TFieldValues>,
    formItemId: `${String(fieldContext.name)}-form-item`,
    formDescriptionId: `${String(fieldContext.name)}-form-item-description`,
    formMessageId: `${String(fieldContext.name)}-form-item-message`,
    error,
    fieldState,
    formState
  }
}
