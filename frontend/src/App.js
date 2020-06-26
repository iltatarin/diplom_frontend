import React from 'react';

import {connect} from "react-redux";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import {autoLogin} from "./store/actions/Auth";
import Layout from './layout/Layout';
import Register from "./pages/Auth/Register";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Logout from "./pages/Auth/Logout";
import CreateOrder from "./pages/Order/CreateOrder";
import AdvertsList from "./pages/Order/AdvertsList";
import AdvertsDetail from "./pages/Order/AdvertsDetail";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import ProfileAdverts from "./pages/ProfileAdverts/ProfileAdverts";
import ProfileAdvertEdit from "./pages/ProfileAdvertEdit/ProfileAdvertEdit";

class App extends React.Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/register" component={Register}/>
                <Route path="/search" exact component={Search}/>
                <Route path="/" exact component={Home}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/logout" exact component={Logout}/>
                    <Route path="/order" exact component={CreateOrder}/>
                    <Route path="/adverts/:id" component={AdvertsDetail}/>
                    <Route path="/adverts" exact component={AdvertsList}/>
                    <Route path="/search" exact component={Search}/>
                    <Route path="/profile/adverts/:id" exact component={ProfileAdvertEdit}/>
                    <Route path="/profile/adverts" exact component={ProfileAdverts}/>
                    <Route path="/profile" exact component={Profile}/>
                    <Route path="/" exact component={Home}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
            <Layout>
                {routes}
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
