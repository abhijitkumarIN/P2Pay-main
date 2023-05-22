import './icon-button.scss';

export function KsIconButton({ children, onClick }) {
  return (
    <div className={'iconFilter'} onClick={onClick}>
      <div className={'iconWrapper'}>{children}</div>
    </div>
  );
}
