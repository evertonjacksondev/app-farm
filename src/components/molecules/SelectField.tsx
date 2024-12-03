import { ChangeEventHandler, Fragment } from "react"
import { Select } from "../atoms/Select"
import { ParagraphMessage } from "../atoms/Paragraph";

interface ISelectProps {
    name: string
    option: { id: string | number, name: string; value: string }[]
    placeHolder: string
    defaultValue: string
    value?: string | number | any
    onChange?: ChangeEventHandler
    error?: { message?: string }
}

export const SelectField = ({ defaultValue, name, placeHolder, onChange, option, value, error }: ISelectProps) => {


    return (

        <Fragment>
            {placeHolder}
            <Select onChange={onChange} defaultValue={defaultValue} name={name}>
                <option value={value} hidden>Selecione {placeHolder}</option>
                {option.map((items) => (
                    <option key={items.id} value={items.name}>
                        {items.value}
                    </option>
                ))}</Select>
            {<ParagraphMessage alert={true} >{error?.message && error.message}</ParagraphMessage>}
        </Fragment>
    )
}