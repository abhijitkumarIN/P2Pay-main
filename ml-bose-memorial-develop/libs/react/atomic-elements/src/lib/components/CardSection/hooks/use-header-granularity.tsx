import { GenericFunctions, StatisticalDataType, TemporalBucket, Transformation, Widget } from '@kleeen/types';
import { getAttributeFromName, sdtMatchesRule } from '@kleeen/frontend/utils';
import { useEffect, useState } from 'react';

import GranularityDropdown from '../components/granularity-dropdown/granularity-dropdown';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface UseHeaderGranularityProps {
  actions: GenericFunctions;
  widget: Widget;
}

export function useHeaderGranularity({ actions, widget }: UseHeaderGranularityProps): JSX.Element | null {
  const [granularityDropdown, setGranularityDropdown] = useState<JSX.Element | null>(null);
  const actionsLength = Object.keys(actions || {}).length;

  useEffect(() => {
    const groupByAttribute = getAttributeFromName({
      attributeName: widget?.params?.groupBy?.name,
      widget,
    });

    if (!isNilOrEmpty(groupByAttribute)) {
      const groupByIsTemporal = sdtMatchesRule({
        sdt: groupByAttribute.statisticalType,
        rule: StatisticalDataType.NumericTemporal,
      });
      if (groupByIsTemporal) {
        setGranularityDropdown(
          <GranularityDropdown
            onSelectGranularity={(bucket: TemporalBucket) => {
              handleSelectGranularity({ actions, bucket, widget });
            }}
          />,
        );
      }
    }
  }, [actionsLength, widget?.name, widget?.params?.groupBy?.name]);

  return granularityDropdown;
}

//#region Private members
interface HandleSelectGranularity extends UseHeaderGranularityProps {
  bucket?: TemporalBucket;
}

function handleSelectGranularity({ actions, bucket, widget }: HandleSelectGranularity) {
  if (actions) {
    actions.setGroupBy({
      bucket,
      transformation: bucket ? Transformation.TemporalBucket : widget?.params?.groupBy.transformation,
    });
  }
}
//#endregion
