import { CrossLinking, FormatProps, Results } from '.';

import { Transformation } from '../';

export interface TransformationResponse {
  crossLinking: CrossLinking[];
  format: FormatProps;
  results: Results;
  transformation: Transformation;
}
