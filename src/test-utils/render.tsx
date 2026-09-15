import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import '../i18n';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  routerProps?: MemoryRouterProps;
}

const createWrapper =
  (routerProps?: MemoryRouterProps) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter {...routerProps}>{children}</MemoryRouter>
  );

export const renderWithProviders = (
  ui: ReactElement,
  { routerProps, ...options }: RenderWithProvidersOptions = {},
) => render(ui, { wrapper: createWrapper(routerProps), ...options });
