import { createSlice } from '@reduxjs/toolkit';
import investigation from './models';

const entityName = 'ksInvestigation';

const investigationSlice = createSlice({
  name: entityName,
  ...investigation,
});

const actions = { key: entityName, actions: investigationSlice.actions };

export { actions };

export default investigationSlice.reducer;
