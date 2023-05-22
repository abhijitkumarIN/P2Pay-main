export type ParamsBasedOnRoute = Record<string, any>;

export interface UrlQueryParams {
  paramsBasedOnRoute: ParamsBasedOnRoute;
  version: number;
}
