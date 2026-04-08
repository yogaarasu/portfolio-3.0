import * as React from 'react'
import { cn } from '../../lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-0 transition-all duration-200 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:focus:border-primary-400 dark:focus:bg-slate-800',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'


