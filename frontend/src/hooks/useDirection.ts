import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * useDirection syncs the document's `dir` attribute with the current i18n language.
 * Returns the active direction so components can adjust their layout accordingly.
 */
export function useDirection(): 'ltr' | 'rtl' {
  const { i18n } = useTranslation();
  const direction = i18n.dir();

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return direction as 'ltr' | 'rtl';
}
