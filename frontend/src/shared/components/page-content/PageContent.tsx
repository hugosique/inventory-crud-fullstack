import styles from "./PageContent.module.css";

interface PageContentProps {
  children: React.ReactNode;
}

export function PageContent({ children }: PageContentProps) {
  return <div className={styles["page-content"]}>{children}</div>;
}
