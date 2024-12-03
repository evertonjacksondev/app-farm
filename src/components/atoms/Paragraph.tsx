import styled from "styled-components";

interface IProps {
    color?: string
    alert?: boolean
}
export const Paragraph = styled.p<IProps>`
font-size:18px;
color:${(props) => {
        if (props.alert) return 'red'
        if (props.color) return props.color
        if (!props.color) return 'black'
    }} ;
`


interface IProps {
    color?: string
    alert?: boolean
}
export const ParagraphMessage = styled.p<IProps>`
font-size:12px;
color:${(props) => {
        if (props.alert) return 'red'
        if (props.color) return props.color
        if (!props.color) return 'black'
    }} ;
`