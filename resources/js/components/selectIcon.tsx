import React, { PureComponent, Suspense } from "react";
import { Component } from "react";
import { FaHome } from "react-icons/fa";
import getIcon, { iconIds } from "./IconsGen";
interface SelectIconProps{
    onSelectChage: (iconId:string)=>void
}
enum icosBoxMode{open, close}
interface SelectIconState {
    iconsBox:icosBoxMode,
    renderComplite:boolean,
    icons:JSX.Element,
    iconsLoaded: boolean,
    conterIcon:number,
    selectedIconId: string,
    filterStr:string,
}
class SelectIcon extends Component<SelectIconProps, SelectIconState>{
    
    constructor(props:SelectIconProps){
        super(props)
        this.state ={
            iconsLoaded:false,
            iconsBox:icosBoxMode.close,
            renderComplite: false,
            icons:<></>,
            conterIcon:100,
            selectedIconId:"FaHome",
            filterStr:""
        }
        // this.iconBoxOpen = this.iconBoxOpen.bind(this);
        // this.iconBoxClose = this.iconBoxClose.bind(this);
        this.outerClickCloser = this.outerClickCloser.bind(this);
    }
    renderComplite(){
        this.setState({renderComplite:true})
    }
    shouldComponentUpdate(nextProps: Readonly<SelectIconProps>, nextState: Readonly<SelectIconState>){
        if(this.state.icons != nextState.icons){
            return true;
        }
        else if(this.state.iconsBox != nextState.iconsBox)
        {
            return true;
        }else if(this.state.iconsLoaded != nextState.iconsLoaded){
            return true
        }else if(this.state.conterIcon != nextState.conterIcon){
            return true
        }else if(this.state.selectedIconId != nextState.selectedIconId){
            return true
        }else if(this.state.filterStr != nextState.filterStr){
            return true
        }
        else{
            return false;
        }
    }
    render(){
        const {iconsBox, conterIcon, iconsLoaded, selectedIconId, filterStr} = this.state;
        const allIconsId  = iconIds();
        const filteredId = filterStr==""?allIconsId.slice(0, conterIcon):
                            allIconsId.filter((value, index)=>{
                                let finded = true;
                                let strFilters = filterStr.toLocaleLowerCase().split(" ");
                                strFilters.forEach((v, i)=>{
                                    finded &&= value.toLocaleLowerCase().indexOf(v) != -1
                                });
                                return finded;
                            }).slice(0, conterIcon);
        return (
            <div className="selector" id="iconsSelector">
                <div className="options btn btn-dark p-2" onClick={()=>{
                                    if (iconsBox==icosBoxMode.close)
                                        this.iconBoxOpen()
                                    else this.iconBoxClose()
                                    return false
                                }}>
                        {getIcon(selectedIconId)}
                    </div>
                    {
                    <div className={"icons-box position-absolute bg-dark text-light border border-primary p-1"+(iconsBox==icosBoxMode.open?"":" d-none")} style={{
                            maxWidth: "26vw",
                            overflow:"none"
                    }}>
                        <div className={"d-flex w-100"}>
                            <input  type="search" name="iconsfind" id="iconsfind" 
                                    className="form-control mb-2 text-light" 
                                    style={{backgroundColor:"transparent", border:"none", borderBottom:"1px solid var(--primary)"}} 
                                    placeholder="Search for Icons"
                                    onInput={(ev)=>this.setState({filterStr:(ev.target as HTMLInputElement).value})}
                            />
                        </div>
                        <div className={"scrollbar-none"} style={{
                                overflow: "auto",
                                display:"grid",
                                maxHeight:"25vh",
                                gridTemplateColumns:"repeat(auto-fill, minmax(35px, 1fr))"
                            }}
                            onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>)=>{
                                if((event.target as HTMLDivElement).scrollTop + (event.target as HTMLDivElement).offsetHeight >= (event.target as HTMLDivElement).scrollHeight-5)
                                    {
                                        
                                        if(allIconsId.length >= this.state.conterIcon)
                                        {
                                            this.setState({conterIcon:conterIcon+100})
                                        }else{
                                            this.setState({iconsLoaded:true});
                                        }
                                    }
                            }}>
                                {
                                        filteredId.map((value, index)=>{
                                            return <button className="btn btn-dark p-2" key={index} onClick={()=>{
                                                this.setState({selectedIconId:value})
                                                this.props.onSelectChage(value);
                                                this.iconBoxClose()
                                            }}>
                                                {getIcon(value)}
                                            </button>
                                        })
                                        
                                }
                            <div className={"justify-content-center align-items-center"+(iconsLoaded?" d-none":"d-flex")} style={{height:24, width:24}}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                </div>
                }
            </div>
        )
    }
    outerClickCloser(event:UIEvent){
        if(!(event.target as Element).closest(".selector#iconsSelector") && this.state.iconsBox == icosBoxMode.open)
        {
            this.iconBoxClose();
        }
    }
    iconBoxOpen() {
        document.addEventListener("click",this.outerClickCloser);
        this.setState({iconsBox:icosBoxMode.open});
    }
    iconBoxClose() {
        this.setState({iconsBox:icosBoxMode.close});
        document.removeEventListener("click", this.outerClickCloser);
    }
}

export default SelectIcon;