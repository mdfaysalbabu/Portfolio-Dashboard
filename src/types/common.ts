import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export type TMeta={
    page:number;
    limit:number;
    total:number;
}

export const USER_ROLE={
 ADMIN:"admin"
}

export type UserRole =keyof typeof USER_ROLE;

export interface IDrawerItem{
    title:string;
    path:string;
    parentPath?:string;
    icon?:OverridableComponent<SvgIconTypeMap<{},"svg">> & {muiName:string};
    child?:IDrawerItem[]
}