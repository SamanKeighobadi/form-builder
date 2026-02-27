import { toast } from 'react-hot-toast'

type ToastType = 'error' | 'success'

/**
 * Displays a toast notification with the specified message and type.
 *
 * @param {string} message - The message to be displayed in the toast notification.
 * @param {ToastType} type - The type of toast notification to display (success or error).
 */
export const showToast = (message: string, type: ToastType) => {
  const toastFn = type === 'success' ? toast.success : toast.error

  toastFn(message)
}
