// components/ui/text.tsx
import { cn } from "@/lib/utils"
import { createElement, HTMLAttributes } from "react"

type TextVariant = 
  | "h1" 
  | "h2" 
  | "h3" 
  | "h4" 
  | "title" 
  | "subtitle" 
  | "body" 
  | "small" 
  | "caption"

// Alternative approach using HTML element types
type ElementType = 
  | "h1" 
  | "h2" 
  | "h3" 
  | "h4" 
  | "h5" 
  | "h6" 
  | "p" 
  | "span" 
  | "div"

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  as?: ElementType  // Using our custom ElementType instead
  align?: "left" | "center" | "right"
  weight?: "normal" | "medium" | "semibold" | "bold" | "thin" | "light"
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<TextVariant, string> = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  title: "text-lg font-medium",
  subtitle: "text-base font-medium",
  body: "text-base",
  small: "text-sm",
  caption: "text-xs"
}



const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
}

const weightClasses = {
  thin:"font-thin",
  light:"font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}

export function Text({
  variant = "body",
  as,
  align = "left",
  weight,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as || getDefaultTag(variant)

  return createElement(
    Component,
    {
      className: cn(
        variantClasses[variant],

        alignClasses[align],
        weight && weightClasses[weight],
        className
      ),
      ...props
    },
    children
  )
}

// Helper function to determine default HTML tag based on variant
function getDefaultTag(variant: TextVariant): ElementType {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "title":
      return "h3"
    case "subtitle":
      return "h4"
    case "caption":
    case "small":
      return "span"
    default:
      return "p"
  }
}