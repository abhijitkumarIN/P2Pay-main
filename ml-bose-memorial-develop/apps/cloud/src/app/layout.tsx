import 'react-reflex/styles.css';

import { AppModule, ClassNameBem, NavPosition } from '@kleeen/types';
import { useKleeenRouting, useShouldHideNavigation, useResponsive } from '@kleeen/react/hooks';

import { NavigationTask } from './modules/generated/components';
import { PreviewPanel } from './components';
import classnames from 'classnames';
import settings from './settings/app.json';

const bem = ClassNameBem.Layout;
const isNavTop = settings.layout.position === NavPosition.top;

interface LayoutBaseProps {
  modules: AppModule[];
}

export function Layout({ modules }: LayoutBaseProps) {
  const { isMobile } = useResponsive();
  const modifier = isNavTop || isMobile ? 'top' : 'side container-nav-left';

  return (
    <div className={classnames(bem, `${bem}--${modifier}`, 'content-layout')}>
      <Navigation />
      <PreviewPanel>
        <Content modules={modules} />
      </PreviewPanel>
    </div>
  );
}

//#region Private members
function Content({ modules }: { modules: AppModule[] }) {
  const KsRouter = useKleeenRouting(modules, [], settings.defaultHomePage);

  return (
    <main
      className={classnames(`${bem}__content`, 'main-layout', {
        [NavPosition.top]: isNavTop,
        [NavPosition.left]: !isNavTop,
      })}
    >
      {KsRouter}
    </main>
  );
}

function Navigation() {
  const shouldHideNavigation = useShouldHideNavigation();

  if (shouldHideNavigation) return null;

  return (
    <section className={classnames(`${bem}__navigation`)}>
      <NavigationTask />
    </section>
  );
}
//#endregion
