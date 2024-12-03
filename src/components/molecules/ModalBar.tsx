import styled from "styled-components";
import { Paragraph } from "../atoms/Paragraph";
import { Line } from "../atoms/Divider";
import { Icon } from "../atoms/Icon";
import { Fragment } from "react";

export const ContainerModalBar = styled.div`
padding:20px;
display:flex;
background-color:#33842b;
align-items:center;
box-shadow: 0 1px 10px rgb(0 0 0 / 0.65);
margin-bottom:10px;
`

export const ModalBarItem = styled.div`


`

interface IModalBarProps {
    name: string,
    iconName: string,
}

export const ModalBar = ({ name, iconName }: IModalBarProps) => {


    return (
        <Fragment>
            <ContainerModalBar>
                <ModalBarItem>
                    <Icon  name={iconName}></Icon>
                </ModalBarItem>
                <ModalBarItem>
                    <Paragraph color="white"> {name}</Paragraph>
                    <Line></Line>
                </ModalBarItem>
            </ContainerModalBar>
        </Fragment>
    )
}