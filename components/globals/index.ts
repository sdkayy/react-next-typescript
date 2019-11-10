import styled, { css, keyframes } from 'styled-components';

export const Truncate = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`;

const size = size => css`
  width: ${size};
  height: ${size};
`;

const sizePx = n => size(`${n}px`);

export const hexa = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha >= 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const Shadow = {
  low: '0 2px 8px',
  mid: '0 4px 12px',
  high: '0 8px 16px',
};

export const Transition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
  dropdown: {
    off: 'all 0.35s ease-out',
  },
};

export const zIndex = new (function() {
  // Write down a camel-cased element descriptor as the name (e.g. modal or chatInput).
  // Define at a component level here, then use math to handle order at a local level.
  // (e.g. const ModalInput = styled.input`z-index: zIndex.modal + 1`;)
  // This uses constructor syntax because that allows self-referential math

  // @ts-ignore
  this.base = 1; // z-index: auto content will go here or inherit z-index from a parent
  // @ts-ignore
  this.background = this.base - 1; // content that should always be behind other things (e.g. textures/illos)
  // @ts-ignore
  this.hidden = this.base - 2; // this content should be hidden completely (USE ADD'L MEANS OF HIDING)

  // @ts-ignore
  this.nav = this.base + 1;
  // @ts-ignore
  this.card = this.base + 1; // all cards should default to one layer above the base content
  // @ts-ignore
  this.loading = this.card + 1; // loading elements should never appear behind cards
  // @ts-ignore
  this.fullscreen = 4000; // fullscreen elements should cover all screen content except toasts
  // @ts-ignore
  this.modal = 5000; // modals should completely cover base content and slider as well
  // @ts-ignore
  this.gallery = this.modal + 1; // gallery should never appear behind a modal
  // @ts-ignore
  this.toast = 6000; // toasts should be visible in every context
  // @ts-ignore
  this.tooltip = this.toast + 1; // tooltips should always be on top
})();

export const fontStack = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica', 'Segoe', sans-serif;
`;

const bounce = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoadingChild = styled.div<{ delay: number }>`
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.2s ease-in-out ${p => p.delay}s infinite both;
`;

export const StyledThreeBounce = styled.div<{ size: string; inline?: boolean; color?: string }>`
  width: ${props => (props.size !== 'undefined' ? `${props.size}px` : '32px')};
  height: ${props => (props.size !== 'undefined' ? `${props.size}px` : '32px')};
  text-align: center;
  content: '';
  box-sizing: border-box;
  display: inline-block;
  position: ${props => (props.inline ? 'relative' : 'absolute')};
  top: ${props => (props.inline ? '0' : '50%')};
  ${'' /* left: ${props => (props.inline ? '0' : '0')}; */}
  margin-top: ${props =>
    props.size !== 'undefined' ? `-${parseInt(props.size, 10) / 2}px` : '-6px'};
  margin-left: ${props =>
    props.size !== 'undefined' ? `-${parseInt(props.size, 10) / 2}px` : '0'};
  border-radius: 100%;
  > ${LoadingChild} {
    ${props => sizePx((props.size !== 'undefined' ? parseInt(props.size, 10) : 32) / 3)};
    background-color: ${props => (props.color ? props.color : props.theme.text.alt)};
  }
`;

export const H1 = styled.h1`
  ${fontStack};
  color: ${({ theme }) => theme.text.default};
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
`;

export const H2 = styled.h2`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  margin: 0;
  padding: 0;
`;

export const H3 = styled.h3`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 0;
`;

export const H4 = styled.h4`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.text.default};
  ${fontStack};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
  padding: 0;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

// Universal tooltip I always find myself using.

const returnTooltip = props => {
  switch (props.tipLocation) {
    case 'top-left':
      return `
          &:after {
            bottom: calc(100% + 4px);
            right: 0;
          }
          &:before {
            bottom: 100%;
            right: 0;
            transform: translateX(-100%);
      	    border-bottom-width: 0;
      	    border-top-color: ${props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse};
          }
      `;
    case 'top-right':
      return `
          &:after {
            bottom: calc(100% + 4px);
            left: 0;
          }
          &:before {
            bottom: 100%;
            left: 0;
            transform: translateX(100%);
      	    border-bottom-width: 0;
      	    border-top-color: ${props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse};
          }
      `;
    case 'top':
      return `
          &:after {
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
          }
          &:before {
            bottom: calc(100% + 3px);
            left: 50%;
            transform: translateX(-50%);
            border-bottom-width: 0;
            border-top-color: ${
              props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `;
    case 'right':
    default:
      return `
          &:after {
            top: 50%;
            left: calc(100% + 4px);
            transform: translateY(-50%);
          }
          &:before{
            top: calc(50% - 5px);
            left: 100%;
            border-left-width: 0;
            border-right-color: ${
              props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `;
    case 'bottom-left':
      return `
          &:after {
            top: calc(100% + 4px);
            right: 0;
          }
          &:before {
            top: 100%;
            right: 0;
            transform: translateX(-100%);
      	    border-top-width: 0;
      	    border-bottom-color: ${
              props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `;
    case 'bottom-right':
      return `
          &:after {
            top: calc(100% + 4px);
            left: 0;
          }
          &:before {
            top: 100%;
            left: 0;
            transform: translateX(100%);
      	    border-top-width: 0;
      	    border-bottom-color: ${
              props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `;
    case 'bottom':
      return `
        &:after {
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }
        &:before {
          top: calc(100% + 3px);
          left: 50%;
          transform: translateX(-50%);
          border-top-width: 0;
          border-bottom-color: ${
            props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
          };
        }
      `;
    case 'left':
      return `
          &:after {
            right: calc(100% + 4px);
            top: 50%;
            transform: translateY(-50%);
          }
          &:before{
            right: 100%;
            top: calc(50% - 5px);
            border-right-width: 0;
            border-left-color: ${
              props.isOnboarding ? props.theme.brand.alt : props.theme.bg.reverse
            };
          }
      `;
  }
};

export const Tooltip = () => css<{ tipText?: string; isOnboarding?: boolean }>`
  position: relative;
  &:after,
  &:before {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    display: block;
    text-transform: none;
  }
  &:before {
    content: '';
    z-index: ${zIndex.tooltip + 1};
    border: 6px solid transparent;
  }
  &:after {
    content: ${props =>
      props.tipText && !props.isOnboarding
        ? // @ts-ignore
          `'${props.tipText}'`
        : `''`};
    z-index: ${zIndex.tooltip};
    ${fontStack};
    font-size: 14px;
    font-weight: 500;
    min-width: 8px;
    max-width: 21em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: ${Shadow.mid} ${props => hexa(props.theme.bg.reverse, 0.25)};
    background: ${props => props.theme.bg.reverse};
    color: ${props => props.theme.text.reverse};
  }
  ${props => (props.tipText && !props.isOnboarding ? returnTooltip(props) : '')};
  ${props =>
    props.tipText &&
    css`
      &:hover:after,
      &:hover:before {
        opacity: 1;
      }
    `};
`;
