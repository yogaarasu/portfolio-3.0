import * as React from 'react'
import { cn } from '../../lib/utils'

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-sm text-sm shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700/80 dark:bg-slate-900/95',
        className,
      )}
      {...props}
    />
  )
})
Card.displayName = 'Card'

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 pb-3',
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-sm font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pt-0', className)} {...props} />
}


