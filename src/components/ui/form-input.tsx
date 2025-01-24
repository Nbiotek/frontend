// components/ui/form-input.tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { MdError } from "react-icons/md";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string

}

export function FormInput({ 
  label, 
  error, 
  helperText,
  className, 
  ...props 
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <Label 
          htmlFor={props.id}
          className={error ? "text-destructive" : ""}
        >
          {label}
        </Label>
      )}
      <Input
        className={cn(
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="flex items-center text-[#90041C] bg-error-alpha px-[8px] py-[5px] rounded-lg relative -top-1"> <MdError color="#CC0628" size={16} /> 
                 {error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}