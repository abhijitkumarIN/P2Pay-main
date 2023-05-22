import { act, renderHook } from '@testing-library/react-hooks';

import React from 'react';
import { useAnchorElement } from './useAnchorElement';

const element = <div>AnchorElementTest</div>;

describe('useAnchorElement', () => {
  test('Should be initially null', () => {
    const renderedHook = renderHook(() => useAnchorElement());
    const renderedHookResult = renderedHook?.result?.current;
    expect(renderedHookResult.anchorEl).toBeNull();
  });

  test('Should set a given element as the returned Anchor Element on click', () => {
    const event = {
      currentTarget: element,
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    const { result: renderedHookResult } = renderHook(() => useAnchorElement());
    expect(renderedHookResult.current.anchorEl).toBeNull();
    act(() => renderedHookResult.current.handleClick(event));
    expect(renderedHookResult.current.anchorEl).toMatchObject(element);
  });

  test('Should set as null the Anchor Element on close', () => {
    const event = {
      currentTarget: element,
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    const { result: renderedHookResult } = renderHook(() => useAnchorElement());
    expect(renderedHookResult.current.anchorEl).toBeNull();
    act(() => renderedHookResult.current.handleClick(event));
    expect(renderedHookResult.current.anchorEl).toMatchObject(element);
    act(() => renderedHookResult.current.handleClose());
    expect(renderedHookResult.current.anchorEl).toBeNull();
  });
});
