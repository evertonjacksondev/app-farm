import { Fragment } from "react"
import 'material-icons/iconfont/material-icons.css'

interface IIconsProps {
    name: string,
}


export const Icon = ({ name }: IIconsProps) => {
    return (
        <Fragment>
                <i translate="no" className='material-icons'>{name}</i>
        </Fragment>
    )
}
