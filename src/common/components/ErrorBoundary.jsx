import { Component } from 'react';

const ErrorBoundaryContainer = props => (
  <div>
    {props.children}
  </div>
);

/**
 * Simple error catcher.
 *
 * Wrap the usage of components to prevent any error from leaving.
 *
 * Example:
 * ```
 * <ErrorBoundary>
 *     <MyComponent ... />
 * </ErrorBoundary>
 * ```
 *
 * See also: {@link https://reactjs.org/docs/error-boundaries.html}
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: error, hasError: true };
  }

  componentDidCatch(error: Error | null) {
    const { t } = this.props;
    this.setState({ error: error || new Error(t('error:missing error')) });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorBoundaryContainer>
          <h1>Error</h1>
          {this.props.verbose && (
            <>
              <h2>Message:</h2>
              <p>{this.state.error.message}</p>
            </>
          )}
          {this.props.printStack && (
            <>
              <h2>Stack:</h2>
              <p>{this.state.error.stack}</p>
            </>
          )}
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
