import { Attribute, CellInteraction, ColumnData, Link, Transformation, WidgetScope } from '@kleeen/types';
import { DEFAULT_TRANSFORMATION_KEY_TO_USE, isSingleCardinalityTransformation } from './transformations';

import { crosslinkingInteractionType } from '@kleeen/types';
import { entityHasWidgets } from '@kleeen/widgets';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

export const isLinkFilterableByEntityType = (entityType: string, link: Link): boolean =>
  !link.entityType || link.entityType === entityType;

export function isFilterableAttribute({
  hasFilters,
  filterableAttributes,
  attribute,
}: {
  hasFilters: boolean;
  filterableAttributes: Attribute[];
  attribute: Attribute;
}) {
  if (!hasFilters) return { hasFilter: false, isSingleCardinality: false };

  // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
  const attributeTransformation = pathOr(
    attribute?.aggregation as Transformation,
    [DEFAULT_TRANSFORMATION_KEY_TO_USE],
    attribute,
  );

  const isSingleCardinality = isSingleCardinalityTransformation(attributeTransformation);
  const isAvailable = filterableAttributes.find((att) => att.name === attribute.name);
  const hasFilter = isAvailable && isSingleCardinality;

  return { hasFilter: Boolean(hasFilter), isSingleCardinality };
}

export function isLinkableByEntityType({
  attribute,
  isInvestigation,
  entityType,
}: {
  attribute: Attribute;
  isInvestigation: boolean;
  entityType: string;
}) {
  return isLikeableAttribute(attribute, isInvestigation) && isValidLinkByEntityType(attribute, entityType);
}

export function isLikeableAttribute(attribute: Attribute, isInvestigation: boolean) {
  if (isInvestigation) return false;

  return !isNilOrEmpty(attribute.crossLinking);
}

function getAvailableLinks(links: Link[], entityType: string) {
  // is xor and we need to check it's entity type
  if (!isNilOrEmpty(entityType)) links.filter((link) => isLinkFilterableByEntityType(entityType, link));

  return links;
}
// this validation is needed for xor cases.
export function isValidLinkByEntityType(attribute: Attribute, entityType: string) {
  const { crossLinking: links } = attribute;
  const availableLinks = getAvailableLinks(links, entityType);

  return !isNilOrEmpty(availableLinks);
}

interface LinkStyleArgs {
  excludeCrossLinking?: boolean;
  hasCrossLink: boolean;
  hasFilter: boolean;
  hasInvestigations?: boolean;
  hasPreview: boolean;
  isDisableCrossLinking?: boolean;
  isInvestigationPage?: boolean;
  isPreview?: boolean;
  linkInteraction: crosslinkingInteractionType;
}

export function getLinkStyle({
  excludeCrossLinking = false,
  hasCrossLink,
  hasFilter,
  hasInvestigations,
  hasPreview,
  isDisableCrossLinking,
  isInvestigationPage,
  isPreview,
  linkInteraction,
}: LinkStyleArgs): {
  highlight: boolean;
  underline: boolean;
} {
  const isOnClickInteraction = linkInteraction === crosslinkingInteractionType.onClick;

  //TODO: "isDisableCrossLinking" has to be removed when we will implement the enhancement to disable the crosslinking interaction by the widget
  if (isPreview || isDisableCrossLinking) {
    return {
      highlight: false,
      underline: false,
    };
  }

  if (isInvestigationPage) {
    return {
      highlight: !excludeCrossLinking && Boolean(hasInvestigations),
      underline: false,
    };
  }

  const highlight = !excludeCrossLinking && Boolean(hasCrossLink || hasFilter || hasPreview);
  const underline = !excludeCrossLinking && hasCrossLink && !isOnClickInteraction;

  return {
    highlight,
    underline,
  };
}

interface CellInteractionArgs {
  availableFilters: Attribute[];
  column: ColumnData;
  hasFilters: boolean;
  isInvestigationPage: boolean;
  linkInteraction: crosslinkingInteractionType;
}

export function getCellInteraction({
  availableFilters,
  column,
  hasFilters,
  isInvestigationPage,
  linkInteraction,
}: CellInteractionArgs): CellInteraction {
  const attribute = column.attr;

  if (isNilOrEmpty(attribute)) {
    return {
      hasCrossLink: false,
      hasFilter: false,
      hasInvestigations: false,
      hasPreview: false,
      linkInteraction,
    };
  }
  const { hasFilter, isSingleCardinality } = isFilterableAttribute({
    attribute,
    filterableAttributes: availableFilters,
    hasFilters,
  });

  const hasWidgets = entityHasWidgets({
    entityId: attribute?.id || '',
    scope: isSingleCardinality ? WidgetScope.Single : WidgetScope.Collection,
  });

  const hasCrossLink = isLikeableAttribute(attribute, isInvestigationPage);

  const hasInvestigations = hasWidgets && isInvestigationPage;

  return {
    hasCrossLink,
    hasFilter,
    hasInvestigations,
    hasPreview: hasWidgets,
    linkInteraction,
  };
}
