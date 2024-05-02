import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: string;
  textColor?: string;
}

export const Container = styled.button<ContainerProps>`
  background: ${props => props.color || '#ff9000'};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${props => props.textColor || '#312e38'};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => shade(0.2, props.color || '#ff9000')};
  }
`;
