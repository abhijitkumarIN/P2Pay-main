import { KsBadge, KsButtonText, KsSvgIcon } from '@kleeen/react/components';
import React, { useState } from 'react';
import { useFilterQuery, useFilterQueryActions } from '../filter-section/hooks';

import { FilterQuery } from '@kleeen/types';
import { FilterQueryBuilder } from '../filter-query-builder';
import { FilterQueryBuilderSectionProps } from './filter-query-builder-section.model';
import { Menu } from './filter-query-builder-section.styles';
import { useTheme } from '@kleeen/react/hooks';

export function FilterQueryBuilderSection({ onFilter }: FilterQueryBuilderSectionProps) {
  const { filterQuery, initialFilterQuery } = useFilterQuery();
  const { reset } = useFilterQueryActions();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { themeClass } = useTheme();

  const open = Boolean(anchorEl);

  function handleClose() {
    setAnchorEl(null);
  }

  function handleFilter(query: FilterQuery) {
    onFilter(query);
    handleClose();
    reset(initialFilterQuery);
  }

  function handleOpen(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      <KsButtonText onClick={handleOpen}>
        <KsBadge badgeContent={filterQuery?.rules?.length} color="secondary">
          <KsSvgIcon icon="ks-filter" size="large" />
        </KsBadge>
      </KsButtonText>
      {open && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          className={themeClass}
          getContentAnchorEl={null}
          onClose={handleClose}
          open={open}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
        >
          <div>
            <FilterQueryBuilder onFilter={handleFilter} />
          </div>
        </Menu>
      )}
    </>
  );
}
