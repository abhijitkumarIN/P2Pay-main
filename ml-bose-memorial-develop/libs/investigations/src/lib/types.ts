import { InvestigationMetadata, Widget } from '@kleeen/types';

export interface ResolvedInvestigationMetadata extends InvestigationMetadata {
  cardLevel: number;
  otherSolutions?: string[]; // TODO: Improve this naming
}

export interface WidgetWithMetadata extends Widget {
  metadata: ResolvedInvestigationMetadata;
}
