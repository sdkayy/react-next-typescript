import React from 'react';
import styled from 'styled-components';

/*
  A generic error component which will fill the space of any container its placed in.
  It requires a heading and subheading to be used to inform the error about why this error is being shown.
  It receives optional props that can help fix a user's problem or nudge them towards resolution:
  - clearStorage: if this prop is present, we will clear the local storage on the client which will then prompt them to re-login on the next page load.
  - refresh: if this prop is present, we will show a button that the user can click to refresh the view. This will most often be used in conjunction with clearStorage
  - children: the error component can receive any other miscellaneous children in order to customize the error view based on the context it's in
*/

// NOTE: some of these styles are not inherited from ThemeProvider
// because it's an Error Page and is loaded standalone
const FillSpaceError = styled.div<{ small?: boolean }>`
  font-family: BlinkMacSystemFont, 'Muli', 'Segoe UI', Helvetica, Arial, sans-serif;
  display: flex;
  flex: auto;
  background: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: stretch;
  text-align: center;
  background-color: #f8f8f8;
  padding: ${props => (props.small ? '16px 12px' : '32px 24px')};
  border-radius: 12px;
`;

const Heading = styled.h3<{ small?: boolean }>`
  font-size: ${props => (props.small ? '18px' : '24px')};
  font-weight: ${props => (props.small ? '500' : '600')};
  color: #454f63;
  max-width: 600px;
  margin-bottom: 8px;
`;

const Subheading = styled.h4<{ small?: boolean }>`
  font-size: ${props => (props.small ? '14px' : '18px')};
  font-weight: ${props => (props.small ? '400' : '500')};
  line-height: 1.4;
  color: #828c99;
  max-width: 540px;
  margin-bottom: ${props => (props.small ? '16px' : '32px')};
`;

const StyledImgContainer = styled.div`
  background-color: #0176ff;
  padding: 40px;
  margin-bottom: 10px;
  border-radius: 8px;
  svg {
    width: 250px;
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    margin: 12px;
  }
`;

const StyledImg = styled.img`
  width: 300px;
`;

interface Props {
  type?: string;
  heading?: string;
  subheading?: string;
  clearStorage?: boolean;
  refresh?: boolean;
  backHome?: boolean;
  children?: JSX.Element;
  small?: boolean;
  dataCy?: string;
}

export default (props: Props): JSX.Element => {
  const {
    clearStorage,
    heading,
    subheading,
    refresh,
    backHome,
    type,
    children,
    small,
    dataCy,
  } = props;

  const head = heading || 'We could all use a refresh.';
  const subhead = subheading || 'Refresh this page to try again.';

  return (
    <FillSpaceError small={small} data-cy={dataCy}>
      <Heading small={small}>{head}</Heading>
      <Subheading small={small}>{subhead}</Subheading>

      <ButtonContainer>
        {refresh && <button onClick={() => window.location.reload(true)}>Refresh the page</button>}

        {backHome && (
          // @ts-ignore
          <button onClick={() => (window.location = '/')}>Take me home</button>
        )}
      </ButtonContainer>
      {children}
    </FillSpaceError>
  );
};
