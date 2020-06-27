import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import { generate } from '@ant-design/colors';
import { position } from 'polished';

import { changePXRelatively } from '../../utils';
import {
  Color,
  FontSize,
  Size as StyleSize,
  BaseColor,
  BackgroundColor,
  BorderColor,
  TextColor,
} from '../../styles';

import { ButtonProps, Indent } from './type';

export const getSizeStyle = ({ size = 'normal' }: ButtonProps) => {
  switch (size) {
    case 'small':
      return css`
        height: ${StyleSize.Small};
        padding: 0 10px;
        line-height: ${changePXRelatively(StyleSize.Small, -2)};
        font-size: ${FontSize.Base};
      `;
    case 'large':
      return css`
        height: ${StyleSize.Large};
        padding: 0 30px;
        line-height: ${changePXRelatively(StyleSize.Large, -2)};
        font-size: ${FontSize.Medium};
      `;
    default:
    case 'normal':
      return css`
        height: ${StyleSize.Normal};
        padding: 0 20px;
        line-height: ${changePXRelatively(StyleSize.Normal, -2)};
        font-size: ${FontSize.Base};
      `;
  }
};

export type ButtonColorObject = Partial<{
  color: string;
  backgroundColor: string;
  borderColor: string;
}>;

export const getButtonColor = ({
  color = 'transparent',
  backgroundColor = 'transparent',
  borderColor = 'transparent',
}: ButtonColorObject) => css`
  color: ${color};
  background: ${backgroundColor};
  border-color: ${borderColor};
`;

export const getLoadingStyle = (props: ButtonProps) =>
  props.loading &&
  css`
    position: relative;
    pointer-events: none;

    &:before {
      ${position('absolute', 0)};
      z-index: 1;
      background: ${BaseColor.White};
      border-radius: inherit;
      opacity: 0.35;
      transition: opacity 0.2s;
      content: '';
    }
  `;

export const getDisabledStyle = ({
  color = Color.Disabled,
  borderColor = BorderColor.Base,
  backgroundColor = BackgroundColor.Base,
}: ButtonColorObject = {}) =>
  css`
    &[disabled] {
      &,
      &:hover,
      &:focus,
      &:active {
        ${getButtonColor({
          color,
          borderColor,
          backgroundColor,
        })};
        cursor: not-allowed;
        text-shadow: none;
        box-shadow: none;
      }
    }
  `;

const colorByIndent: { [key in Indent]: string } = {
  default: Color.Primary,
  success: Color.Success,
  danger: Color.Danger,
  warning: Color.Warning,
};

const getNormalButtonStyle = ({
  color = TextColor.Base,
  borderStyle = 'solid',
  shouldUseBaseColorWhenNormal = false,
}: Omit<ButtonColorObject, 'backgroundColor'> &
  Partial<{
    borderStyle: string;
    shouldUseBaseColorWhenNormal: boolean;
  }>) => css`
  ${getButtonColor(
    shouldUseBaseColorWhenNormal
      ? {
          color: TextColor.Base,
          borderColor: BorderColor.Base,
        }
      : {
          color,
          borderColor: color,
        }
  )};
  border-style: ${borderStyle};

  &:hover,
  &:focus {
    ${getButtonColor({
      color: generate(color)[4],
      borderColor: generate(color)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color: generate(color)[6],
      borderColor: generate(color)[6],
    })};
  }

  ${getDisabledStyle()};
`;

const getPrimaryButtonStyle = ({
  color = BaseColor.White,
  backgroundColor = BaseColor.Black,
}: Pick<ButtonColorObject, 'color' | 'backgroundColor'>) => css`
  ${getButtonColor({
    color,
    backgroundColor,
    borderColor: backgroundColor,
  })};

  &:hover,
  &:focus {
    ${getButtonColor({
      color,
      backgroundColor: generate(backgroundColor)[4],
      borderColor: generate(backgroundColor)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color,
      backgroundColor: generate(backgroundColor)[6],
      borderColor: generate(backgroundColor)[6],
    })};
  }

  ${getDisabledStyle()};
`;

const getLinkButtonStyle = ({
  color = TextColor.Base,
  shouldUseBaseColorWhenNormal = false,
}: Pick<ButtonColorObject, 'color'> &
  Partial<{
    shouldUseBaseColorWhenNormal: boolean;
  }>) => css`
  ${getButtonColor(
    shouldUseBaseColorWhenNormal
      ? {
          color: TextColor.Base,
        }
      : {
          color,
        }
  )};

  &:hover,
  &:focus {
    ${getButtonColor({
      color: generate(color)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color: generate(color)[6],
    })};
  }

  ${getDisabledStyle()};
`;

const getVariantStyle = (props: ButtonProps) => {
  const { variant = 'default', indent = 'default' } = props;
  const color = colorByIndent[indent];

  let variantStyle = null;

  switch (variant) {
    case 'primary':
      variantStyle = getPrimaryButtonStyle({
        color: BaseColor.White,
        backgroundColor: color,
      });
      break;

    case 'dashed':
      variantStyle = getNormalButtonStyle({
        shouldUseBaseColorWhenNormal: indent === 'default',
        color,
        borderStyle: 'dashed',
      });
      break;

    case 'link':
      variantStyle = getLinkButtonStyle({
        shouldUseBaseColorWhenNormal: indent === 'default',
        color,
      });
      break;

    case 'default':
    default:
      variantStyle = getNormalButtonStyle({
        shouldUseBaseColorWhenNormal: indent === 'default',
        color,
        borderStyle: 'solid',
      });
      break;
  }

  return css`
    ${variantStyle};
    ${getLoadingStyle(props)};
  `;
};

const getBaseStyle = () => css`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 2px;
  text-align: center;
  outline: none;
  white-space: nowrap;
  transition: all 0.3s;
  touch-action: manipulation;
  user-select: none;
  cursor: pointer;
`;

export const StyledButton = styled('button')<ButtonProps>`
  ${getBaseStyle}
  ${getSizeStyle};
  ${getVariantStyle};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const IconSpan = styled('span')`
  margin-right: 5px;
  vertical-align: -.125em;
`;

export const ReloadIconStyle = css`
  animation: ${spin} 1s linear infinite;
`;