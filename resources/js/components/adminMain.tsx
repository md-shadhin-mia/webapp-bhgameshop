import React from "react";
import { Component } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";
import MenusItems from "./menus";

class AdminMain extends Component<AdminMainProps>{
    constructor(props:AdminMainProps)
    {
        super(props)
    }
    menus(menuName:string){
        switch (menuName) {
            case MenusItems.billing:
                
                break;
            case MenusItems.clients:
                
                break;
            case MenusItems.flows:
                
                break;
            case MenusItems.notifications:
                
                break;
            case MenusItems.order:
                
                break;
            case MenusItems.pages:
                
                break;
            case MenusItems.product:
                
                break;
            case MenusItems.profile:
                
                break;
            case MenusItems.projectTeam:
                
                break;
            case MenusItems.security:
                
                break;
            default:
                break;
        }
    }
    render = ()=>{
        const { url, path } = this.props.match;
        const {dashboardId} = this.props.match.params;
         return <div>
            <h1>{this.props.name? this.props.name : url}</h1>
        </div>
    }
}

export default withRouter(AdminMain);

interface AdminMainProps extends RouteComponentProps<{dashboardId:string}>{
    name?:string
}