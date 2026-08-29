import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gold text-forest border-2 border-gold hover:bg-gold-500 hover:border-gold-500 hover:-translate-y-0.5 shadow-gold hover:shadow-lg',
        outline:
          'bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-cream',
        ghost:
          'bg-transparent text-forest hover:bg-forest/10',
        'outline-light':
          'bg-transparent text-cream border-2 border-cream/50 hover:border-cream hover:bg-cream/10',
        danger:
          'bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700',
        secondary:
          'bg-forest text-cream border-2 border-forest hover:bg-forest/90',
      },
      size: {
        sm:  'h-8  px-4  text-[10px]',
        md:  'h-10 px-6  text-xs',
        lg:  'h-12 px-8  text-sm',
        xl:  'h-14 px-10 text-base',
        icon:'h-10 w-10  p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
