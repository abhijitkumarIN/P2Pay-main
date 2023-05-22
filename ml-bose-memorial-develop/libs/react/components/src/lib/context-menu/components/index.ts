import {
  KsContextMenuAddInvestigationCardSection,
  KsContextMenuStartInvestigationSection,
} from './investigation';

import { ContextMenuSection } from '@kleeen/types';
import { ContextMenuSectionProps } from '../context-menu.model';
import { KsContextMenuCrossLinkSection } from './crosslink';
import { KsContextMenuFilterSection } from './filters';
import { KsContextMenuPreviewSection } from './preview';

export const contextMenuComponentBySection: {
  [key in ContextMenuSection]?: (props: ContextMenuSectionProps) => JSX.Element;
} = {
  [ContextMenuSection.AddInvestigationCard]: KsContextMenuAddInvestigationCardSection,
  [ContextMenuSection.CrossLink]: KsContextMenuCrossLinkSection,
  [ContextMenuSection.Filter]: KsContextMenuFilterSection,
  [ContextMenuSection.Preview]: KsContextMenuPreviewSection,
  [ContextMenuSection.StartInvestigation]: KsContextMenuStartInvestigationSection,
};
