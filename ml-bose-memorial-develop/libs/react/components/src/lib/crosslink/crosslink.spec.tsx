import '@testing-library/jest-dom';

import { WidgetTypes, crosslinkingInteractionType } from '@kleeen/types';
import { fireEvent, screen } from '@testing-library/react';
import {
  mockDataPoint,
  mockDefaultTaskName,
  mockUseLocationDetailsValue,
  ksDefaultRender as render,
  actions as sliceActions,
} from '@kleeen/testing/front-end';

import { KsCrosslink } from './crosslink';
import { useAttributeInteractions } from '../context-cell/hooks';
import { useIsInvestigation, useIsPreview } from '@kleeen/react/hooks';

const linkText = 'Test';
const mockContextMenuText = 'ContextMenuTextTest';

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Record<string, unknown>),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationDetailsValue;
  }),
}));

jest.mock('@kleeen/react/state-management', () => ({
  ...(jest.requireActual('@kleeen/react/state-management') as Record<string, unknown>),
  get actions() {
    return {
      [mockDefaultTaskName]: sliceActions.actions,
    };
  },
}));

jest.mock('@kleeen/react/components', () => {
  return { KsContextMenu: () => <div>{mockContextMenuText}</div> };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => {
      return { location: 'marimba-details' };
    },
    useLocation: () => {
      return { search: 'marimba-details' };
    },
  };
});

jest.mock('@kleeen/react/hooks', () => {
  return {
    ...(jest.requireActual('@kleeen/react/hooks') as Record<string, unknown>),
    useAvailableFiltersByWorkflow: () => ({ availableFilters: [], hasFilters: false }),
    useCrosslinkingInteraction: () => ({ crosslinkingInteraction: crosslinkingInteractionType.onClick }),
    useIsInvestigation: jest.fn(),
    useIsPreview: jest.fn(),
  };
});

jest.mock('../context-cell/hooks', () => {
  return {
    useAttributeInteractions: jest.fn(),
  };
});

describe('Crosslink', () => {
  test('Should render the context menu on click if has crosslink', () => {
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: true,
      hasFilters: false,
      hasPreview: false,
    }));
    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.getByText(mockContextMenuText)).toBeInTheDocument();
  });

  test.skip('Should render the context menu on click if has filters', () => {
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: false,
      hasFilters: true,
      hasPreview: false,
    }));
    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.getByText(mockContextMenuText)).toBeInTheDocument();
  });

  test.skip('Should render the context menu on click if has preview', () => {
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: false,
      hasFilters: false,
      hasPreview: true,
    }));
    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.getByText(mockContextMenuText)).toBeInTheDocument();
  });

  test('Should not render the context menu on click if there is no valid interaction', () => {
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: false,
      hasFilters: false,
      hasPreview: false,
    }));
    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.queryByText(mockContextMenuText)).toBeNull();
  });

  test.skip('Should render the context menu on Investigate', async () => {
    (useIsInvestigation as jest.Mock).mockImplementation(() => true);
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: false,
      hasFilters: false,
      hasPreview: false,
    }));

    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          transformation={mockDataPoint.attribute.transformation}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.queryByText(mockContextMenuText)).toBeInTheDocument();
  });

  test('Should not render the context menu on Preview', () => {
    (useIsPreview as jest.Mock).mockImplementation(() => true);
    (useAttributeInteractions as jest.Mock).mockImplementation(() => ({
      hasCrossLinking: true,
      hasFilters: true,
      hasPreview: true,
    }));

    render({
      component: (
        <KsCrosslink
          chartType={WidgetTypes.SUMMARY_STATISTICS}
          dataPoints={[mockDataPoint]}
          widgetId="8d097910-3f21-4eb3-86c9-a35845ad662d"
        >
          {linkText}
        </KsCrosslink>
      ),
    });

    expect(screen.getByText(linkText)).toBeInTheDocument();
    fireEvent.click(screen.getByText(linkText));
    expect(screen.queryByText(mockContextMenuText)).toBeNull();
  });
});
