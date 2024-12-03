

import { ChangeEventHandler, Fragment, } from "react";
import { InputMaskField } from "./InputMaskField";
import {  ParagraphMessage } from "../atoms/Paragraph";


interface ITextFieldMask {
  name: string
  mask: string
  placeHolder: string
  onChange: ChangeEventHandler,
  value?: any,
  error?:any
}

export const TextFieldMask = ({ name, mask, placeHolder, onChange, value, error }: ITextFieldMask) => {
  return (
    <Fragment>
      {placeHolder}
      <InputMaskField value={value} onChange={onChange} name={name} mask={mask} />
      {<ParagraphMessage alert={true} >{error?.message && error.message}</ParagraphMessage>}
    </Fragment>
  )
}