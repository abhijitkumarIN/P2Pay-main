import './InputElement.scss';

import { Cell, ListItem, WidgetDataAttributes } from '@kleeen/types';
import { Loader, UpdatePayload, ValidationResponseErrors } from '@kleeen/react/components';
import {
  getAttributeBackendFormat,
  getAttributeFormat,
  getAttributeFormatType,
  getAttributeTransformation,
  getFormat,
} from '../../utils/format';
import { useEffect, useRef, useState } from 'react';
import {
  useKleeenFormatChecker,
  useKsAutoComplete,
  useUrlQueryParams,
  useWidgetContext,
} from '@kleeen/react/hooks';

import { InputElementProps } from './input-element.model';
import camelCase from 'lodash.camelcase';
import classnames from 'classnames';
import { getInputElement } from './input-element-catalog';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useAttributeValue } from '../../hooks';

const bem = 'ks-input-element-section';

export function InputElement({
  addErrors,
  attribute,
  data,
  elements,
  isLoading: isLoadingWidgetContext,
  params,
  registerEvents,
  taskName,
  widgetId,
}: InputElementProps) {
  const { data: autoCompleteValues, isLoading: isLoadingAutocomplete } = useKsAutoComplete({
    entity: attribute.rawEntityName,
    taskName,
    widgetId,
  });

  const attributeValue = useAttributeValue({
    attribute,
    data,
    isLoading: isLoadingWidgetContext,
  });

  const [{ validateFormField }, validationResponse] = useKleeenFormatChecker({
    taskName,
    widgetId,
    formField: attribute.name,
  });

  const hasErrorsRef = useRef(false);

  useEffect(() => {
    hasErrorsRef.current = validationResponse?.errors?.length > 0;
    addErrors?.({ [attribute.name]: hasErrorsRef.current });
  }, [validationResponse?.errors?.length]);

  const { paramsBasedOnRoute, version: queryParamsVersion } = useUrlQueryParams();

  // Local state and refs
  const [selectedOption, setSelectedOption] = useState<ListItem | null>(null);
  const selectedOptionRef = useRef(selectedOption);
  const [value, setValue] = useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const attributeValueRef = useRef<any | Cell[]>(attributeValue); // eslint-disable-line @typescript-eslint/no-explicit-any
  const valueRef = useRef(value);

  // Props extraction
  const attributeFormat = getAttributeFormat(params);
  const attributeFormatType = getAttributeFormatType(params);
  const attributeHasMany = Boolean(attribute.hasMany);
  const attributeName = attribute.name;
  const attributeTransformation = getAttributeTransformation(params);
  const backendFormat = getAttributeBackendFormat(attribute.name)(data);
  const format = getFormat({ attributeFormat, backendFormat });
  const isLoading = isLoadingAutocomplete || isLoadingWidgetContext;

  useEffect(() => {
    const newAttributeValue = Array.isArray(attributeValue) ? attributeValue : attributeValue?.displayValue;

    attributeValueRef.current = newAttributeValue;
    setValue(newAttributeValue);
  }, [attributeValue]);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    valueRef.current = value;
    if (value) validateFormField(value);
  }, [value]);

  useEffect(() => {
    registerEvents?.({
      id: attribute.id,
      onSave,
      onCancel,
    });
  }, [queryParamsVersion]);

  function getInputPayload(): UpdatePayload {
    const baseModel = camelCase(params?.baseModel);
    const id = paramsBasedOnRoute[baseModel] || selectedOptionRef?.current?.id;
    const isDisplayValue = attributeName === baseModel;
    const paramKey = isDisplayValue ? WidgetDataAttributes.DisplayValue : attributeName;
    const paramValue = getPayloadParamValue({
      hasMany: attributeHasMany,
      inputValue: valueRef.current,
      isDisplayValue,
      selectedOptionValue: selectedOptionRef.current,
    });

    return {
      entity: params?.baseModel,
      hasErrors: hasErrorsRef.current,
      params: {
        id,
        [paramKey]: paramValue,
      },
    };
  }

  function onCancel() {
    setSelectedOption(null);
    setValue(attributeValueRef.current);
  }

  function onSave() {
    const hasValueChanged = JSON.stringify(attributeValueRef.current) !== JSON.stringify(valueRef.current);
    if (!hasValueChanged) return;

    const payload = getInputPayload();
    return payload;
  }

  if (isLoading) return <Loader />;

  const { inputComponent, rules } = elements;
  const InputComponent = getInputElement(inputComponent);

  if (isNilOrEmpty(InputComponent)) return null;

  return (
    <div className={classnames(bem, 'input-element-section')}>
      <InputComponent
        autoCompleteValues={autoCompleteValues}
        element={inputComponent}
        format={format}
        formatType={attributeFormatType}
        getInputElement={getInputElement}
        rules={rules}
        setSelectedOption={setSelectedOption}
        setValue={setValue}
        transformation={attributeTransformation}
        value={value}
      />
      {
        <ValidationResponseErrors
          className={classnames(`${bem}__list`, 'input-lu-error')}
          response={validationResponse}
        />
      }
    </div>
  );
}

//#region Private members
interface GetPayloadParamValue {
  hasMany: boolean;
  inputValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  isDisplayValue: boolean;
  selectedOptionValue: ListItem;
}

function getPayloadParamValue({
  hasMany,
  inputValue,
  isDisplayValue,
  selectedOptionValue,
}: GetPayloadParamValue): ListItem | any {
  const isSingleOrIsNotDisplayValue = hasMany || isDisplayValue;

  if (isSingleOrIsNotDisplayValue) {
    return inputValue;
  }

  const inputObject = {
    displayValue: inputValue,
    id: selectedOptionValue?.id,
  };

  return inputObject;
}
//#endregion
