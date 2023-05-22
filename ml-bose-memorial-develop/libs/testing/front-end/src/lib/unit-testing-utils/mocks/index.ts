import { ElementDisplayType, StatisticalDataType, Transformation } from '@kleeen/types';

export const mockUseLocationDetailsValue = {
  hash: '',
  pathname: '/profile/match-overview',
  search: '?match=1fcd27f7-bfa9-40e2-bc6f-59601e626daf',
  state: null,
};

export const mockDefaultTaskName = 'TestingTask';

export const mockDataPoint = {
  attribute: {
    id: 300982,
    statisticalType: StatisticalDataType.Categorical,
    canAddValues: true,
    canEditValues: true,
    format: { examples: ['Elevator Door', 'Front Door', 'Side Door', 'Open Office Door'] },
    formatType: 'prime',
    hasMany: false,
    label: 'Door',
    name: 'door',
    rawEntityName: 'Door',
    crossLinking: [],
    isPrimary: true,
    transformation: Transformation.SelfSingle,
    aggregation: Transformation.SelfSingle,
    metadata: 'selfSingle',
    elements: { displayComponent: ElementDisplayType.Label },
    widgetId: 'entity_detail_f6427b33_9dad_4524_933d_7ce7def17999_300982',
    readOnly: false,
    fullWidth: false,
  },
  value: {
    id: '403a368e-060c-42ef-9dbe-32af053ca7a5',
    displayValue: 'Use of Key',
    displayMedia: {
      type: 'text',
      value: 'Use of Key',
    },
  },
};
