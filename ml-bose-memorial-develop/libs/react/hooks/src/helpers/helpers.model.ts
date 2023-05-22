import { ContextMenuDataPoint } from '@kleeen/types';

export interface validateCrossLinkingProps {
  anchorEl: null | HTMLElement;
  handleAnchorClick?: (
    eventProps: React.MouseEvent<HTMLButtonElement>,
    cellDataPoints: ContextMenuDataPoint[],
  ) => void;
  hasInvestigations?: boolean;
  onCellClick: any;
  openModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
}
