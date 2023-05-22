import { ArrowPoint } from '@kleeen/react/components';
import { ArrowProps } from './Arrow.model';
import { Transformation } from '@kleeen/types';

export const Arrow = (props: ArrowProps) => {
  const metadata = props.transformation.metadata || props.transformation.transformationMetadata;
  const { changeDirections } = metadata || {};
  const isChangePercentage = props.transformation.transformation === Transformation.ChangePercent;

  return (
    <ArrowPoint
      changeDirections={changeDirections}
      className="arrow-point-center"
      highlighted={props.highlighted}
      result={props.value}
      showPercentage={isChangePercentage}
    />
  );
};
