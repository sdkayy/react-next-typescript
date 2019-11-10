import React from 'react';
import BlueScreen from '.';

interface State {
  error: any;
}

interface Props {
  children: any;
  fallbackComponent?: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state = { error: null };

  public componentDidCatch = (error: any, errorInfo: any) => {
    this.setState({ error });
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    window.Raven && window.Raven.captureException(error, { extra: errorInfo });
  };

  public render() {
    const { error } = this.state;
    const { fallbackComponent: FallbackComponent, children } = this.props;

    if (error) {
      if (this.props.fallbackComponent) {
        return <FallbackComponent />;
      }

      if (this.props.fallbackComponent === null) {
        return null;
      }

      return <BlueScreen />;
    }

    return children;
  }
}
