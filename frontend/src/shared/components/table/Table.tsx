import type { ReactNode } from "react";
import styles from "./Table.module.css";

export type ColumnAlign = "left" | "center" | "right";

export interface ColumnDef<TData> {
  header: string;
  key: string;
  align?: ColumnAlign;
  render: (row: TData) => ReactNode;
}

interface TableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  rowKey: (row: TData) => string | number;
}

export function Table<TData>({ columns, data, rowKey }: TableProps<TData>) {
  return (
    <div className={styles["table__card"]}>
      <div className={styles["table__scroll"]}>
        <table className={styles["table"]}>
          <thead className={styles["table__thead"]}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${styles["table__th"]} ${
                    col.align === "right"
                      ? styles["table__th--right"]
                      : col.align === "center"
                        ? styles["table__th--center"]
                        : ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles["table__tbody"]}>
            {data.map((row) => (
              <tr className={styles["table__tr"]} key={rowKey(row)}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${styles["table__td"]} ${
                      col.align === "right"
                        ? styles["table__td--right"]
                        : col.align === "center"
                          ? styles["table__td--center"]
                          : ""
                    }`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
