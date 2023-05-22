import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react';
import { Maybe, ReactElement, Widget, WidgetCategory } from '@kleeen/types';

export type PreviewPanel = {
  previewTitle: ReactElement;
  previewWidgets: Widget[];
  previewWidgetCategory: WidgetCategory | null;
};

export type PreviewPanelActions = {
  closePreviewPanel: () => void;
  openPreviewPanel: (title: ReactElement) => void;
  setPreviewWidgets: Dispatch<SetStateAction<Widget[]>>;
  setPreviewWidgetCategory: Dispatch<SetStateAction<Maybe<WidgetCategory> | null>>;
};

export type PreviewPanelIsOpen = {
  isPreviewOpen: boolean;
};

export const PreviewPanelActionsContext = createContext<PreviewPanelActions>(null);
export const PreviewPanelContext = createContext<PreviewPanel>(null);
export const PreviewPanelIsOpenContext = createContext<PreviewPanelIsOpen>(null);

export function usePreviewPanel() {
  const context = useContext<PreviewPanel>(PreviewPanelContext);

  if (!context) {
    throw new Error('This hook cannot be consumed outside "PreviewPanelLayoutProvider" component');
  }

  return context;
}

export function usePreviewPanelActions() {
  const context = useContext<PreviewPanelActions>(PreviewPanelActionsContext);

  if (!context) {
    throw new Error('This hook cannot be consumed outside "PreviewPanelLayoutProvider" component');
  }

  return context;
}

export function usePreviewPanelIsOpen() {
  const context = useContext<PreviewPanelIsOpen>(PreviewPanelIsOpenContext);

  if (!context) {
    throw new Error('This hook cannot be consumed outside "PreviewPanelLayoutProvider" component');
  }

  return context;
}

export function PreviewPanelLayoutProvider({ children }: { children: ReactElement }) {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState<ReactElement>(null);
  const [previewWidgets, setPreviewWidgets] = useState<Widget[]>([]);
  const [previewWidgetCategory, setPreviewWidgetCategory] = useState<WidgetCategory | null>(null);

  function closePreviewPanel() {
    setPreviewOpen(false);

    // Clean state after close
    setPreviewTitle(null);
    setPreviewWidgets([]);
    setPreviewWidgetCategory(null);
  }

  function openPreviewPanel(title: ReactElement) {
    // Set state before open
    setPreviewTitle(title);

    setPreviewOpen(true);
  }

  const previewPanelActionsContextValue = useMemo(
    () => ({
      closePreviewPanel,
      openPreviewPanel,
      setPreviewWidgets,
      setPreviewWidgetCategory,
    }),
    [closePreviewPanel, openPreviewPanel, setPreviewWidgets, setPreviewWidgetCategory],
  );
  const previewPanelContextValue = useMemo(
    () => ({
      isPreviewOpen,
      previewTitle,
      previewWidgets,
      previewWidgetCategory,
    }),
    [isPreviewOpen, previewTitle, previewWidgets, previewWidgetCategory],
  );
  const previewPanelIsOpenContextValue = useMemo(
    () => ({
      isPreviewOpen,
    }),
    [isPreviewOpen],
  );

  return (
    <PreviewPanelContext.Provider value={previewPanelContextValue}>
      <PreviewPanelIsOpenContext.Provider value={previewPanelIsOpenContextValue}>
        <PreviewPanelActionsContext.Provider value={previewPanelActionsContextValue}>
          {children}
        </PreviewPanelActionsContext.Provider>
      </PreviewPanelIsOpenContext.Provider>
    </PreviewPanelContext.Provider>
  );
}
