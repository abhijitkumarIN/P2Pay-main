import { mockDataPoint } from '@kleeen/testing/front-end';
import { renderHook } from '@testing-library/react-hooks';
import { useAttributeInteractions } from './index';
import { useIsInvestigation } from '@kleeen/react/hooks';
import { Transformation } from '@kleeen/types';

jest.mock('@kleeen/react/hooks', () => {
  return {
    ...(jest.requireActual('@kleeen/react/hooks') as Record<string, unknown>),
    useAvailableFiltersByWorkflow: () => ({
      availableFilters: [mockDataPoint.attribute],
      hasFilters: true,
    }),
    useIsInvestigation: jest.fn(),
  };
});

jest.mock('@kleeen/widgets', () => ({
  entityHasWidgets: () => true,
}));

describe('UseAttributeInteractions', () => {
  beforeEach(() => {
    (useIsInvestigation as jest.Mock).mockImplementation(() => false);
  });
  test('Attribute should not have crosslink on empty crosslinking', () => {
    const renderedHook = renderHook(() => useAttributeInteractions({ attribute: mockDataPoint.attribute }));
    const attributeInteractions = renderedHook?.result.current;

    expect(attributeInteractions.hasCrossLinking).toEqual(false);
  });

  test('Attribute should not have crosslink on temporary id', () => {
    const renderedHook = renderHook(() =>
      useAttributeInteractions({ attribute: mockDataPoint.attribute, isIdTemporary: true }),
    );
    const attributeInteractions = renderedHook?.result.current;

    expect(attributeInteractions.hasCrossLinking).toEqual(false);
  });

  test('Attribute should not have crosslink interaction on Investigation', () => {
    (useIsInvestigation as jest.Mock).mockImplementation(() => true);
    const mockAttributeWithCrosslink = {
      ...mockDataPoint.attribute,
      crossLinking: [
        {
          slug: 'player-details',
          title: 'player details',
        },
      ],
    };
    const renderedHook = renderHook(() =>
      useAttributeInteractions({ attribute: mockAttributeWithCrosslink }),
    );
    const attributeInteractions = renderedHook?.result.current;

    expect(attributeInteractions.hasCrossLinking).toEqual(false);
  });

  test('Attribute should have crosslink every interaction enabled', () => {
    const mockAttributeWithCrosslink = {
      ...mockDataPoint.attribute,
      crossLinking: [
        {
          slug: 'player-details',
          title: 'player details',
        },
      ],
    };
    const renderedHook = renderHook(() =>
      useAttributeInteractions({ attribute: mockAttributeWithCrosslink }),
    );
    const attributeInteractions = renderedHook?.result.current;

    expect(attributeInteractions.hasCrossLinking).toEqual(true);
    expect(attributeInteractions.hasFilters).toEqual(true);
    expect(attributeInteractions.hasPreview).toEqual(true);
  });

  test('Attribute with countTotal transformation should not have crosslink interaction', () => {
    const mockAttributeWithCrosslink = {
      ...mockDataPoint.attribute,
      transformation: Transformation.CountTotal,
      crossLinking: [
        {
          slug: 'player-details',
          title: 'player details',
        },
      ],
    };
    const renderedHook = renderHook(() =>
      useAttributeInteractions({
        attribute: mockAttributeWithCrosslink,
        excludeCrossLinking: true,
      }),
    );
    const attributeInteractions = renderedHook?.result.current;

    expect(attributeInteractions.hasCrossLinking).toEqual(false);
  });
});
