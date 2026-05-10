import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Input.module.css";
import { currencyMask } from "../../../core/utils/currency";

export type InputMode = "solid" | "outlined" | "clean";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  showLabel?: boolean;
  error?: string;
  type?: "text" | "number" | "submit" | "textarea" | string;
  mode?: InputMode;
  mask?: "currency" | ((value: string) => string);
  rows?: number;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      showLabel = true,
      error,
      type = "text",
      mode = "outlined",
      mask,
      className = "",
      id: idProp,
      onChange,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : autoId);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (onChange) {
        if (mask && e.target.value) {
          if (mask === "currency") {
            e.target.value = currencyMask(e.target.value);
          } else if (typeof mask === "function") {
            e.target.value = mask(e.target.value);
          }
        }
        // Force cast as InputEvent for generic compatibility
        onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const inputClasses = `${type === "textarea" ? styles.textarea : styles.input} ${
      styles[mode]
    } ${error ? styles.inputError : ""} ${className}`;

    const containerClasses = styles.container;

    return (
      <div className={containerClasses}>
        {showLabel && label && <label htmlFor={id} className={styles.label}>{label}</label>}

        {type === "textarea" ? (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            id={id}
            className={inputClasses}
            onChange={handleInputChange}
            {...(props as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            id={id}
            type={type}
            className={inputClasses}
            onChange={handleInputChange}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);
