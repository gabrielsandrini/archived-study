import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin: 15px;

  h2 {
    margin-bottom: 15px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #fff;
  font-size: 24px;
  min-width: 300px;

  & + & {
    margin-top: 10px;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

  input {
    text-align: center;
    margin-left: 10px;
    height: 30px;
    min-width: 50px;
  }

  * {
    width: 40px;
    text-align: center;
  }

  span {
    width: auto;
  }
`;
