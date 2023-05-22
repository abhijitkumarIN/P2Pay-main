import { AccessControlPermission, Filters, Maybe } from '@kleeen/types';

export function getAvailableFilters(filters: Filters): Maybe<Filters> {
  const excludedFilters = [AccessControlPermission.HIDE, AccessControlPermission.DISABLED];

  return filters?.filter(
    ({ accessLevel }) => !excludedFilters.includes(accessLevel as AccessControlPermission),
  );
}

export function getIsFilterAvailable({ filters, filterName }): boolean {
  const availableFilters = getAvailableFilters(filters);
  return (
    availableFilters && availableFilters.some(({ name }) => name.toLowerCase() === filterName?.toLowerCase())
  );
}
