import { useCallback, useState, type ReactNode } from 'react'
import { ToastContext, type ToastVariant } from '@/components/shared/ToastContext'

interface ToastMessage {
  id: string
  text: string
  variant: ToastVariant
}

const TOAST_DURATION_MS = 3000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((text: string, variant: ToastVariant = 'success') => {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, text, variant }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, TOAST_DURATION_MS)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg px-4 py-3 text-sm font-medium text-white shadow-md ${
              toast.variant === 'success' ? 'bg-emerald-600' : 'bg-danger'
            }`}
          >
            {toast.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

