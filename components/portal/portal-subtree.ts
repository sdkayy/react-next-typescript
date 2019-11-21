import { Component } from 'react';
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtree,
} from 'react-dom';

class PortalSubtree extends Component<any> {
  public childRootNode = null;

  public componentDidMount() {
    this.renderChildren();
  }

  public UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (this.childRootNode && nextProps.container !== this.props.container) {
      getContainer(this.props.container).removeChild(this.childRootNode);
      getContainer(nextProps.container).appendChild(this.childRootNode);
    }
  }

  public componentDidUpdate() {
    this.renderChildren();
  }

  public componentWillUnmount() {
    this.unmount();
  }

  public renderChildren() {
    const children = this.props.children;

    if (children !== null) {
      const childRootNode: any = this.getOrCreateChildRootNode();

      if (this.props.className) {
        childRootNode.className = this.props.className;
      }

      if (this.props.parentId) {
        childRootNode.setAttribute('data-origin-id', this.props.parentId);
      }

      renderSubtree(this, children, childRootNode);
    } else {
      this.unmount();
    }
  }

  public getOrCreateChildRootNode() {
    if (!this.childRootNode) {
      // @ts-ignore
      this.childRootNode = document.createElement('div');
      getContainer(this.props.container).appendChild(this.childRootNode);
      if (this.props.onMount) {
        this.props.onMount();
      }
    }

    return this.childRootNode;
  }

  public unmount() {
    if (this.childRootNode) {
      unmountComponentAtNode(this.childRootNode);
      getContainer(this.props.container).removeChild(this.childRootNode);
      this.childRootNode = null;
      if (this.props.onUnmount) {
        this.props.onUnmount();
      }
    }
  }

  public render() {
    return null;
  }
}

function getContainer(container: any) {
  return container || document.body;
}

export default PortalSubtree;
