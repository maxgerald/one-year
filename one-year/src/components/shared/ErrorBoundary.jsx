/**
 * ErrorBoundary - Class component that catches errors and shows fallback
 */
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 bg-bg p-8 text-center">
          <p className="text-lg font-semibold text-primary">Something went wrong</p>
          <p className="text-slate-600">We could not load this section. Please try again.</p>
          <button
            onClick={this.handleReload}
            className="rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:bg-accent-dark"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
