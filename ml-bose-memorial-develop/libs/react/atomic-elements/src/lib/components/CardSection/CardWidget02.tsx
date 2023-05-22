import './CardSection02.scss';

import { CardWidgetProps } from './CardWidget.model';
import { WidgetHeader } from './components/widget-header/widget-header';
import classnames from 'classnames';

const bem = 'ks-card-widget-02';

export const CardWidget02 = ({
  children,
  disabled,
  hasTooltip,
  hideTitle,
  icon,
  title,
  widgetSelector = null,
}: CardWidgetProps): JSX.Element => {
  return (
    <div className={classnames(bem, 'card-widget', { disabled })}>
      {!hideTitle && <WidgetHeader hasTooltip={hasTooltip} icon={icon} title={title} />}
      <div className={classnames(`${bem}__content`, 'content')}>
        {children}
        {widgetSelector}
      </div>
    </div>
  );
};
export default CardWidget02;
