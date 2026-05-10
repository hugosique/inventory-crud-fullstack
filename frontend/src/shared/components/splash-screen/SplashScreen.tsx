// src/shared/components/SplashScreen/SplashScreen.tsx
import { Package } from "lucide-react";
import styles from "./SplashScreen.module.css";

export function SplashScreen() {
  return (
    <div className={styles.overlay}>
      <Package size={80} className={styles.icon} />
    </div>
  );
}
