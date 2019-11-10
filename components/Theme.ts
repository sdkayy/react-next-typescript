import styled from 'styled-components';
import { zIndex } from './globals';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 16px;
  flex: 1 0 auto;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  z-index: ${zIndex.base};
  align-self: stretch;
  @media (min-width: 768px) {
    width: 50%;
    margin: auto;
  }
`;

export const Card = styled.div`
  width: 100%;
  border-radius: 12px;
  background: white;
  padding: 12px;
  box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
`;

export const FancyLinkHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 8px 0;
`;

export const FancyLink = styled.a`
  color: ${props => props.theme.text.secondary};
  text-transform: uppercase;
  text-decoration: none;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
`;

export const App = styled.div`
  color: ${props => props.theme.text.text};
`;

export const A = styled.a`
  color: ${props => props.theme.brand.alt};
  &:active,
  &:hover {
    text-decoration: underline;
  }
`;

export const P = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

export const Article = styled.article`
  margin: ${props => props.theme.alignment.horizontalcenter};
  max-width: 650px;
`;

export const Button = styled.button`
  align-items: center;
  background-color: ${props => props.theme.brand.alt};
  border: 0;
  color: #ffffff;
  display: flex;
  padding: 12px;
  &:active {
    background-color: #0176ff;
    transition: background-color 0.3s;
  }
  &:focus {
    outline: none;
  }
`;
