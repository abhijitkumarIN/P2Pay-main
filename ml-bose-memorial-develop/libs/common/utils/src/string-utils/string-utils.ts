export function buildUrlQueryParams(params: { [key: string]: string }): string {
  return Object.getOwnPropertyNames(params)
    .map((key, i) => `${i === 0 ? '?' : ''}${key}=${params[key]}`)
    .join('&');
}

/**
 * @deprecated Use getWorkflowFilterName instead.
 */
export function generateFilterName(workflowId: string): string {
  return getWorkflowFilterName(workflowId);
}

export function getFileExtension(filename: string): string {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? '' : ext[1];
}

export function getWorkflowFilterName(workflowId: string): string {
  const filenameToUse = workflowId.replace(/-/g, '_').toLocaleLowerCase();
  const filterName = `workflow_filters_${filenameToUse}`;
  return filterName;
}

export function hasTrailingSlash(pathname: string): boolean {
  return !!pathname && pathname.charAt(pathname.length - 1) === '/';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidJSONString(str: any): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function removeTrailingSlash(pathname: string): string {
  return hasTrailingSlash(pathname) ? pathname.slice(0, -1) : pathname;
}
