import { KUIConnect } from '@kleeen/core-react';
import { KsAddDialog } from '@kleeen/react/components';
import React from 'react';

function EligiblePcpAddModal({ translate, ...props }) {
  function handleAction(e, payload) {
    // *Add your custom code here
    props.onAction(e, payload);
    props.onClose();
  }

  return (
    <KsAddDialog {...props} onAction={handleAction} translate={translate}>
      <div style={{ display: 'inline-block' }}>
        <p>
          Open the code for <strong>add</strong>'s Custom Action at
        </p>
        <cite style={{ color: 'var(--secondary-color)', overflowWrap: 'break-word' }}>
          apps/cloud/src/app/modules/endProduct/eligible-pcp/add-modal.js
        </cite>
        <p>Update the content and save the file to see your changes.</p>
      </div>
    </KsAddDialog>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(EligiblePcpAddModal);
