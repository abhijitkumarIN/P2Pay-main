import { useEffect, useState } from 'react';

import { UrlQueryParams } from '@kleeen/types';
import { isValidJSONString } from '@kleeen/common/utils';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { usePrevious } from './usePrevious';

interface UseUrlQueryParams {
  extraParamsToInclude?: Record<string, any>;
  useNestedObjects?: boolean;
}

export function useUrlQueryParams({
  extraParamsToInclude,
  useNestedObjects,
}: UseUrlQueryParams = {}): UrlQueryParams {
  const location = useLocation();
  const currentSearch = location.search;
  const previousSearch = usePrevious(location.search);
  const [urlQueryParams, setUrlQueryParams] = useState<UrlQueryParams>({
    paramsBasedOnRoute: {},
    version: 0,
  });

  useEffect(() => {
    if (currentSearch === previousSearch) return;

    const paramsBasedOnRoute = queryString.parse(currentSearch, { parseBooleans: true });

    if (useNestedObjects) {
      const mapWithParsed = Object.keys(paramsBasedOnRoute).reduce(
        (acc, key) => ({
          ...acc,
          [key]: isValidJSONString(paramsBasedOnRoute[key])
            ? JSON.parse(paramsBasedOnRoute[key] as string)
            : paramsBasedOnRoute[key],
        }),
        {},
      );

      setUrlQueryParams((prevUrlQueryParams) => {
        return {
          paramsBasedOnRoute: { ...mapWithParsed, ...extraParamsToInclude },
          version: prevUrlQueryParams.version + 1,
        };
      });

      return;
    }

    setUrlQueryParams((prevUrlQueryParams) => {
      return {
        paramsBasedOnRoute: {
          ...paramsBasedOnRoute,
          ...extraParamsToInclude,
        },
        version: prevUrlQueryParams.version + 1,
      };
    });
  }, [currentSearch]);

  return urlQueryParams;
}
