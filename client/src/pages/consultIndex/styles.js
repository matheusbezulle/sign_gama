import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
`;

export const AppHeader = styled.form`
  border-bottom: 1px solid #777777bd;
  height: 60px;
  width: 100%;
  padding: 20px;
  text-align: right;
  a {
    font-size: 16;
    font-weight: bold;
    color: #ff3333;
    text-decoration: none;
  }
`;

export const Consult = styled.form`
  margin: 20px 50px;
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  label {
    color: #777;
    width: 100%;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 15px 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  .default-button {
    color: #fff;
    font-size: 16px;
    background: #fc6963;
    height: 48px;
    margin-left: 15px;
    border: 0;
    border-radius: 5px;
    margin-right: 15%;
    width: 15%;
  }
  .consult-input-field{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;