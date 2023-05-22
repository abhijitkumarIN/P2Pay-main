import { Attribute, ClassNameBem, DisplayMediaType } from '@kleeen/types';
import { Avatar, Collapse } from '@material-ui/core';
import {
  getDataByAttributeName,
  getDisplayMediaSourceFromAttribute,
  getFormatByAttributeName,
  isDisplayMediaSrc,
} from '../../utils';
import { useEffect, useState } from 'react';

import { DisplayElement } from '../display-element';
import { InputElement } from '../input-element';
import { KeyValue } from '../key-value';
import { SummaryLayout } from '../summary-layout';
import { SummaryPanelProps } from './summary-panel.model';
import camelCase from 'lodash.camelcase';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './summary-panel.styles';
import { useWidgetContext } from '@kleeen/react/hooks';

const defaultLayoutProps = {
  columnGap: 55,
  containerPadding: 68,
  keyValuePadding: 21,
  keyWidth: 144,
  valueWidth: 233,
};

export function SummaryPanel({
  addErrors,
  displayMedia,
  entityDetails,
  isEditing,
  isFromButtonSummary = false,
  isLoadingMedia,
  layoutProps = defaultLayoutProps,
  registerEvents,
  taskName,
}: SummaryPanelProps) {
  const classes = useStyles();
  const [summaryWidget] = entityDetails;
  const { data: widgetContext, isLoading: isLoadingWidgetContext } = useWidgetContext({
    params: { ...summaryWidget.params, attributes: summaryWidget.attributes },
    taskName,
    widgetId: summaryWidget.id,
  });

  const { baseModel } = summaryWidget.params;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayMediaSource, setDisplayMediaSource] = useState('');

  const generateParams = (attribute: Attribute) => {
    return {
      baseModel,
      value: {
        format: attribute.format,
        formatType: attribute.formatType,
        name: attribute.name,
        transformation: attribute.transformation,
      },
    };
  };

  const widgetContextHasData = !isNilOrEmpty(widgetContext?.data);

  useEffect(() => {
    if (isDisplayMediaSrc(displayMedia?.type) && displayMedia?.value) {
      setDisplayMediaSource(displayMedia?.value);
    } else if (widgetContextHasData && !isLoadingWidgetContext) {
      const attributeDisplayMediaSource = getDisplayMediaSourceFromAttribute(
        camelCase(baseModel),
        widgetContext,
      );
      setDisplayMediaSource(attributeDisplayMediaSource);
    }
  }, [isLoadingWidgetContext, displayMedia?.value, widgetContextHasData]);

  const shouldDisplayAvatar = !isLoadingMedia && !isLoadingWidgetContext && displayMediaSource && imageLoaded;

  return (
    <div
      className={classnames(ClassNameBem.SummaryPanel, {
        [classes.summaryPanelContainer]: shouldDisplayAvatar && isFromButtonSummary,
        [classes.leftPanel]: !isFromButtonSummary,
      })}
    >
      {displayMediaSource && (
        <div className={classnames(`${ClassNameBem.SummaryPanel}__avatar`, classes.avatarContainer)}>
          <Collapse in={shouldDisplayAvatar}>
            {
              <Avatar
                alt="Ks-avatar"
                className={classes.avatar}
                onLoad={() => setImageLoaded(true)}
                src={displayMediaSource}
              />
            }
          </Collapse>
        </div>
      )}
      <div
        className={classnames(`${ClassNameBem.SummaryPanel}__summary-layout`, classes.summaryLayoutContainer)}
      >
        <SummaryLayout
          isFromButtonSummary={isFromButtonSummary}
          layoutProps={layoutProps}
          totalElements={summaryWidget?.attributes?.length}
        >
          {summaryWidget.attributes.map((attribute) => {
            const { elements } = attribute;
            const { inputComponent } = elements;
            const useDisplayComponent = !isEditing || isNilOrEmpty(inputComponent);

            return (
              <KeyValue
                key={attribute.id}
                keyComponent={attribute.label}
                layoutProps={{
                  keyWidth: layoutProps.keyWidth,
                  valueWidth: layoutProps.valueWidth,
                }}
                valueComponent={
                  useDisplayComponent ? (
                    <DisplayElement
                      attribute={attribute}
                      data={{
                        data: getDataByAttributeName(attribute.name, widgetContext),
                        format: getFormatByAttributeName(attribute.name, widgetContext?.format),
                      }}
                      elements={attribute.elements}
                      isLoading={isLoadingWidgetContext}
                      params={generateParams(attribute)}
                      widgetId={attribute.widgetId}
                    />
                  ) : (
                    <InputElement
                      addErrors={addErrors}
                      attribute={attribute}
                      data={{
                        data: getDataByAttributeName(attribute.name, widgetContext),
                        format: getFormatByAttributeName(attribute.name, widgetContext?.format),
                      }}
                      elements={attribute.elements}
                      isLoading={isLoadingWidgetContext}
                      params={generateParams(attribute)}
                      registerEvents={registerEvents}
                      taskName={taskName}
                      widgetId={attribute.widgetId}
                    />
                  )
                }
              />
            );
          })}
        </SummaryLayout>
      </div>
    </div>
  );
}
