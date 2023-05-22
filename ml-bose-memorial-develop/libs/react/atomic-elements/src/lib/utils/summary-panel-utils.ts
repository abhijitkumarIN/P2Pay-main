import { DataPointValue, DisplayMedia, DisplayMediaType, FormatProps } from '@kleeen/types';

interface WidgetContexProp {
  data: DataPointValue[];
  format: { [key: string]: FormatProps };
}

export function getDataByAttributeName(
  attributeName: string,
  widgetContext: WidgetContexProp,
): DataPointValue | DataPointValue[] {
  return widgetContext?.data?.find((attribute) =>
    Object.keys(attribute).some((key) => key === attributeName),
  );
}

export function getFormatByAttributeName(
  attributeName: string,
  format: FormatProps,
): { [key: string]: FormatProps } {
  return format?.[attributeName];
}

export function getDisplayMediaSourceFromAttribute(
  attributeName: string,
  widgetContext: WidgetContexProp,
): string {
  const attribute = getDataByAttributeName(attributeName, widgetContext);
  const displayMedia = attribute && (attribute[attributeName]?.displayMedia as DisplayMedia);
  const displayMediaValue = isDisplayMediaSrc(displayMedia?.type) ? displayMedia.value : '';
  return displayMediaValue;
}

export function isDisplayMediaSrc(displayMediaType: string): boolean {
  return displayMediaType === DisplayMediaType.Src;
}
