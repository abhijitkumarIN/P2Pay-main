import { InvestigationCustomAction, Widget } from '@kleeen/types';

import { PayloadAction } from '@reduxjs/toolkit';

export type AddWidget = {
  type: string;
} & PayloadAction<Widget>;

export type InitializeWidgets = {
  type: string;
} & PayloadAction<Widget[]>;

export type CustomAction = {
  type: string;
} & PayloadAction<InvestigationCustomAction>;
