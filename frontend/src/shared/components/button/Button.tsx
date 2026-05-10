import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const MotionLink = motion(Link);

interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "light";
  mode?: "solid" | "outlined" | "clean";
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  label,
  icon,
  variant = "primary",
  mode = "solid",
  to,
  onClick,
  type = "button",
  ariaLabel,
  isLoading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const className = `${styles.button} ${styles[variant]} ${styles[mode]} ${
    isDisabled ? styles.disabled : ""
  }`;

  const content = isLoading ? (
    <Loader2 className={styles.spinner} />
  ) : (
    <>
      {icon}
      {label && <span>{label}</span>}
    </>
  );

  if (to && !isDisabled) {
    return (
      <MotionLink to={to} className={className} aria-label={ariaLabel}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
}
