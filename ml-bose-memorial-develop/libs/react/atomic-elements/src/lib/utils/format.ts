import { Attribute, ElementDisplayType, FormatProps, StatisticalDataType } from '@kleeen/types';
import { path, pathOr } from 'ramda';

import { isNilOrEmpty } from '@kleeen/common/utils';

interface GetFormat {
  attributeFormat: FormatProps;
  backendFormat: FormatProps;
}

export const getAttributeFormat = path(['value', 'format']);
export const getAttributeFormatType = path(['value', 'formatType']);
export const getAttributeTransformation = path(['value', 'transformation']);

export function getAttributeBackendFormat(name: string) {
  return path(['format', name]);
}

export function getFormat({ attributeFormat, backendFormat }: GetFormat): FormatProps {
  return isNilOrEmpty(backendFormat) ? attributeFormat : backendFormat;
}

export const getFormatedResults = (component, results, crosslinking) => {
  let formatedResults;
  if (component === ElementDisplayType.Chips && Array.isArray(results) && results.length) {
    formatedResults = results.map((result, index) => {
      return {
        displayValue: result.value || result,
        id: crosslinking[index].id,
      };
    });
  } else {
    formatedResults = {
      displayValue: results,
      id: crosslinking?.id,
    };
  }
  return formatedResults;
};

export const getSeverityLevelFormatter = ({ attribute, results }: { attribute: Attribute; results: any }) => {
  const severityLevelTypes = pathOr([], ['format', 'examples'], attribute);

  const formattedSeverityLevelTypes = severityLevelTypes.reduce((acc, val, index) => {
    acc[val] = index + 1;
    return acc;
  }, []);

  const isTimeStamp = results.some((value) => Array.isArray(value));

  const parsedResults = isTimeStamp
    ? results.map(([_, severityLevel]) => {
        const severityLevelValue = formattedSeverityLevelTypes[severityLevel];
        return [_, !severityLevelValue ? severityLevel : severityLevelValue];
      })
    : results;
  return { formattedSeverityLevelTypes, parsedResults };
};
