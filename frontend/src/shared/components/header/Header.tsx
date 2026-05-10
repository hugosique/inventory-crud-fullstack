import type { CSSProperties, ReactNode } from "react";
// Styles
import styles from "./Header.module.css";

interface HeaderProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Header({ children, style }: HeaderProps) {
  return (
    <header className={styles["header"]} style={style}>
      <div className={styles["header__inner"]}>{children}</div>
    </header>
  );
}
