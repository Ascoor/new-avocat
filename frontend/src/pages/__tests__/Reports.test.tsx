
/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { Reports } from '../Reports';

vi.mock('zustand'); // avoid state persistence interfering

describe('Reports Page', () => {
  it('renders reports sections', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <div data-testid="reports-page">
          <Reports />
        </div>
      </I18nextProvider>
    );
    expect(screen.getByTestId('reports-page')).toBeInTheDocument();
    expect(screen.getByText('بحث المحكمة')).toBeInTheDocument();
  });
});
