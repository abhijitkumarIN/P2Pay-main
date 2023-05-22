import { KsSubNavProps, SectionType } from './sub-nav.model';

import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import isNumber from 'lodash.isnumber';
import { useStyles } from './sub-nav.style';

const bem = 'ks-sub-nav';

export function KsSubNav({ startSection, endSection, centerSection }: KsSubNavProps) {
  const classes = useStyles();
  const { sections: startSections = [] } = startSection || {};
  const { sections: centerSections = [] } = centerSection || {};
  const { sections: endSections = [] } = endSection || {};

  const isUniqueSection = startSections.length + centerSections.length + endSections.length === 1;

  return (
    <header className={classnames(`${bem}__header`, classes.widgetHeader)}>
      <OptionalSection
        isUniqueSection={isUniqueSection}
        name={'header-start-section'}
        section={startSection}
      />
      <OptionalSection
        isUniqueSection={isUniqueSection}
        name={'header-center-section'}
        section={centerSection}
      />
      <OptionalSection isUniqueSection={isUniqueSection} name={'header-end-section'} section={endSection} />
    </header>
  );
}

//#region Private Members
interface OptionalSectionProps {
  isUniqueSection: boolean;
  name: string;
  section: SectionType;
}

function OptionalSection({ isUniqueSection, name, section }: OptionalSectionProps) {
  const classes = useStyles();

  if (isNilOrEmpty(section)) return null;

  const flexNumber = isNumber(section.flexNumber) ? section.flexNumber : 1;

  return (
    <div className={classnames(`${bem}__header-section`, classes.headerSection)} style={{ flex: flexNumber }}>
      {section.sections.map(({ component, endSeparator, flexNumber: flexNumb }, i) => (
        <div
          className={classnames(`${bem}__header-sub-section`, classes.headerSub, {
            [classes.endSeparator]: endSeparator && !isUniqueSection,
          })}
          key={`${name}-${i}`}
          style={{ flex: isNumber(flexNumb) ? flexNumb : 1 }}
        >
          {component}
        </div>
      ))}
    </div>
  );
}
//#endregion
