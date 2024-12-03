import { ReactNode } from "react"
import styled from "styled-components"

interface IContainerProps {
    children: ReactNode
}


const ContainerStyle = styled.div`
display:flex;
max-width:1100px;
justify-content:center;

`

export const Container = ({ children }: IContainerProps) => {



    return (
        <ContainerStyle>
            {children}
        </ContainerStyle>

    )
}