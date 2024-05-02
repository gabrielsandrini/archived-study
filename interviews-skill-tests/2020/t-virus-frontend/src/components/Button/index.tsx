import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: string;
  textColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  textColor,
  ...rest
}) => {
  return (
    <Container type="button" color={color} textColor={textColor} {...rest}>
      {loading ? 'Loading...' : children}
    </Container>
  );
};

export default Button;
