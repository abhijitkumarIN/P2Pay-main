import { DataPointValue, InvestigationWidget, Thing, TranslateProps, WidgetScope } from '@kleeen/types';
import { KsSubNav, KsTitle } from '@kleeen/react/components';
import { useHeaderActions, useHeaderCards, useHeaderFilters, useHeaderGranularity } from '../../hooks';

import { KUIConnect } from '@kleeen/core-react';
import { WidgetHeaderProps } from './widget-header.model';
import { getIconByWidgetType } from '@kleeen/widgets';
import { getThingByName } from '@kleeen/things';
import { useState } from 'react';
import { useStyles } from './widget-header.styles';

const startSectionStyles = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  // FIXME: @marimba this hack should be removed once the KSE3-4787 is done
  minWidth: 0,
  justifyContent: 'space-between',
  paddingRight: 'var(--pm-3XS)',
};

export const InvestigationWidgetHeader = KUIConnect(({ formatMessage, translate }) => ({
  formatMessage,
  translate,
}))(InvestigationWidgetHeaderBase);

function InvestigationWidgetHeaderBase({ actions, formatMessage, translate, widget }: WidgetHeaderProps) {
  const ActionsDropdown = useHeaderActions({ widget });
  const CardsDropdown = useHeaderCards({ widget });
  const Filters = useHeaderFilters({ widget });
  const GranularityDropdown = useHeaderGranularity({ actions, widget });
  const [widgetFocus] = useState<Thing | null>(() => getThingByName(widget?.entityName));
  const classes = useStyles();

  const investigationStartSection = {
    flexNumber: 1,
    sections: [
      {
        component: (
          <div style={startSectionStyles}>
            <KsTitle
              className={classes.widgetHeaderTitle}
              icon={getIconByWidgetType(widget.chartType)}
              title={getTitle({ formatMessage, translate, widget, widgetFocus })}
              upText={widget.title}
            />
            {CardsDropdown}
          </div>
        ),
        endSeparator: true,
      },
    ],
  };
  const investigationCenterSection = {
    flexNumber: 0,
    sections: [
      {
        component: Filters,
        endSeparator: false,
      },
      {
        component: GranularityDropdown,
        endSeparator: true,
      },
    ],
  };
  const investigationEndSection = {
    flexNumber: 0,
    sections: [
      {
        component: ActionsDropdown,
      },
    ],
  };

  return (
    <div className={classes.widgetHeader}>
      <KsSubNav
        centerSection={investigationCenterSection}
        endSection={investigationEndSection}
        startSection={investigationStartSection}
      />
    </div>
  );
}

interface GetTitleProps extends TranslateProps {
  widget: InvestigationWidget;
  widgetFocus: Thing;
}

//#region Private members
function generateCollectionWidgetTitle({
  formatMessage,
  translate,
  widgetFocus,
}: Omit<GetTitleProps, 'widget'>) {
  const translationKey = 'app.subHeader.investigation.title.collection';
  const thing = translate(`entities.${widgetFocus.name}.${widgetFocus.name}`);

  return formatMessage({ id: translationKey }, { thing });
}

function generateSingleWidgetTitle(widgetFocusedDataPointValue: DataPointValue): string {
  return widgetFocusedDataPointValue?.displayValue?.toString();
}

function getTitle({ formatMessage, translate, widget, widgetFocus }: GetTitleProps): string {
  return widget.scope === WidgetScope.Single
    ? generateSingleWidgetTitle(widget?.focusDataPointValue)
    : generateCollectionWidgetTitle({ formatMessage, translate, widgetFocus });
}
//#endregion
