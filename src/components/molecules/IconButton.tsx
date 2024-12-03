import { Fragment, MouseEventHandler, ReactNode } from "react";
import { Button } from "../atoms/Button"
import { CircularProgress, Tooltip } from "@mui/material";
import { Icon } from "../atoms/Icon";


interface IIconButtonProps {
    iconName: string
    isLoadingIcon: boolean
    tooltipTitle?: string
    background?: string
    children?: ReactNode
    label?: string
    outlined?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
    others?: any,
}



export const IconButton = (
    { isLoadingIcon = false,
        tooltipTitle = '',
        iconName,
        background,
        label,
        children,
        outlined = false,
        ...others }: IIconButtonProps) => {
    return (
        <Fragment>
            <Tooltip title={tooltipTitle}>
                <Button {...others} background={background}>
                    {isLoadingIcon && (<CircularProgress style={{ width: 40 }} />)}
                    {!isLoadingIcon && (<Icon  name={iconName} />)}
                    {label}
                    {children}
                </Button>
            </Tooltip>
        </Fragment>
    );
};