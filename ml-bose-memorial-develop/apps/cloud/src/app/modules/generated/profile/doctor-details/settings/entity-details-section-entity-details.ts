export const entityDetailsSectionEntityDetails = [
  {
    attributes: [
      {
        id: 201593,
        statisticalType: 'Data - Categorical - free form',
        canAddValues: true,
        canEditValues: false,
        format: {},
        formatType: 'full_name',
        hasMany: false,
        label: 'Primary Care Name',
        name: 'primaryCareName',
        rawEntityName: 'PrimaryCareName',
        crossLinking: [{ title: 'Doctor Details', slug: 'doctor-details' }],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ec8af742_49d1_4e0c_bef1_3308436b6f4c_201593',
        readOnly: true,
        fullWidth: true,
      },
    ],
    chartType: '[WIDGET] SLOT',
    id: '10ab0e2e-86cc-4194-836f-b7c8afc7d246',
    name: 'Doctor Summary',
    params: {
      baseModel: 'PrimaryCareName',
      operationName: 'entity_detail_10ab0e2e_86cc_4194_836f_b7c8afc7d246',
      taskName: 'doctorDetails',
    },
  },
];
