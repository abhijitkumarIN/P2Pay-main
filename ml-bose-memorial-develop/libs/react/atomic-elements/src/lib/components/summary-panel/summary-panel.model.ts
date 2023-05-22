import { DisplayMedia, ErrorsType, ListingAttribute, RegisterEvents } from '@kleeen/types';

interface defaultLayoutProps {
  columnGap: number;
  containerPadding: number;
  keyValuePadding: number;
  keyWidth: number;
  valueWidth: number;
}
export interface SummaryPanelProps {
  addErrors?: (error: ErrorsType) => void;
  displayMedia?: DisplayMedia;
  entityDetails: ListingAttribute[];
  isEditing: boolean;
  isFromButtonSummary?: boolean;
  isLoadingMedia?: boolean;
  layoutProps?: defaultLayoutProps;
  registerEvents: RegisterEvents;
  taskName: string;
}
