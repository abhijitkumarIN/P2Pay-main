export interface GetSeveritiesResultProps {
  bottomValue: number;
  color: string;
  index: number;
  topValue: number;
}

export interface FormatRadialResultProps {
  name: string;
  y: number;
}

export interface Axis {
  categories: [string];
  key: string;
  valueLabels: { label: string; value: number }[];
}

export interface TrendFormatterProps {
  highlightMinMax?: boolean;
  highlightStart?: boolean;
  highlightEnd?: boolean;
  radiusSize?: number;
  values?: number[];
}

export type ValueResultProps = number | string;
