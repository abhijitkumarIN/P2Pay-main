import { Transformation, ElementDisplayType, StatisticalDataType, WidgetTypes } from '@kleeen/types';

export const widgets = [
  {
    actions: [],
    attributes: [],
    chartType: undefined,
    name: 'Dashboard',
    scope: undefined,
    type: 'dashboard',
    viableSolutions: [],
    viewId: 'ks-view-3q26YZqcN1UQ9ZEm3uNTDe',
    viewOrder: 2,
    widgets: [
      {
        actions: [],
        attributes: [
          {
            aggregation: Transformation.SelfSingle,
            canAddValues: false,
            canEditValues: false,
            crossLinking: [{ title: 'Doctor Details', slug: 'doctor-details' }],
            elements: {
              displayComponent: ElementDisplayType.Label,
            },
            format: {},
            formatType: `full_name`,
            id: 201593,
            isFilterable: { in: false, out: false },
            label: `Primary Care Name`,
            name: `primaryCareName`,
            statisticalType: StatisticalDataType.FreeForm,
            transformation: Transformation.SelfSingle,
          },
        ],
        chartType: WidgetTypes.SUMMARY_STATISTICS,
        id: `766bfbac-d2e1-4544-b72f-939ccaa9edf3`,
        params: {
          operationName: `widget_statistics766bfbac_d2e1_4544_b72f_939ccaa9edf3`,
          value: {
            format: {},
            formatType: `full_name`,
            label: `Primary Care Name`,
            name: `primaryCareName`,
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
        title: `Doctor Summary`,
        viableSolutions: [],
        viewId: 'ks-view-3q26YZqcN1UQ9ZEm3uNTDe',
      },
      {
        actions: [],
        attributes: [],
        chartType: WidgetTypes.CUSTOM,
        component: 'profile/doctor-details/components/widget-2-gx-9-qv-84-yq-k-9-jh-u-ho-3-er-c-8',
        id: `0dc21558-6c6c-4f10-8562-5658318ff8db`,
        name: 'Doctor Schedule',
        scope: undefined,
        sortOrder: 1,
        title: `Doctor Schedule`,
        viableSolutions: [],
      },
    ],
  },
];
