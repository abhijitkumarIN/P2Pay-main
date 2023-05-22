import { FilterOperators, IntervalDate, TimestampKey } from '@kleeen/types';
import {
  getFiltersInitialState,
  getFromValueOf,
  getRelativeDateValueOf,
  getToValueOf,
  manageOperations,
  mapWithStringify,
} from '../helpers';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useLocalStorage, useUserInfo } from '@kleeen/react/hooks';

import { isNilOrEmpty } from '@kleeen/common/utils';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { useUrlQueryParams } from './use-url-query-params';

interface FilterAdded {
  [FilterOperators.in]?: Array<string | number>;
  [FilterOperators.max]?: number;
  [FilterOperators.min]?: number;
}

interface FiltersAddedState {
  [category: string]: FilterAdded;
}

let filtersInUse = false;

export const areFiltersInUse = () => {
  return filtersInUse;
};

export const useFilters = (hasDateFilter = false) => {
  const queryParams = useUrlQueryParams({ useNestedObjects: true });
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;
  const navigation = useHistory();
  const localStoragekey = userName ? `filters-${navigation.location.pathname}-${userName}` : null;
  const { localStorageValue, setLocalStorageValue, removeLocalStorageValue } = useLocalStorage(
    localStoragekey,
    '',
  );
  const { paramsBasedOnRoute, version } = queryParams;
  filtersInUse = true;
  const [isApplyDisabled, setIsApplyDisabled] = useState(true);
  const [isApplyWithoutTimeDisabled, setIsApplyWithoutTime] = useState(true);
  const [isTimeApplyDisabled, setIsTimeApplyDisabled] = useState(true);
  const [from, setStateFrom] = useState<Moment>(() => getFromValueOf(paramsBasedOnRoute));
  const [to, setStateTo] = useState<Moment>(() => getToValueOf(paramsBasedOnRoute));
  const [relativeDate, setRelativeDate] = useState<string>(() => getRelativeDateValueOf(paramsBasedOnRoute));

  const setFrom = (date: Moment): void => {
    setStateFrom(date);
    if (date) setRelativeDate(undefined);
  };

  const setTo = (date: Moment): void => {
    setStateTo(date);
    if (date) setRelativeDate(undefined);
  };

  const datePickerState = { from, setFrom, to, setTo, relativeDate, setRelativeDate };

  useEffect(() => {
    const fromMs = from?.valueOf();
    const urlFromMs = getFromValueOf(paramsBasedOnRoute)?.valueOf();
    const toMs = to?.valueOf();
    const urlToMs = getToValueOf(paramsBasedOnRoute)?.valueOf();
    const relativeDateMs = relativeDate;
    const urlRelativeDateMs = getRelativeDateValueOf(paramsBasedOnRoute);

    if (urlFromMs !== fromMs || urlToMs !== toMs || urlRelativeDateMs !== relativeDateMs) {
      setIsApplyDisabled(false);
      setIsTimeApplyDisabled(false);
    }
  }, [to, from, relativeDate]);

  useEffect(() => {
    return () => {
      filtersInUse = false;
    };
  }, []);

  const applyFilterIntoUrl = (filtersToApply: Record<string, any>): void => {
    const urlQuery = queryString.stringify(mapWithStringify(filtersToApply));
    navigation.push(`?${urlQuery}`);
  };

  useEffect(() => {
    if (
      isNilOrEmpty(Object.entries(paramsBasedOnRoute)) &&
      isApplyDisabled &&
      !from &&
      !to &&
      !relativeDate
    ) {
      setIsApplyDisabled(true);
      setIsApplyWithoutTime(true);
    }

    const shouldApplyLocalStorageFiltersIntoUrl =
      isNilOrEmpty(Object.entries(paramsBasedOnRoute)) && version !== 0 && !isNilOrEmpty(localStorageValue);

    if (shouldApplyLocalStorageFiltersIntoUrl) {
      applyFilterIntoUrl(localStorageValue);
      if (localStorageValue.Timestamp?.relativeDate) {
        setRelativeDate(localStorageValue.Timestamp.relativeDate);
      }
    }
  }, [
    Object.entries(paramsBasedOnRoute).length,
    isApplyDisabled,
    localStoragekey,
    isNilOrEmpty(localStorageValue),
  ]);

  const [filtersAdded, setFilters]: [FiltersAddedState, (filtersAdded: FiltersAddedState) => void] = useState(
    () => {
      return getFiltersInitialState(paramsBasedOnRoute);
    },
  );

  const clearFilters = () => {
    setFilters({});
    removeLocalStorageValue();
  };

  useEffect(() => {
    const initialState = getFiltersInitialState(paramsBasedOnRoute);

    setFilters(initialState);
  }, [version]);

  const getTimeAndCommonFilters = (): {
    timeFilters: { Timestamp: { from?: number; to?: number; relativeDate?: string } };
    parsedFilters: FiltersAddedState;
  } => {
    const Timestamp: { from?: number; to?: number; relativeDate?: string } = {};
    if (hasDateFilter && (from || to || relativeDate)) {
      if (from) Timestamp.from = moment.utc(from).valueOf();
      if (to) Timestamp.to = moment.utc(to).valueOf();
      if (relativeDate) Timestamp.relativeDate = relativeDate;
    }
    const timeFilters =
      hasDateFilter && Object.keys(Timestamp).length ? { Timestamp } : { Timestamp: undefined };

    if (hasDateFilter && !Object.keys(Timestamp).length) {
      timeFilters.Timestamp = localStorageValue.Timestamp
        ? localStorageValue.Timestamp
        : { relativeDate: IntervalDate.allTime };
      setRelativeDate(timeFilters.Timestamp.relativeDate);
    }

    const regExp = new RegExp(`${TimestampKey.key}`, 'gi');

    // FIXME: Avoid this hack for cloning in the frontend.
    // FIXME: `JSON.parse` throw an exception if it fails, so the whole could crash.
    const parsedFilters = JSON.parse(JSON.stringify(filtersAdded).replace(regExp, ''));

    return { timeFilters, parsedFilters };
  };

  const handleFilterWithoutTimestamp = () => {
    const { parsedFilters } = getTimeAndCommonFilters();
    const { Timestamp } = paramsBasedOnRoute;
    const possibleUrlTimestamp = Timestamp ? { Timestamp } : {};
    const filtersToApply = { ...possibleUrlTimestamp, ...parsedFilters };

    setLocalStorageValue(filtersToApply);
    applyFilterIntoUrl(filtersToApply);
    setIsApplyWithoutTime(true);
  };

  const handleTimestampFilter = () => {
    const { timeFilters } = getTimeAndCommonFilters();
    const filtersToApply = { ...paramsBasedOnRoute, ...timeFilters };

    setLocalStorageValue(filtersToApply);
    applyFilterIntoUrl(filtersToApply);
    setIsTimeApplyDisabled(true);
  };

  const handleFilter = (): void => {
    const { timeFilters, parsedFilters } = getTimeAndCommonFilters();
    const filtersToApply = {
      ...parsedFilters,
      ...timeFilters,
    };

    setLocalStorageValue(filtersToApply);
    applyFilterIntoUrl(filtersToApply);
    setIsApplyDisabled(true);
  };

  useEffect(() => {
    const relativeDateURL = getRelativeDateValueOf(paramsBasedOnRoute);
    const fromURL = getFromValueOf(paramsBasedOnRoute);
    const toURL = getToValueOf(paramsBasedOnRoute);

    if (!relativeDateURL && !fromURL && !toURL) {
      if (!hasDateFilter) return;

      if (isNilOrEmpty(localStorageValue?.Timestamp)) {
        setRelativeDate(IntervalDate.allTime);
        return;
      }

      const { Timestamp } = localStorageValue;

      if (Timestamp?.from) setFrom(moment(Timestamp?.from));
      if (Timestamp?.to) setTo(moment(Timestamp?.to));
      if (Timestamp?.relativeDate) setRelativeDate(Timestamp?.relativeDate);

      return;
    }

    if (fromURL) setFrom(moment(fromURL));
    if (toURL) setTo(moment(toURL));
    if (relativeDateURL) setRelativeDate(relativeDateURL);
  }, [localStorageValue && paramsBasedOnRoute, paramsBasedOnRoute]);

  const addFilter = (category: string, operator: FilterOperators, value: string | number): void => {
    const newCategory = filtersAdded[category] || {};
    const newOperator = manageOperations(operator, value, newCategory[operator]);
    setFilters({
      ...filtersAdded,
      [category]: { ...newCategory, [operator]: newOperator },
    });
    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  const removeCategory = (category: string): void => {
    delete filtersAdded[category];
    setFilters({
      ...filtersAdded,
    });
    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  const removeValue = (category: string, name: string, operator: FilterOperators): void => {
    const newCategory = { ...filtersAdded[category] };
    if (operator === FilterOperators.in) {
      // TODO: should check if is the last item of a category remove also the category
      const currentOperatorValues = newCategory[operator] || [];
      const newOperatorValues = currentOperatorValues.filter((value) => name !== value);
      newCategory[operator] = newOperatorValues;

      if (newOperatorValues.length === 0) {
        delete newCategory[operator];
      }
    } else if (operator === FilterOperators.max || operator === FilterOperators.min) {
      delete newCategory[operator];
    }

    if (Object.keys(newCategory).length === 0) {
      removeCategory(category);
    } else {
      setFilters({
        ...filtersAdded,
        [category]: newCategory,
      });
    }

    setIsApplyDisabled(false);
    setIsApplyWithoutTime(false);
  };

  return {
    addFilter,
    clearFilters,
    datePickerState,
    filtersAdded,
    handleFilter,
    handleFilterWithoutTimestamp,
    handleTimestampFilter,
    isApplyDisabled,
    isApplyWithoutTimeDisabled,
    isTimeApplyDisabled,
    queryParams,
    removeCategory,
    removeValue,
    setIsApplyDisabled,
    setIsApplyWithoutTime,
  };
};
