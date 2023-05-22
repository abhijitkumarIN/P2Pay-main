import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listingModalStyles as KsDialog } from './listing-modal.styles';
import { Icon as KsIcon } from '../Icon';
import { KsSimpleList } from '..';
import { ListingModalProps } from './listing-modal.model';
import { Loader } from '../Loader/Loader';
import { iconStyles } from './listing-modal.styles';
import { parseAttributes } from '@kleeen/frontend/utils';
import { useTheme } from '@kleeen/react/hooks';

export function KsListingModal({
  attribute,
  chartType,
  columnLabel,
  data,
  format,
  isOpen,
  onClose,
  rowDisplayValue,
  widgetId,
}: ListingModalProps) {
  const { themeClass } = useTheme();
  const iconClasses = iconStyles();

  function CloseButton() {
    return (
      <div className={iconClasses.iconFilter} onClick={handleClose}>
        <div className={iconClasses.iconWrapper}>
          <KsIcon icon="ks-close" />
        </div>
      </div>
    );
  }

  function handleClose(): void {
    onClose();
  }

  const parsedAttributes = parseAttributes([attribute], format);
  const parsedData = data.map((item) => ({ [attribute.name]: item }));

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={isOpen}>
      <DialogTitle id="form-dialog-title">
        {`${rowDisplayValue ? rowDisplayValue + ' - | ' : ''}${columnLabel}`}
        <CloseButton />
      </DialogTitle>
      <DialogContent>
        {parsedData ? (
          <KsSimpleList
            data={parsedData}
            columns={parsedAttributes}
            listItemOptions={{ chartType, widgetId }}
          />
        ) : (
          <Loader />
        )}
      </DialogContent>
    </KsDialog>
  );
}
