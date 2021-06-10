import React, {Component} from 'react';
import ReactDOM from 'react-dom';
class Navbar extends Component{
    constructor(props:any){
        super(props);
    }
    render = ()=>{
        return (
            <nav className="navbar navbar-light bg-light bh-nabvar">
                <a className="navbar-brand" href="#">Navbar</a>
                <ul className="navbar nav justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="nav-link">sign in</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">sign Up</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;