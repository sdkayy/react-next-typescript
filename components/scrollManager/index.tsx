import React from 'react';
import debounceFn from 'debounce';

interface Props {
  scrollCaptureDebounce: number;
  scrollSyncDebounce: number;
  scrollSyncAttemptLimit: number;
  children?: JSX.Element;
  history?: any;
  location?: any;
  onLocationChange?: any;
}

class ScrollManager extends React.Component<Props> {
  public debouncedScrollSync: any;
  public debouncedScrollSyncPending: any;
  public debouncedScroll: any;
  public scrollSyncData: any;
  public scrollSyncPending: any;
  public static defaultProps = {
    scrollCaptureDebounce: 50,
    scrollSyncDebounce: 100,
    scrollSyncAttemptLimit: 5,
  };

  constructor(props: Props) {
    super(props);

    this.scrollSyncData = {
      x: 0,
      y: 0,
      attemptsRemaining: props.scrollSyncAttemptLimit,
    };

    const scrollCapture = () => {
      requestAnimationFrame(() => {
        const { pageXOffset, pageYOffset } = window;
        const { pathname } = window.location;

        // use browser history instead of router history
        // to avoid infinite history.replace loop
        const historyState = window.history.state || {};
        const { state = {} } = historyState;
        if (!state.scroll || state.scroll.x !== pageXOffset || state.scroll.y !== pageYOffset) {
          window.history.replaceState(
            {
              ...historyState,
              state: { ...state, scroll: { x: pageXOffset, y: pageYOffset } },
            },
            // @ts-ignore
            null,
            pathname
          );
        }
      });
    };

    const _scrollSync = () => {
      requestAnimationFrame(() => {
        const { x, y, attemptsRemaining } = this.scrollSyncData;

        if (attemptsRemaining < 1) {
          return;
        }

        const { pageXOffset, pageYOffset } = window;
        if (y < window.document.body.scrollHeight && (x !== pageXOffset || y !== pageYOffset)) {
          window.scrollTo(x, y);
          this.scrollSyncData.attemptsRemaining = attemptsRemaining - 1;
          _scrollSync();
        }
      });
    };

    const scrollSync = (x = 0, y = 0) => {
      this.scrollSyncData = {
        x,
        y,
        attemptsRemaining: this.props.scrollSyncAttemptLimit,
      };
      _scrollSync();
    };

    this.debouncedScroll = debounceFn(scrollCapture, props.scrollCaptureDebounce);
    this.debouncedScrollSync = debounceFn(scrollSync, props.scrollSyncDebounce);

    const { location, onLocationChange } = this.props;
    if (onLocationChange) {
      onLocationChange(location);
    }
  }

  public componentDidMount() {
    this.onPop();
    window.addEventListener('scroll', this.debouncedScroll, { passive: true });
  }

  public componentWillUnmount() {
    this.scrollSyncPending = false;
    window.removeEventListener('scroll', this.debouncedScroll, {
      // @ts-ignore
      passive: true,
    });
  }

  public onPush() {
    this.debouncedScrollSync(0, 0);
  }

  public onPop() {
    this.debouncedScrollSync(0, 0);
  }

  public render() {
    return this.props.children;
  }
}

export default ScrollManager;
