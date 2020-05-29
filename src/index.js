import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import GenrePage from './components/GenrePage';
import InformationPage from './components/InformationPage';
import SubgenrePage from './components/SubgenrePage';
import AddNew from './components/AddNew';
import FinalPage from './components/FinalPage';
import {PAGE_1, PAGE_2, PAGE_3, PAGE_4, PAGE_5} from "./helper/const";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route path={PAGE_1} component={GenrePage} />
                <Route path={PAGE_2} component={SubgenrePage} />
                <Route path={PAGE_3} component={AddNew} />
                <Route path={PAGE_4} component={InformationPage} />
                <Route path={PAGE_5} component={FinalPage} />
                <Route path='*' >
                    <Redirect to={PAGE_1} />
                </Route>
            </Switch>
        </App>
    </Router>
    ,
    document.querySelector('#root')
);
