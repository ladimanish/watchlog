import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('WatchLog render error:', error, errorInfo.componentStack);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="glass-panel max-w-md text-center">
            <p className="mb-4 text-4xl" aria-hidden="true">
              ⚠️
            </p>
            <h2 className="section-title mb-2 text-semantic-error">
              Something went wrong
            </h2>
            <p className="section-subtitle mb-6">
              The app hit an unexpected error. Please try again.
            </p>
            <button type="button" onClick={this.handleRetry} className="btn-primary">
              Reload app
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
