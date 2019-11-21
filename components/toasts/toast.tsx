import React from 'react';

class Toast extends React.Component<any, any> {
  public hider: any;
  public static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.hovering) {
      return { hovering: true };
    } else {
      return { hovering: false };
    }
  }

  public state = {
    visible: false,
    hiding: false,
  };

  public componentDidMount = () => {
    setTimeout(() => this.setState({ visible: true }), 10);

    if (!this.props.action && !this.props.preserve) {
      this.hider = setTimeout(this.hide, 3500);
    }
  };

  public componentWillUnmount = () => {
    clearTimeout(this.hider);
  };

  public componentDidUpdate = (prevProps, prevState) => {
    if (this.props.shouldHide) {
      return (this.hider = setTimeout(this.hide, 300));
    }
    if (this.props.preserve) {
      return;
    }

    // @ts-ignore
    if (this.state.hovering) {
      clearTimeout(this.hider);
      // @ts-ignore
    } else if (prevState.hovering && !this.state.hovering) {
      this.hider = setTimeout(this.hide, 3500);
    }
  };

  public hide = () => {
    this.setState({ hiding: true }, () => {
      setTimeout(() => {
        this.props.remove();
      }, 200);
    });
  };

  public render() {
    const {
      text,
      action,
      onAction,
      cancelAction,
      onCancelAction,
      type,
      index: arrayIndex,
      length,
      dark,
    } = this.props;
    const { visible, hiding } = this.state;

    const index = length - arrayIndex - 1;

    return (
      <div className={`toast-container ${visible ? 'visible' : ''} ${hiding ? 'hiding' : ''}`}>
        <div className={`toast ${type ? type : ''}`}>
          <span className="message">{text}</span>
          {onCancelAction && (
            <a
              onClick={() => {
                if (onCancelAction) {
                  onCancelAction();
                }
                this.hide();
              }}
              style={{ marginRight: 10 }}
              // type={type}
              // small={true}
            >
              {cancelAction || 'Cancel'}
            </a>
          )}
          {action && (
            <a
              onClick={() => {
                if (onAction) {
                  onAction();
                }
                this.hide();
              }}
              // darkBg={type === 'error' || type === 'dark' || dark}
              // highlight={type === 'success'}
              // warning={type === 'error'}
              // small={true}
            >
              {action}
            </a>
          )}
        </div>
        <style jsx={true}>
          {`
            .toast-container {
              width: 420px;
              height: 72px;
              position: absolute;
              bottom: 0;
              right: 0;
              transition: all 0.4s ease;
              transform: translate3d(0, 100%, 0px) scale(1);
              animation: show 0.4s ease forwards;
              opacity: 1;
              ${index > 2 ? 'opacity: 0; pointer-events: none;' : ''};
            }
            .toast-container.visible {
              transform: translate3d(0, -${index * 15}px, -${index}px)
                scale(${1 - (index / 100) * 5});
            }
            .toast-container.hiding {
              opacity: 0;
            }
            .toast {
              width: 420px;
              background: var(--theme-background-color);
              color: var(--theme-foreground-color);
              border: 0;
              border-radius: 5px;
              height: 60px;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              box-shadow: rgba(0, 0, 0, 0.2) 0 0 15px 2px;
              font-size: 14px;
              display: flex;
            }
            .toast.error {
              border: 0;
              background-color: var(--theme-light-red);
              color: #ffffff;
            }
            .toast.success {
              border: 0;
              background-color: var(--theme-green);
              color: #ffffff;
            }
            :global(.toast-area:hover) .toast-container {
              transform: translate3d(0, ${index * -70}px, -${index}px)
                scale(${length === 1 ? 1 : 0.98205});
            }
            .message {
              text-overflow: ellipsis;
              white-space: nowrap;
              width: ${action ? 70 : 100}%;
              overflow: hidden;
              margin-top: -1px;
            }
            @media (max-width: 440px) {
              .toast-container,
              .toast {
                width: 90vw;
              }
              .toast-container {
                ${index > 1 ? 'opacity: 0; pointer-events: none;' : ''};
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Toast;
