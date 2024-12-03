import styled from "styled-components";


interface IButtonProps {
  background?: string;
  radius?: string;
  width?: string;
  height?: string;
}

export const Button = styled.button<IButtonProps>`
  background:${(props) => (props.background ? props.background : '#33842b')} ;
  color:${(props) => (props.color ? props.color : 'white')} ;
  border: 1px solid rgba(243, 239, 239, 0);
  border-radius: ${(props) => (props.radius ? props.radius : '8px')} ;
  width:${(props) => (props.width ? props.width : '100%')} ;
  height:${(props) => (props.height ? props.height : '50px')} ;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
    cursor:pointer;
  :disabled {
    background-color: #d2d2d2;
     color: black;
    opacity: 1;
  }
 
`