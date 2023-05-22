import { RenderOptions, render as rtlRender } from '@testing-library/react';

import { EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockDefaultTaskName } from '../mocks';
import { slice } from '../state-management';

export const mockStore = configureStore({
  reducer: {
    [mockDefaultTaskName]: slice,
  },
});

export function ksDefaultRender({
  component,
  renderOptions = {},
  store = mockStore,
}: {
  component: React.ReactElement;
  renderOptions?: RenderOptions;
  store?: EnhancedStore;
}) {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions });
}
