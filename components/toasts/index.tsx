import React, { useContext, useRef } from 'react';
import Portal from '../portal';
import Toast from './toast';

// @ts-ignore
export const ToastsContext = React.createContext();
export const useToasts = (): any => useContext(ToastsContext);

export function withToasts(Component: any) {
  // tslint:disable-next-line: only-arrow-functions
  const Comp = function({ ...props }: any) {
    const currentToasts: any = useToasts();
    const toastsRef = useRef(null);

    // If there is already a toast ref, return it
    if (currentToasts && currentToasts.current) {
      return <Component {...props} />;
    }

    return (
      <ToastsContext.Provider value={toastsRef}>
        <>
          <Component {...props} />
          <Toasts ref={toastsRef} />
        </>
      </ToastsContext.Provider>
    );
  };
  Comp.getInitialProps = Component.getInitialProps;
  return Comp;
}

class Toasts extends React.Component<any, any> {
  public state = {
    hovering: false,
    messages: [],
    removed: new Set(),
    offset: 0,
    opacity: 1,
  };

  public message = toastMessage => {
    const { messages } = this.state;
    const message = typeof toastMessage === 'string' ? { text: toastMessage } : toastMessage;

    this.setState({
      messages: [
        ...messages,
        {
          ...message,
          key: Date.now(),
        },
      ],
    });
  };

  // only showing 1 toast
  public setMessage = toastMessage => {
    this.setState({
      messages: [toastMessage],
    });
  };
  public setHiding = () => {
    this.setState({
      messages: this.state.messages.map(message => ({
        // @ts-ignore
        ...message,
        shouldHide: true,
      })),
    });
  };

  public error = toastMessage => {
    const message = toastMessage
      ? typeof toastMessage === 'string'
        ? { text: toastMessage }
        : toastMessage
      : { text: 'An error occurred.' };

    this.message({ ...message, type: 'error' });
  };

  public success = toastMessage => {
    const message = toastMessage
      ? typeof toastMessage === 'string'
        ? { text: toastMessage }
        : toastMessage
      : { text: 'Success!' };

    this.message({ ...message, type: 'success ' });
  };

  public onMouseEnter = () => {
    this.setState({ hovering: true });
  };

  public onMouseLeave = () => {
    this.setState({ hovering: false });
  };

  public removeToast = message => {
    const { removed } = this.state;
    removed.add(message);

    this.setState({ removed });
  };

  public clear = () => {
    this.setState({ messages: [], removed: new Set() });
  };

  public render() {
    // const { } = this.state
    const { messages: allMessages, removed } = this.state;
    const { center, dark } = this.props;
    const messages = allMessages.filter(message => !removed.has(message));

    return (
      <Portal>
        <div
          className="toast-area"
          onMouseEnter={this.onMouseEnter}
          onTouchStart={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onTouchEnd={this.onMouseLeave}
        >
          {messages.map((message: any, i: number) => (
            <Toast
              key={message.key}
              index={i}
              length={messages.length}
              hovering={this.state.hovering}
              remove={() => this.removeToast(message)}
              dark={dark}
              {...message}
            />
          ))}
          <style jsx={true}>
            {`
              .toast-area {
                position: fixed;
                bottom: 10px;
                right: ${center ? 'calc(50% - 210px)' : '20px'};
                max-width: 420px;
                z-index: 9999;
                transition: transform 0.4s ease;
              }
              .toast-area:hover {
                ${messages.length > 1 ? 'transform: translate3d(0, -10px, 0);' : ''};
              }
              @media (max-width: 440px) {
                .toast-area {
                  max-width: 90vw;
                  right: 5vw;
                }
              }
            `}
          </style>
        </div>
      </Portal>
    );
  }
}

export default Toasts;
