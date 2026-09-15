/* eslint-disable @typescript-eslint/no-require-imports */
const { server } = require('../mocks/server.js') as {
  server: {
    listen: (options: { onUnhandledRequest: 'error' | 'warn' | 'bypass' }) => void;
    resetHandlers: () => void;
    close: () => void;
    use: (...handlers: unknown[]) => void;
  };
};

/** Wire MSW server lifecycle for component tests that hit TMDB / Open Library. */
export const setupApiMocks = (): void => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};

export { server };
