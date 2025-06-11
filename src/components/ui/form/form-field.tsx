import * as React from "react"
import { 
  useController, 
  UseControllerProps, 
  FieldValues, 
  Path, 
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  FieldPath,
  FieldPathValue,
  FieldError
} from "react-hook-form"
import { FormFieldContext } from "./use-form-field"

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  children: (field: {
    field: Omit<ControllerRenderProps<TFieldValues, TName>, 'ref'>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactNode
} & Omit<UseControllerProps<TFieldValues, TName>, 'name' | 'control'>

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  children,
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  const { field, fieldState, formState } = useController<TFieldValues, TName>({
    name,
    ...props,
  } as const)

  const fieldProps: Omit<ControllerRenderProps<TFieldValues, TName>, 'ref'> = {
    ...field,
    value: field.value as FieldPathValue<TFieldValues, TName>,
    onChange: (event) => {
      field.onChange(event)
    },
    onBlur: field.onBlur,
    name: field.name,
  }

  return (
    <FormFieldContext.Provider value={{ name: name as FieldPath<TFieldValues> }}>
      {children({ 
        field: fieldProps,
        fieldState,
        formState
      })}
    </FormFieldContext.Provider>
  )
}
