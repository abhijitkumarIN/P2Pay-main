import { ClassNameBem } from '@kleeen/types';
import { useEffect } from 'react';

export const useGetWidgetsAmount = (setAmount: (n: number) => void): void => {
  useEffect(() => {
    if (setAmount) {
      setTimeout(() => setAmount(widgetCount()));
    }
  });
};

function widgetCount(): number {
  const bem = ClassNameBem.DataDisplaySection;

  const progressBar = document.querySelectorAll(`.${bem} div[role="progressbar"]`).length;
  const cardWidget = document.querySelectorAll(`.${bem} .card-section .card-widget`).length;

  return progressBar > cardWidget ? progressBar : cardWidget;
}
