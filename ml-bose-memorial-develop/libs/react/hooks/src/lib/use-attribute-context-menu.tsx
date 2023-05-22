import { DataPoint, ReactElement, VisualizationWidgetProps } from '@kleeen/types';
import React, { useContext, useEffect, useState } from 'react';
import { WorkflowProvider, WorkflowType, defaultWorkflowContextValues } from './useWorkflowProvider';

interface MenuContextContext extends Pick<VisualizationWidgetProps, 'chartType' | 'params' | 'widgetId'> {
  dataPoints: DataPoint[];
  e?: { currentTarget: EventTarget };
  workflowData?: WorkflowType;
}

interface MenuContextProvider {
  contextualToggle: boolean;
  context: MenuContextContext;
  openMenu: (props: MenuContextContext) => void;
  setContextualToggle: (isOpen: boolean) => void;
}

const defaultMenuContextValues: MenuContextProvider = {
  contextualToggle: false,
  context: {
    dataPoints: [],
    workflowData: defaultWorkflowContextValues,
  } as MenuContextContext,
  openMenu: (props) => props,
  setContextualToggle: (isOpen) => isOpen,
};

const MenuContext = React.createContext<MenuContextProvider>(defaultMenuContextValues);

export function useAttributeContextMenu() {
  const menuContext = useContext(MenuContext);

  return menuContext;
}

interface AttributeContextMenuProviderProps {
  children: ReactElement;
}

export function AttributeContextMenuProvider({ children }: AttributeContextMenuProviderProps) {
  const [contextualToggle, setContextualToggle] = useState(false);
  const [context, setContext] = useState<MenuContextContext>(defaultMenuContextValues.context);

  useEffect(() => {
    if (!contextualToggle) {
      setContext(defaultMenuContextValues.context);
    }
  }, [contextualToggle]);

  return (
    <WorkflowProvider value={context.workflowData}>
      <MenuContext.Provider
        value={{
          openMenu: ({ e, ...props }) => {
            setContextualToggle(true);

            if (context) {
              setContext({
                e,
                ...props,
              });
            }
          },
          setContextualToggle,
          contextualToggle,
          context,
        }}
      >
        {children}
      </MenuContext.Provider>
    </WorkflowProvider>
  );
}
