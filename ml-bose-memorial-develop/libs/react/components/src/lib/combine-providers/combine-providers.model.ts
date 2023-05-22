export interface CombineProvidersProps {
  children: JSX.Element;
  providers: ((...args: any[]) => any)[];
}
