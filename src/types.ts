export type SortType = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T;
  title: string;
  width: number;
  visible?: boolean;
}
