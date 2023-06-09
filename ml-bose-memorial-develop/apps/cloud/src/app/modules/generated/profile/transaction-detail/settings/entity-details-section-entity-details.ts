export const entityDetailsSectionEntityDetails = [
  {
    attributes: [
      {
        id: 201633,
        statisticalType: 'Data - Categorical - free form',
        canAddValues: true,
        canEditValues: true,
        format: {},
        formatType: 'uuid',
        hasMany: false,
        label: 'Transaction ID',
        name: 'transactionId',
        rawEntityName: 'TransactionId',
        crossLinking: [{ title: 'Transaction Detail', slug: 'transaction-detail' }],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label', inputComponent: 'FieldTextAutoComplete' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201633',
        readOnly: false,
        fullWidth: true,
      },
      {
        id: 201638,
        statisticalType: 'Data - Numeric - Temporal',
        canAddValues: true,
        canEditValues: false,
        format: {},
        formatType: 'date',
        hasMany: false,
        label: 'Transaction Date',
        name: 'transactionDate',
        rawEntityName: 'TransactionDate',
        crossLinking: [],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201638',
        readOnly: true,
        fullWidth: false,
      },
      {
        id: 201635,
        statisticalType: 'Data - Categorical - free form',
        canAddValues: true,
        canEditValues: false,
        format: {},
        formatType: 'full_name',
        hasMany: false,
        label: 'Transaction Member',
        name: 'transactionMember',
        rawEntityName: 'TransactionMember',
        crossLinking: [{ title: 'Member Details', slug: 'member-details' }],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201635',
        readOnly: true,
        fullWidth: true,
      },
      {
        id: 201640,
        statisticalType: 'Data - Categorical - free form',
        canAddValues: true,
        canEditValues: false,
        format: {},
        formatType: 'full_name',
        hasMany: false,
        label: 'Transaction PCP',
        name: 'transactionPcp',
        rawEntityName: 'TransactionPcp',
        crossLinking: [{ title: 'Doctor Details', slug: 'doctor-details' }],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201640',
        readOnly: true,
        fullWidth: true,
      },
      {
        id: 201636,
        statisticalType: 'Data - Categorical - free form',
        aggregation: 'countTotal',
        canAddValues: true,
        canEditValues: false,
        format: {},
        formatType: 'uuid',
        hasMany: true,
        label: 'Total Count of Transaction Donor',
        name: 'transactionDonor',
        rawEntityName: 'TransactionDonor',
        crossLinking: [],
        isPrimary: true,
        transformation: 'countTotal',
        metadata: 'countTotal',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201636',
        readOnly: true,
        fullWidth: false,
      },
      {
        id: 201643,
        statisticalType: 'Data - Numeric - NTG - Discrete',
        canAddValues: true,
        canEditValues: false,
        format: { max: 100, min: 1, prefix: '$', suffix: 'k' },
        formatType: 'USD',
        hasMany: false,
        label: 'Invoice Amount',
        name: 'invoiceAmount',
        rawEntityName: 'InvoiceAmount',
        crossLinking: [],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201643',
        readOnly: true,
        fullWidth: false,
      },
      {
        id: 201642,
        statisticalType: 'Data - Numeric - NTG - Discrete',
        canAddValues: true,
        canEditValues: false,
        format: { max: 100, min: 1, prefix: '$', suffix: 'k' },
        formatType: 'USD',
        hasMany: false,
        label: 'Member Paid Amount',
        name: 'memberPaidAmount',
        rawEntityName: 'MemberPaidAmount',
        crossLinking: [],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201642',
        readOnly: true,
        fullWidth: false,
      },
      {
        id: 201644,
        statisticalType: 'Data - Numeric - NTG - Discrete',
        canAddValues: true,
        canEditValues: false,
        format: { max: 100, min: 1, prefix: '$', suffix: 'k' },
        formatType: 'USD',
        hasMany: false,
        label: 'Total Donor Payments',
        name: 'totalDonorPayments',
        rawEntityName: 'TotalDonorPayments',
        crossLinking: [],
        isPrimary: true,
        transformation: 'selfSingle',
        metadata: 'selfSingle',
        elements: { displayComponent: 'Label' },
        widgetId: 'entity_detail_ef1a5dc7_f959_41a1_bd6e_b1552a053125_201644',
        readOnly: true,
        fullWidth: false,
      },
    ],
    chartType: '[WIDGET] SLOT',
    id: '311872ae-043c-4340-8e08-7850b1da6857',
    name: 'Summary Drawer 1',
    params: {
      baseModel: 'TransactionId',
      operationName: 'entity_detail_311872ae_043c_4340_8e08_7850b1da6857',
      taskName: 'transactionDetail',
    },
  },
];
