import { ItemType, KsButtonText, KsDropDown, KsSvgIcon } from '@kleeen/react/components';
import { MutableRefObject, Ref, forwardRef, useState } from 'react';
import { ReactElement, TemporalBucket, granularityOptions } from '@kleeen/types';

import { Translate } from '@kleeen/core-react';
import noop from 'lodash.noop';
import { useStyles } from './granularity-dropdown.styles';

interface GranularityDropdownProps {
  onSelectGranularity: (selected: TemporalBucket) => void;
}

function GranularityDropdown({ onSelectGranularity = noop }: GranularityDropdownProps) {
  const [selectedGranularity, setSelectedGranularity] = useState<TemporalBucket>(null);
  const classes = useStyles();

  const GranularityButton = forwardRef(
    (
      { setOpen }: { currentItem: ItemType; setOpen: (open: boolean) => void },
      ref: MutableRefObject<HTMLElement>,
    ) => {
      return (
        <KsButtonText ref={ref as Ref<HTMLButtonElement>} onClick={() => setOpen(true)}>
          <div className={classes.granularityIconContainer}>
            <div className={classes.selectedGranularityText}>
              {selectedGranularity?.magnitude}
              <Translate
                id={`app.granularity.short.${
                  selectedGranularity?.interval ? selectedGranularity?.interval : 'rawData'
                }`}
              />
            </div>
            <div className={classes.granularityIcon}>
              <KsSvgIcon icon="ks-granularity" size="extra-large" />
            </div>
          </div>
        </KsButtonText>
      );
    },
  );

  function getGranularityLabel({ interval, magnitude }: TemporalBucket): ReactElement {
    const isMagnitudeGreaterThanOne = magnitude > 1;
    return (
      <span>
        {isMagnitudeGreaterThanOne ? magnitude + ' ' : ''}
        <Translate id={`app.granularity.${interval}`} />
        {isMagnitudeGreaterThanOne ? 's' : ''}
      </span>
    );
  }

  function optionsParser(defaultOptions: TemporalBucket[]): ItemType<TemporalBucket>[] {
    return defaultOptions.map((option) => ({
      handleOnClick: () => {
        setSelectedGranularity(option);
        onSelectGranularity(option);
      },
      key: `${option.magnitude}${option.interval}`,
      label: getGranularityLabel(option),
    }));
  }

  // TODO: @cafe handle this inside an effect
  const granularityOptionsTreated: ItemType<TemporalBucket>[] = [
    {
      handleOnClick: () => {
        setSelectedGranularity(undefined);
        onSelectGranularity(undefined);
      },
      key: 'raw-data',
      label: <Translate id="app.granularity.rawData" />,
    },
    ...optionsParser(granularityOptions),
  ];

  return <KsDropDown options={granularityOptionsTreated} InputElement={GranularityButton} />;
}

export default GranularityDropdown;
