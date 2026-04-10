"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, checked, onCheckedChange, ...props }: any) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      data-slot="checkbox"
      className={cn(
        "size-4 rounded border border-input text-primary focus:ring-primary",
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
