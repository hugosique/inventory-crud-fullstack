import styles from "./StateFeedback.module.css";

type StateFeedbackProps = {
  variant: "loading" | "error" | "empty";
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export function StateFeedback({
  variant,
  title,
  description,
  children,
}: StateFeedbackProps) {
  return (
    <div className={styles["product-list__state"]}>
      <div
        className={`${styles["product-list__state-box"]} ${
          styles[`product-list__state-box--${variant}`]
        }`}
      >
        {title && (
          <h2 className={styles["product-list__empty-title"]}>{title}</h2>
        )}
        {description && (
          <p className={styles["product-list__empty-text"]}>{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
