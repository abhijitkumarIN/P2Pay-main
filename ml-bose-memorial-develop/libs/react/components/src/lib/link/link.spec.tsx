import '@testing-library/jest-dom';

import { KsLink } from './index';
import { ksDefaultRender as render } from '@kleeen/testing/front-end';
import { screen } from '@testing-library/react';

const linkText = 'Test';

describe('Link', () => {
  test('Should have a "highlight" className', () => {
    const highlight = true;
    const underline = false;
    render({
      component: (
        <KsLink
          anchorEl={null}
          highlight={highlight}
          onClick={() => {
            // do nothing
          }}
          onContextMenu={() => {
            // do nothing
          }}
          underline={underline}
        >
          {linkText}
        </KsLink>
      ),
    });
    expect(screen.getByText(linkText).className.includes('highlight')).toBe(true);
  });

  test('Should have an "underline" className', () => {
    const highlight = false;
    const underline = true;
    render({
      component: (
        <KsLink
          anchorEl={null}
          highlight={highlight}
          onClick={() => {
            // do nothing
          }}
          onContextMenu={() => {
            // do nothing
          }}
          underline={underline}
        >
          {linkText}
        </KsLink>
      ),
    });
    expect(screen.getByText(linkText).className.includes('underline')).toBe(true);
  });

  test('Should not have any interaction className', () => {
    const highlight = false;
    const underline = false;
    render({
      component: (
        <KsLink
          anchorEl={null}
          highlight={highlight}
          onClick={() => {
            // do nothing
          }}
          onContextMenu={() => {
            // do nothing
          }}
          underline={underline}
        >
          {linkText}
        </KsLink>
      ),
    });
    expect(screen.getByText(linkText).className.includes('underline')).toBe(false);
    expect(screen.getByText(linkText).className.includes('highlight')).toBe(false);
  });
});
