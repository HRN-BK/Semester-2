import * as React from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { cn } from "@/lib/utils"

type LinkProps = NextLinkProps & {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary"
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "text-primary hover:underline underline-offset-4",
      primary: "text-primary hover:text-primary/80 font-medium",
      secondary: "text-muted-foreground hover:text-foreground transition-colors",
    }

    return (
      <NextLink
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    )
  }
)

Link.displayName = "Link"

export { Link }
