import { useKleeenActions, useKleeenContext } from '@kleeen/react/hooks';

import { isNilOrEmpty } from '@kleeen/common/utils';
import { useEffect } from 'react';

const taskName = 'registration';

export function useMember(phoneNumber: string | number, memberName: string | number) {
  const memberActions = useKleeenActions(taskName);
  const { entity, isLoading, status } = useKleeenContext(taskName);
  const hasBeenUpdated = status.version;

  const hasPhoneNumber = !isNilOrEmpty(phoneNumber);

  useEffect(() => {
    if (hasPhoneNumber) {
      memberActions.getRequest({
        entity: memberName,
        params: { id: phoneNumber },
      });
    }
  }, [memberName, phoneNumber]);

  useEffect(() => {
    if (hasPhoneNumber && hasBeenUpdated) {
      memberActions.getRequest({
        entity: memberName,
        params: { id: phoneNumber },
      });
    }
  }, [memberName, hasBeenUpdated, phoneNumber]);

  return { entity, isLoading };
}
