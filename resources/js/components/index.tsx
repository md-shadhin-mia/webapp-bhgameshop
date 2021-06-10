import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboard from './adminDashboard';
import Home from './home';
import Navbar from './navbar';

if (document.getElementById('react-home')) {
    ReactDOM.render(<Home/>, document.getElementById('react-home'));
}
if (document.getElementById('react-admin-dashboard')) {
    ReactDOM.render(<AdminDashboard />, document.getElementById('react-admin-dashboard'));
}
if (document.getElementById('react-head')) {
    ReactDOM.render(<Navbar />, document.getElementById('react-head'));
}