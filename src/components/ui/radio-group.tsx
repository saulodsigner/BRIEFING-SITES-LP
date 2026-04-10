import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

function RadioGroup({ className, value, onValueChange, children, ...props }: any) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        data-slot="radio-group"
        className={cn("grid w-full gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

function RadioGroupItem({ className, value, ...props }: any) {
  const context = React.useContext(RadioGroupContext);
  const checked = context.value === value;

  return (
    <div className="flex items-center">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => context.onValueChange?.(value)}
        className={cn(
          "size-4 rounded-full border border-input text-primary focus:ring-primary",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
