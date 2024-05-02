import { shade, darken } from 'polished';
import styled, { css } from 'styled-components';

interface ButtonProps {
  selected?: boolean;
}

export const Container = styled.div``;

export const Selector = styled.div`
  width: 100%;
  padding-left: 20px;

  flex-wrap: wrap;

  .buttons {
    min-height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    flex-wrap: wrap;
  }
`;

export const Button = styled.button<ButtonProps>`
  background: #d7c8c6;
  padding: 20px 50px;
  border: 0px;
  border-radius: 15px;

  font-size: 20px;

  @media (max-width: 580px) {
    margin-top: 4%;
  }

  &:hover {
    ${props =>
      !props.selected &&
      css`
        background: ${shade(0.2, '#D7C8C6')};
      `}
  }

  ${props =>
    props.selected &&
    css`
      background: ${darken(0.5, '#D7C8C6')};
      color: #fbf9f3;
    `}
`;

export const MinutesInput = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  justify-content: flex-start;

  input {
    width: 25%;
    font-size: 20px;

    margin-left: 20px;
    text-align: center;
    height: 50px;

    border: 4px solid #7f6e6c;
    border-radius: 20px;
  }
`;

export const Prices = styled.div`
  width: 100%;
  padding: 0 20px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .cards {
    min-height: 100px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    div {
      background: #b3a3a1;
      padding: 20px 10px;
      border-radius: 15px;

      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.6);
      h2 {
        color: #fbf9f3;
      }

      span {
        font-size: 20px;
      }

      @media (max-width: 650px) {
        margin-top: 2%;
      }
    }
  }
`;
