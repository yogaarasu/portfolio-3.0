import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref as any}
        className={cn(
          'inline-flex items-center justify-center rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
          variant === 'default' &&
            'bg-gradient-to-r from-orange-500 to-accent-500 text-white shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-accent-600 active:scale-95',
          variant === 'outline' &&
            'border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:bg-primary-950/50 dark:hover:text-primary-300',
          variant === 'ghost' &&
            'text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-slate-800/70',
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-2.5 text-sm',
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'


