import { ItemType, KsButtonText, KsDropDown, KsSvgIcon, KsSvgIconSize } from '@kleeen/react/components';
import { MutableRefObject, Ref, forwardRef } from 'react';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Translate } from '@kleeen/core-react';
import { useStyles } from './card-selector-dropdown.styles';

interface CardSelectorDropdownProps {
  selectCardOptions: ItemType[];
}

export function CardSelectorDropdown({ selectCardOptions }: CardSelectorDropdownProps) {
  const classes = useStyles();

  const CardSelectorButton = forwardRef(
    ({ setOpen }: { setOpen: (open: boolean) => void }, ref: MutableRefObject<HTMLElement>) => {
      return (
        <KsButtonText
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => setOpen(true)}
          ref={ref as Ref<HTMLButtonElement>}
        >
          <div className={classes.svgContainer}>
            <div>
              <KsSvgIcon icon="ks-card-selector" size={KsSvgIconSize.Large} />
            </div>
            <div className={classes.labelContainer}>
              <Translate id="app.cardSelector.header" type="html" />
            </div>
          </div>
        </KsButtonText>
      );
    },
  );

  return (
    <KsDropDown
      headerTranslationId="app.cardSelector.headerSection"
      options={selectCardOptions}
      placement="bottom-start"
      styles={{
        dropDownMenu: classes.dropDownMenu,
      }}
      InputElement={CardSelectorButton}
    />
  );
}
