import { ReactNode } from "react"
import styled from "styled-components"

interface IContainerProps {
    children: ReactNode
}


const ItemStyle = styled.div`
width:50px;
margin:5px;
`

export const Item = ({ children }: IContainerProps) => {

    return (
        <ItemStyle>
            {children}
        </ItemStyle>

    )
}