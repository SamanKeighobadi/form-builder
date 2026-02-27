/**
 * انواع مربوط به فرم و فیلدها.
 */

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'

export type FormFieldKind = 'input' | 'textarea' | 'radio' | 'checkbox'

export interface FormFieldBase {
  id: string
  label: string
  required: boolean
}

export interface InputField extends FormFieldBase {
  kind: 'input'
  inputType: InputType
}

export interface TextareaField extends FormFieldBase {
  kind: 'textarea'
  rows: number
  cols: number
}

export interface RadioOption {
  id: string
  label: string
  isDefault: boolean
}

export interface RadioField extends FormFieldBase {
  kind: 'radio'
  options: RadioOption[]
}

export interface CheckboxOption {
  id: string
  label: string
}

export interface CheckboxField extends FormFieldBase {
  kind: 'checkbox'
  options: CheckboxOption[]
}

export type FormField = InputField | TextareaField | RadioField | CheckboxField

export interface FormData {
  name: string
  description: string
  fields: FormField[]
}

export interface StoredForm extends FormData {
  id: string
  createdAt: string
}
