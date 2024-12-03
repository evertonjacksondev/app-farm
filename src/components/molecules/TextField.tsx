
import { ChangeEventHandler, Fragment } from "react";
import { Input } from "../atoms/Input";
import { ParagraphMessage } from "../atoms/Paragraph";

interface ITextField {
    name: string
    placeHolder: string
    onChange?: ChangeEventHandler
    value?:string | number
    error?: any
    type?:string
}

export const TextField = ({ name, placeHolder, onChange, error,type }: ITextField) => {
    return (
        <Fragment>
            {placeHolder}
            <Input type={type} onChange={onChange} name={name} />
            {<ParagraphMessage  alert={true} >{error && error.message}</ParagraphMessage>}
        </Fragment>)
}