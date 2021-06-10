import React from "react";
import { Component } from "react";
import { FaCode, FaFileExcel, FaHome, FaPenAlt, FaPencilAlt, FaRecycle, FaTimes, FaTrashAlt } from "react-icons/fa";
import axios from "axios"
import SelectIcon from "./selectIcon";
import getIcon from "./IconsGen";
import OnLoading from "./onLoading";

interface MenuEditorProps{
    ended : ()=>void,
}
interface MenuEditorState{
    menuData:{name:string, icon:string, catagory:string}
}
class MenuEditor extends Component<MenuEditorProps, MenuEditorState>{
    constructor(props:MenuEditorProps){
        super(props);
        this.state={
            menuData:{name:"", icon:"", catagory:""}
        }
    }
    saveing()
    {
        axios.post("/api/admin-dashboard-menus", {slug:"hello_world", name:"name"})
        .then(res=>{
            console.log(res.data);
        })
    }
    render(){
        return (
            <div className="d-flex flex-column">
                <div className="d-flex border border-primary p-2">
                    <SelectIcon onSelectChage={(iconid)=>{}}/>
                    <input type="text" name="title" id="title" className="form-control mx-2 bg-dark text-light" placeholder={"Name Ex. \"Dashboard\" "} style={{border:"none"}} autoComplete="off"/>
                    <input type="text" name="Catagory" id="catagory" className="form-control mx-2 bg-dark text-light" placeholder={"Catagory Ex. \"Settings\" "} style={{border:"none"}}/>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={this.props.ended}>Cancel</button>
                    <button className="btn btn-primary ml-2" onClick={this.saveing}>Save</button>
                </div>
            </div>
        );
    }
}

enum editorStatus{None, New, Edit}
interface DevAdminDashboardMenusState{
    editor:editorStatus,
    menusItems: Array<MenuItem>;
    menuLoaded : boolean;
}
interface DevAdminDashboardMenusProps{

}
interface MenuItem{
    id:string,
    name : string,
    icon: string,
    slug: string,
    updated: Date
}
interface facingData{
    id: string
    label: string,
    slug: string,
    icon: string,
    created_at: string,
    updated_at: string,
}
class DevAdminDashboardMenus extends Component<DevAdminDashboardMenusProps, DevAdminDashboardMenusState>
{
    constructor(props:DevAdminDashboardMenusProps){
        super(props)
        this.state ={
            editor:editorStatus.None,
            menusItems: new Array<MenuItem>(),
            menuLoaded: false
        }
    }
    componentDidMount(){
        axios.get<Array<facingData>>("/api/admin-dashboard-menus")
        .then((value)=>{
            let menus = new Array<MenuItem>();
            value.data.forEach(data=>{
                menus.push({
                        id:data.id ,icon:data.icon, name:data.label, slug:data.slug, updated: new Date(data.updated_at)
                    })
            })
            this.setState({menusItems:menus, menuLoaded:true});
        })
    }
    render(){
        const editorMode = this.state.editor;
        const {menuLoaded} = this.state;
        return <div className="container-fluid bg-dark">
            {
            menuLoaded? 
            <><h2 className="m-2">Admin Dashboard Menus</h2><div className="d-flex flex-column my-2">
                        {this.state.menusItems.map((value, index) => {
                            return (
                                <div className="d-flex border border-primary" key={index}>
                                    <div className="icon p-2">
                                        {getIcon(value.icon)}
                                    </div>
                                    <div className="px-4 py-2">
                                        {value.name}
                                    </div>
                                    <div className="d-flex ml-auto">
                                        <button className="btn btn-dark text-warning p-2" onClick={() => {
                                            if (editorMode == editorStatus.None)
                                                this.setState({ editor: editorStatus.Edit });
                                        } }>
                                            <FaPencilAlt />
                                        </button>
                                        <button className="btn btn-dark text-danger p-2" title="Delete">
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "25vh" }}>
                            {editorMode == editorStatus.None ?
                                <button className="btn btn-primary px-4"
                                    onClick={() => {
                                        if (editorMode == editorStatus.None)
                                            this.setState({ editor: editorStatus.New });
                                    } }>
                                    create a new Menu
                                </button> :
                                editorMode == editorStatus.Edit ?
                                    <h1 className="text-warning">Edit</h1> :
                                    <MenuEditor ended={()=>{this.setState({editor:editorStatus.None})}}/>}
                        </div></>
            :<div className="d-flex justify-content-center align-items-center">
                <OnLoading />
            </div>
            }
        </div>
    }
}


class DevControls extends Component{
    render(){
       return <div className="d-flex flex-column align-items-center">
           <DevAdminDashboardMenus />
       </div>
    }
}

interface devState{
    devOpen:boolean
}
class Development extends Component<{}, devState>{
    constructor(props:{}){
        super(props);
        this.state={
            devOpen:false //it work in development it chage to false
        }
    }
    render(){
        const devOpen = this.state.devOpen;
        return(
            <>
            {devOpen?<div className="devpage text-light container-fluid">
                <DevControls />
            </div>:""}
                <div className="d-flex p-2 align-items-center font-weight-bold" style={devOpen?{zIndex:1025, backgroundColor:"#ffffff88", position:"absolute", bottom:"16px", left:"4px"}:{}} onClick={() => {
                    if (!devOpen)
                        this.setState({ devOpen: true });
                } }>
                    <div className="icon p-2 text-success">
                        <FaCode />
                    </div>
                    <div className="text pr-4">
                                                Devepment
                    </div>
                    {devOpen ?
                        <div className="close ml-4 p-2" onClick={() => { this.setState({ devOpen: false }); } }>
                            <FaTimes />
                        </div> : ""}
                </div></>
    )

    }
}

export default Development;