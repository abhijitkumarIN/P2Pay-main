import { getFormat, getFormatedResults } from '../../utils';

import { KeyValue } from '../key-value';
import { Loader } from '@kleeen/react/components';
import MuiTooltip from '@material-ui/core/Tooltip';
import { SummaryLayout } from '../summary-layout';
import { SummaryStatisticsProps } from './summary-statistics.model';
import { TransformationResponse } from '@kleeen/types';
import { getDisplayElement } from '../display-element/display-element-catalog';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './summary-statistics.styles';

const layoutProps = {
  columnGap: 34,
  containerPadding: 0,
  keyValuePadding: 16,
  keyWidth: 144,
  valueWidth: 110,
};

export function SummaryStatistics({ attributes, chartType, data, params, widgetId }: SummaryStatisticsProps) {
  const classes = useStyles();
  const [mainStatistic, ...statistics] = isNilOrEmpty(data) ? [] : data;
  const [mainAttribute, ...restAttribute] = attributes;

  if (isNilOrEmpty(data)) {
    return <Loader />;
  }

  const { elements: mainElements, format: mainAttributeFormat, formatType: mainFormatType } = mainAttribute;
  const {
    format: mainBackendFormat,
    results: mainResults,
    transformation: mainTransformation,
    crossLinking: mainCrosslinking,
  } = mainStatistic;

  const mainFormat = getFormat({ attributeFormat: mainAttributeFormat, backendFormat: mainBackendFormat });
  const { displayComponent: mainElement } = mainElements;
  const MainDisplayComponent = getDisplayElement(mainElement);
  const mainFormattedResults = getFormatedResults(mainElement, mainResults, mainCrosslinking);

  return (
    <div className={classes.content}>
      <div className="primary">
        <MuiTooltip title={mainAttribute.label} placement="top">
          <div className="primary-label">{mainAttribute.label}</div>
        </MuiTooltip>
        <div className="primary-value">
          <MainDisplayComponent
            attribute={mainAttribute}
            chartType={chartType}
            element={mainElement}
            format={mainFormat}
            formatType={mainFormatType}
            highlighted
            params={params}
            transformation={mainTransformation}
            value={mainFormattedResults}
            widgetId={widgetId}
          />
        </div>
      </div>

      {!isNilOrEmpty(restAttribute) && (
        <SummaryLayout layoutProps={layoutProps} totalElements={restAttribute.length}>
          {statistics.map((statistic: TransformationResponse, index: number) => {
            const attribute = restAttribute[index];
            const { elements, format: attributeFormat, formatType } = attribute;
            const { format: backendFormat, results, transformation, crossLinking } = statistic;

            const format = getFormat({ attributeFormat, backendFormat });
            const { displayComponent } = elements;
            const DisplayComponent = getDisplayElement(displayComponent);
            const formattedResults = getFormatedResults(displayComponent, results, crossLinking);

            return (
              <KeyValue
                layoutProps={layoutProps}
                key={`${attribute.id}-${transformation}`}
                keyComponent={attribute.label}
                valueComponent={
                  <DisplayComponent
                    attribute={attribute}
                    chartType={chartType}
                    element={displayComponent}
                    format={format}
                    formatType={formatType}
                    params={params}
                    transformation={transformation}
                    value={formattedResults}
                    widgetId={widgetId}
                  />
                }
              />
            );
          })}
        </SummaryLayout>
      )}
    </div>
  );
}
