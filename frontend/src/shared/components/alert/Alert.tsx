import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CircleAlert, MessageSquare, X } from "lucide-react";
import { Button } from "../button/Button";
import styles from "./Alert.module.css";

export type AlertProps = {
  type: "danger" | "primary" | "secondary";
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function Alert({
  type,
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false,
}: AlertProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={isLoading ? undefined : onCancel}
          />
          <motion.div
            className={styles.dialog}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.header}>
              <div className={styles.iconContainer}>
                {type === "danger" && <AlertTriangle size={24} />}
                {type === "primary" && <MessageSquare size={24} />}
                {type === "secondary" && <CircleAlert size={24} />}
              </div>
              <button
                className={styles.closeBtn}
                onClick={onCancel}
                disabled={isLoading}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.actions}>
              <Button
                variant="light"
                mode="outlined"
                label={cancelText}
                onClick={onCancel}
                disabled={isLoading}
              />
              <Button
                variant={
                  type === "danger"
                    ? "danger"
                    : type === "primary"
                      ? "primary"
                      : "secondary"
                }
                mode="solid"
                label={confirmText}
                onClick={onConfirm}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
