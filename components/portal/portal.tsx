import { Component } from 'react';
import { createPortal } from 'react-dom';

const isClient = typeof window !== 'undefined';

class Portal extends Component<any> {
  public rootElement: any;
  constructor(props: any) {
    super(props);

    if (isClient) {
      this.rootElement = document.createElement('div');
    }
  }

  public UNSAFE_componentWillMount() {
    if (isClient) {
      this.renderContainer(this.props);
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (isClient && this.props.className !== nextProps.className) {
      this.rootElement.className = this.props.className;
    }

    if (isClient && this.props.container !== nextProps.container) {
      this.unrenderContainer(this.props);
      this.renderContainer(nextProps);
    }
  }

  public componentWillUnmount() {
    if (isClient) {
      this.unrenderContainer(this.props);
    }
  }

  public renderContainer(props: any) {
    getContainer(props.container).appendChild(this.rootElement);

    if (props.className) {
      this.rootElement.className = props.className;
    }
  }

  public unrenderContainer(props: any) {
    getContainer(props.container).removeChild(this.rootElement);
  }

  public render() {
    if (!isClient) {
      return null;
    }

    return createPortal(this.props.children, this.rootElement);
  }
}

function getContainer(container: any) {
  return container || document.body;
}

export default Portal;
