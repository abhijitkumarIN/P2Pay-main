import { CardSection, InvestigationWidgetHeader } from '@kleeen/react/atomic-elements';
import { CardSectionLayout, InvestigationCard, Widget } from '@kleeen/types';
import {
  INVESTIGATION_URL_PARAM,
  getDecodedInvestigationCard,
  resolveInvestigation,
} from '@kleeen/investigations';
import {
  addInvestigationWidgetProperties,
  useKleeenActions,
  useKleeenContext,
  useUrlQueryParams,
} from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { InvestigateBar } from './components';
import { InvestigateProps } from './investigate.model';
import { KUIConnect } from '@kleeen/core-react';
import { KsErrorScreen } from '@kleeen/react/components';
import { State } from '@kleeen/react/state-management';
import { Translate } from '@kleeen/core-react';
import classNames from 'classnames';
import { getSettings } from '../../../generated/components/navigation/navigation.settings';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './investigate.styles';

const bem = 'ks-investigate';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const settings = getSettings(() => {});
const textStyle = {
  color: 'white',
  display: 'flex',
  margin: 'auto',
  opacity: '50%',
  textAlign: 'center',
  textTransform: 'uppercase',
};

function Investigate({ translate }: InvestigateProps) {
  const isError = false;
  const { clearInvestigation, initializeWidgets } = useKleeenActions('ksInvestigation');
  const { investigationWidgets } = useKleeenContext<State.InvestigationState>('ksInvestigation');
  const classes = useStyles();
  const { paramsBasedOnRoute } = useUrlQueryParams();
  const [investigation, setInvestigation] = useState<InvestigationCard>();

  const firstInvestigationWidget = investigationWidgets[investigationWidgets.length - 1];
  const investigationParam = paramsBasedOnRoute[INVESTIGATION_URL_PARAM];
  const text = Translate({ id: 'app.investigation.fullScreenError', type: 'html' });

  function onClose() {
    window.close();
  }

  useEffect(() => {
    return () => clearInvestigation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isNilOrEmpty(investigationParam)) return;

    const decodedInvestigationCard = getDecodedInvestigationCard(investigationParam);

    setInvestigation(decodedInvestigationCard);
  }, [investigationParam]);

  useEffect(() => {
    if (isNilOrEmpty(investigation)) return;

    const parsedWidgets = resolveInvestigation({ investigationCard: investigation, cardLevel: 0 });

    if (!isNilOrEmpty(parsedWidgets)) {
      if (typeof initializeWidgets == 'function') {
        const investigateWidgets = parsedWidgets.map((widget, index) =>
          addInvestigationWidgetProperties({ index, widget }),
        );
        initializeWidgets(investigateWidgets);
      }
    }
  }, [investigation]); // eslint-disable-line react-hooks/exhaustive-deps

  function scrollToTop() {
    const anchor = document.querySelector(`.${bem}__container`);
    if (anchor && anchor.scrollTop > 0) {
      setTimeout(() => {
        anchor.scroll({ top: 0, left: 0, behavior: 'smooth' });
      });
    }
  }

  const animation = {
    onAnimationEnd: scrollToTop,
  };

  return (
    <div className={bem}>
      <InvestigateBar
        logo={settings.logo}
        onClose={onClose}
        title={firstInvestigationWidget?.title}
        translate={translate}
      />
      <div className={classNames(`${bem}__container`, classes.container)}>
        {isError ? (
          <KsErrorScreen text={text} textStyle={textStyle} />
        ) : (
          <CardSection
            animation={animation}
            cardSectionLayout={CardSectionLayout.SingleWideColumn}
            justifyContent="center"
            key="investigation"
            taskName="ksInvestigation"
            widgets={investigationWidgets as Widget[]}
            WidgetHeader={InvestigationWidgetHeader}
          />
        )}
      </div>
    </div>
  );
}

export default KUIConnect(({ translate }) => ({ translate }))(Investigate);
