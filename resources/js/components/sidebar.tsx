import React, {Component} from 'react';
import { FaCode, FaHome } from 'react-icons/fa';
import { BrowserRouter, Link, match, RouteComponentProps, useRouteMatch, withRouter } from 'react-router-dom';
import Development from './development';
import MenusItems from './menus';

interface menu{
    href:string,
    text:string,
    isActive?:boolean
}

function Menu(props:menu){
    return (
        <Link to={props.href} className="menu-link rounded d-flex align-items-center mt-2 px-3">
                <div className="link-icon p-2"><FaHome /></div>
                <div className="link-text p-2">{props.text}</div>
                <div className="link-text ml-auto pl-4">+</div>
        </Link>
        // <a href="#">
        //            <div className="link-icon p-2"><FaHome /></div>
        //              <div className="link-text p-2">{props.text}</div>
        //             <div className="link-text ml-auto pl-4">+</div>
        // </a>
    )
}

function SidebarManus(props:{text:string, menus:menu[]})
{
    return (
        <div className="d-flex flex-column">
            <div className="text-muted font-weight-bold">{props.text}</div>
            {
                props.menus.map((value:menu, index:number)=>{
                   return <Menu key={index} {...value} />
                })
            }
        </div>
    )
}


class Sidebar extends Component<urlProps, sidebarMenuState>{
    constructor(props:urlProps){
        super(props);
    }
    render = ()=>{
        let {url, path} = this.props.match;
        return (
            <nav className="sidebar shadow d-flex flex-column justify-content-between">
                <div className="sidebar-content d-flex flex-column pl-2">
                    <SidebarManus text="core" menus={
                        [
                            {href:url, text:"Dashboard"},
                            {href:`${url}/${MenusItems.order}`, text:"Orders", isActive:true}, 
                            {href:`${url}/${MenusItems.product}`, text:"Products"}
                        ]}/>
                    <SidebarManus text="users" menus={[
                        {href:`${url}/${MenusItems.clients}`, text:"Clients"}, 
                        {href:`${url}/${MenusItems.projectTeam}`, text:"Project Team"}
                        ]}/>
                    <SidebarManus text="App Views" menus={[
                        {href:`${url}/${MenusItems.pages}`, text:"Pages"},
                         {href:`${url}/${MenusItems.flows}`, text:"Flows"}
                         ]}/>
                    <SidebarManus text="Settings" menus={[
                            {href:`${url}/${MenusItems.profile}`, text:"Profile"},
                            {href:`${url}/${MenusItems.billing}`, text:"Billing"},
                            {href:`${url}/${MenusItems.security}`, text:"Security"},
                            {href:`${url}/${MenusItems.notifications}`, text:"Notifications"}
                           ]}/>
                </div>
                <div className="justify-self-end">
                        user
                </div>
                <div className="justify-self-end">
                    <Development />
                </div>
            </nav>
        )
    }
}

export default withRouter(Sidebar) ;

interface urlProps extends RouteComponentProps{

}
interface sidebarMenuState{

}