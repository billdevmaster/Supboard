import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-confirm-alert/src/react-confirm-alert.css";
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';

const App = () => {
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
