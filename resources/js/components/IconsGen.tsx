import React from "react";
import * as icons from "react-icons/fa";

const getKeyValue = (key:string)=>(obj:Record<string, any>)=>obj[key];
const idConvertName = (iconId:string)=>{
    let names = iconId.split("-");
    let id = "";
    names.forEach(value=>{
        id = id+value.charAt(0).toUpperCase()+value.slice(1);
    })
    return id;
}
export default function getIcon(iconId:string)
{
    if(iconId.indexOf("-") != -1)
    {
        iconId = idConvertName(iconId);
    }
    const Icon = getKeyValue(iconId)(icons);
    return <Icon />
}

export function iconIds(){
    let keys = Object.keys(icons);
    return keys;
}