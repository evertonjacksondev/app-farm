import styled from "styled-components";
import InputMask from 'react-input-mask';

export const InputMaskField = styled(InputMask) `
    color: #787575;
    width:100%;
    max-height:60px;  
    background-color:#F5F5F5; 
    border:1px solid  #D9D9D9;
    height:50px;
    font-size: 14px;
    border-radius: 8px;
    ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
    :focus {
      color: #454040;
      outline: none;
      border:1px solid #D9D9D9;

    }
    :active{
      color: #696767;
      border:1px solid #D9D9D9;
      outline: none;    
      
    }
    ::placeholder{
      color: #787575;
   
    }
    `
