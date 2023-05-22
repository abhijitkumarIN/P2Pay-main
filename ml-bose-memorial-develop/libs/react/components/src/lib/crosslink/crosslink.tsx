import { ReactElement, useCallback, useState } from 'react';
import {
  checkIfDataPointHasWidgets,
  useAnchorElement,
  useCrosslinking,
  useCrosslinkingInteraction,
  useHoverIntent,
  useIsInvestigation,
  useIsPreview,
  validateCrosslinkingInteraction,
} from '@kleeen/react/hooks';
import { getLinkStyle, isCountTransformations } from '@kleeen/frontend/utils';

import { CrosslinkProps } from './crosslink.model';
import { KsContextMenu } from '@kleeen/react/components';
import { KsLink } from '../link';
import { useAttributeInteractions } from '../context-cell/hooks';

export function KsCrosslink({
  chartType,
  children,
  dataPoints,
  params,
  transformationKeyToUse,
  transformation,
  widgetId,
}: CrosslinkProps): ReactElement {
  const [dataPoint] = dataPoints;
  const isInvestigationPage = useIsInvestigation();
  const isPreview = useIsPreview();

  //TODO: this has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  const isDisableCrossLinking = dataPoint?.attribute?.isDisableCrossLinking;
  const excludeCrossLinking = isCountTransformations(transformation) || isDisableCrossLinking;

  const [hasInvestigations] = useState(() => {
    return isInvestigationPage && checkIfDataPointHasWidgets(dataPoint);
  });

  const { anchorEl, handleClick, handleClose } = useAnchorElement();
  const { crosslink } = useCrosslinking();
  const { hasCrossLinking, hasFilters, hasPreview } = useAttributeInteractions({
    attribute: dataPoint?.attribute,
    cellEntityType: dataPoint?.value?.$metadata?.entityType,
    excludeCrossLinking,
    isIdTemporary: false,
    isPreview,
    transformationKeyToUse,
  });
  const { ref } = useHoverIntent<HTMLDivElement>({
    delayOnEnter: 800,
    onMouseEnterFn: handleClick,
    hasCrossLink: hasCrossLinking || hasFilters || !isDisableCrossLinking,
    hasInvestigations,
  });
  const [openModal, setOpenModal] = useState(false);

  function handleCloseHelper() {
    setOpenModal(false);
    handleClose();
  }

  function onCellClick() {
    const { attribute, value } = dataPoint;

    if (hasCrossLinking) {
      const [firstValidCrossLink] = attribute?.crossLinking;
      crosslink(firstValidCrossLink.slug, value, attribute);
    }
  }

  const handleAnchorClick = useCallback(
    (eventProps: React.MouseEvent<HTMLButtonElement>) => {
      handleClick(eventProps);
    },
    [handleClick],
  );

  const { onClickFunction, onContextMenuFunction, validation } = validateCrosslinkingInteraction({
    anchorEl,
    handleAnchorClick,
    hasInvestigations,
    onCellClick,
    openModal,
    setOpenModal,
  });

  const { crosslinkingInteraction } = useCrosslinkingInteraction();
  const { highlight, underline } = getLinkStyle({
    excludeCrossLinking,
    hasCrossLink: hasCrossLinking,
    hasFilter: hasFilters,
    hasInvestigations,
    hasPreview,
    isDisableCrossLinking: isDisableCrossLinking,
    isInvestigationPage,
    isPreview,
    linkInteraction: crosslinkingInteraction,
  });

  const showContextMenu = validation && !isPreview && !isDisableCrossLinking;
  return (
    <>
      <KsLink
        anchorEl={ref}
        highlight={highlight}
        onClick={() => {
          onClickFunction(dataPoints, hasCrossLinking || hasInvestigations, { currentTarget: ref.current });
        }}
        onContextMenu={() => {
          onContextMenuFunction(dataPoints, hasCrossLinking || hasInvestigations, {
            currentTarget: ref.current,
          });
        }}
        underline={underline}
      >
        {children}
      </KsLink>
      {showContextMenu && (
        <KsContextMenu
          anchorEl={anchorEl}
          autoClose
          dataPoints={dataPoints}
          onClose={handleCloseHelper}
          widgetContextParams={params}
          widgetChartType={chartType}
          widgetId={widgetId}
        />
      )}
    </>
  );
}
