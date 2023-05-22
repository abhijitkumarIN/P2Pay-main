import { ReactElement, Widget } from '@kleeen/types';
import { createContext, useContext } from 'react';

export const WidgetContext = createContext<Widget | null>(null);

export function useWidgetCardContext(): Widget | null {
  const workflowContext = useContext<Widget | null>(WidgetContext);

  return workflowContext;
}

interface WidgetProviderProps {
  children: ReactElement;
  value: Widget;
}

export function WidgetProvider({ children, value }: WidgetProviderProps) {
  return <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>;
}
