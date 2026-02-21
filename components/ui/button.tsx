import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--accent-green)] text-black hover:bg-[var(--accent-green)]/90 shadow-lg shadow-[var(--accent-green)]/25 font-bold",
                destructive:
                    "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90",
                outline:
                    "border border-[var(--card-border)] bg-transparent hover:bg-[var(--foreground)]/5 text-[var(--foreground)]",
                secondary:
                    "bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--card-bg)]/80 border border-[var(--card-border)]",
                ghost: "hover:bg-[var(--foreground)]/5 text-[var(--foreground)]",
                link: "text-[var(--accent-green)] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 rounded-md px-3 text-xs",
                lg: "h-12 rounded-md px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = "Button"

export { Button, buttonVariants }
