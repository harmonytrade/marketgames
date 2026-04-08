import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
  title: string;
  body: string;
  retryLabel: string;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AppErrorBoundary', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="screen screen--result">
        <div className="result-stack">
          <section className="session-summary-card session-summary-card--error">
            <p className="eyebrow">BUY / SELL</p>
            <h2>{this.props.title}</h2>
            <p className="session-summary-card__punchline">{this.props.body}</p>
            <button
              className="button button--primary"
              onClick={() => window.location.reload()}
              type="button"
            >
              {this.props.retryLabel}
            </button>
          </section>
        </div>
      </section>
    );
  }
}
