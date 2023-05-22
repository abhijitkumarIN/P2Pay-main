export interface RefreshControlProps {
  onRefresh: () => void;
  pause?: boolean;
  translate?: (value: string) => string;
  taskName?: string;
}
