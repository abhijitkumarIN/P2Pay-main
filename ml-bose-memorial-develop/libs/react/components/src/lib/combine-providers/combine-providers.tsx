import { CombineProvidersProps } from './combine-providers.model';

export function KsCombineProviders({ children, providers }: CombineProvidersProps) {
  return providers.reduce((tree, Provider) => <Provider>{tree}</Provider>, children);
}

export function KsCombineRightProviders({ children, providers }: CombineProvidersProps) {
  return providers.reduceRight((tree, Provider) => <Provider>{tree}</Provider>, children);
}
