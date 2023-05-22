import { ReactNode, LegacyRef } from 'react';

export interface LinkProps {
  anchorEl: LegacyRef<HTMLDivElement>;
  children: ReactNode;
  highlight: boolean;
  onClick: () => void;
  onContextMenu?: () => void;
  testId?: string;
  underline: boolean;
}
