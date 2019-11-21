import React, { useContext, useRef } from 'react';
import ExampleModal from './ExampleModal';

// @ts-ignore
export const ModalsContext = React.createContext();
export const useModals = () => useContext(ModalsContext);

export function withModals(Component: any) {
  // tslint:disable-next-line: only-arrow-functions
  const Comp = function({ ...props }: any) {
    const currentModals: any = useModals();
    const modalsRef = useRef(null);

    // If there is already a modal ref, return it
    if (currentModals && currentModals.current) {
      return <Component {...props} />;
    }

    return (
      <ModalsContext.Provider value={modalsRef}>
        <>
          <Component {...props} />
          <Modals ref={modalsRef} />
        </>
      </ModalsContext.Provider>
    );
  };
  Comp.getInitialProps = Component.getInitialProps;
  return Comp;
}

interface ModalTriggerType {
  type: 'experience' | 'apply';
  modalProps: any;
}

interface ModalType {
  type: 'experience' | 'apply';
  modalProps: any;
  key: string;
}

class Modals extends React.Component<any, any> {
  public state = {
    modals: [],
    removed: new Set(),
    offset: 0,
    opacity: 1,
  };

  public openModal = (opts: ModalTriggerType) => {
    const { modals } = this.state;

    this.setState({
      modals: [
        ...modals,
        {
          ...opts,
          key: Date.now(),
        },
      ],
    });
  };

  public removeModal = (modal: ModalType) => {
    const { removed } = this.state;
    removed.add(modal);

    this.setState({ removed });
  };

  public clear = () => {
    this.setState({ messages: [], removed: new Set() });
  };

  public render() {
    // const { } = this.state
    const { modals: allModals, removed } = this.state;
    const { center, dark } = this.props;
    const modals = allModals.filter((modal: ModalType) => !removed.has(modal));

    return (
      <div className="modal-area">
        {modals.map((m: ModalType, i: number) => {
          if (m.type === 'experience') {
            return (
              <ExampleModal
                key={m.key}
                index={i}
                closeModal={() => this.removeModal(m)}
                dark={dark}
                {...m}
              />
            );
          } else {
            return <div />;
          }
        })}
        <style jsx={true}>
          {`
            .modal-area {
              position: fixed;
              bottom: 10px;
              right: ${center ? 'calc(50% - 210px)' : '20px'};
              max-width: 420px;
              z-index: 2000;
              transition: transform 0.4s ease;
            }
            .modal-area:hover {
              ${modals.length > 1 ? 'transform: translate3d(0, -10px, 0);' : ''};
            }
            @media (max-width: 440px) {
              .modal-area {
                max-width: 90vw;
                right: 5vw;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Modals;
