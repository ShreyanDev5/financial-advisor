"use client";

import { Input } from "@/components/ui/input";
import { formatWithCommas, removeCommas } from "@/lib/number-formatting";
import React, { useState, useEffect } from "react";

interface FormattedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFormattedChange?: (value: string) => void;
}

const FormattedInput = React.forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ onFormattedChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>("");
    
    // Update display value when the prop value changes
    useEffect(() => {
      if (value !== undefined) {
        const stringValue = String(value || "");
        const cleanValue = removeCommas(stringValue);
        setDisplayValue(formatWithCommas(cleanValue));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Remove commas to get the actual numeric value
      const cleanValue = removeCommas(inputValue);
      
      // Only allow numeric input
      if (/^\d*\.?\d*$/.test(cleanValue) || cleanValue === "") {
        // Format for display
        const formattedValue = formatWithCommas(cleanValue);
        setDisplayValue(formattedValue);
        
        // Call the provided change handler with the clean value
        if (onFormattedChange) {
          onFormattedChange(cleanValue);
        }
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Format the value when the input loses focus
      const cleanValue = removeCommas(e.target.value);
      setDisplayValue(formatWithCommas(cleanValue));
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        inputMode="numeric"
      />
    );
  }
);

FormattedInput.displayName = "FormattedInput";

export { FormattedInput };