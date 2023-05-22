import { ClassNameBem } from '@kleeen/types';
import { DatePickerSection } from '../date-picker-section';
import { FilterQueryBuilderSection } from '../filter-query-builder-section';
import { FilterQueryProvider } from './components';
import { FilterSectionProps } from './filter-section.model';
import { KUIConnect } from '@kleeen/core-react';
import classnames from 'classnames';
import { useStyles } from './filter-section.styles';

const bem = ClassNameBem.FilterSection;

function BaseFilterSection({ attributes, filterQuery, onFilter, translate }: FilterSectionProps) {
  const classes = useStyles();

  return (
    <FilterQueryProvider attributes={attributes} filterQuery={filterQuery} translate={translate}>
      <div className={classnames(bem, classes.container)}>
        <FilterQueryBuilderSection onFilter={onFilter} />
        <DatePickerSection onFilter={onFilter} />
      </div>
    </FilterQueryProvider>
  );
}

export const NewFilterSection = KUIConnect(({ translate }) => ({ translate }))(BaseFilterSection);
