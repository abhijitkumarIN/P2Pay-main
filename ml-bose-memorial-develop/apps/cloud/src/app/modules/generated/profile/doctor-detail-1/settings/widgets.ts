import { Transformation, ElementDisplayType, StatisticalDataType, WidgetTypes } from '@kleeen/types';

export const widgets = [
  {
    actions: [],
    attributes: [],
    chartType: undefined,
    name: 'Dashboard 1',
    scope: undefined,
    type: 'dashboard',
    viableSolutions: [],
    viewId: 'ks-view-v3Xa2jBXGmhHUBZKZBKyBh',
    viewOrder: 1,
    widgets: [
      {
        actions: [],
        attributes: [
          {
            aggregation: Transformation.SelfSingle,
            canAddValues: false,
            canEditValues: false,
            crossLinking: [
              { title: 'Doctor Detail 1', slug: 'doctor-detail-1' },
              { title: 'PCP Details', slug: 'pcp-details' },
            ],
            elements: {
              displayComponent: ElementDisplayType.Label,
            },
            format: {},
            formatType: `uuid`,
            id: 213133,
            isFilterable: { in: false, out: false },
            label: `Eligible PCP`,
            name: `eligiblePcp`,
            statisticalType: StatisticalDataType.FreeForm,
            transformation: Transformation.SelfSingle,
          },
        ],
        chartType: WidgetTypes.SUMMARY_STATISTICS,
        id: `8875b49e-ecb3-41a7-882b-69f22aa2960e`,
        params: {
          operationName: `widget_statistics8875b49e_ecb3_41a7_882b_69f22aa2960e`,
          value: {
            format: {},
            formatType: `uuid`,
            label: `Eligible PCP`,
            name: `eligiblePcp`,
            transformations: [
              {
                transformation: Transformation.SelfSingle,
                isPrimary: true,
              },
            ],
          },
        },
        scope: undefined,
        sortOrder: 0,
        title: `Summary Doctor`,
        viableSolutions: [],
        viewId: 'ks-view-v3Xa2jBXGmhHUBZKZBKyBh',
      },
    ],
  },
];
