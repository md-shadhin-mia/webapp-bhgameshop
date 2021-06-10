import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminMain from './adminMain';
import Sidebar from './sidebar';
class AdminDashboard extends Component{
    constructor(props:any){
        super(props);
    }
    render = ()=>{
        // let match  = useRouteMatch();
        return (
            <div className="container-fluid">
                <Router>
                    <Switch>
                        <Route path="/admin-dashboard">
                            <Sidebar />
                            
                            <div className="main">
                                <Route exact path="/admin-dashboard">
                                    <AdminMain />
                                </Route>
                                <Route path="/admin-dashboard/:dashboardId">
                                    <AdminMain name="shadin"/>
                                </Route>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default AdminDashboard;