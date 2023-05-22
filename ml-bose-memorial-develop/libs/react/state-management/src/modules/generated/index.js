import * as findADoctor from './findADoctor';
import * as memberDetails from './memberDetails';
import * as registration from './registration';
import * as doctorDetails from './doctorDetails';

export default {
  ...Object.values({
    findADoctor,

    memberDetails,

    registration,

    doctorDetails,
  }),
};
