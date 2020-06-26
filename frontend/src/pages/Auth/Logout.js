import React from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions/Auth";
import App from "../../App";
import {Redirect} from "react-router";

class Logout extends React.Component {
    logoutHandler = () => {
        this.props.logout();
        const {history} = this.props;
        history.push('/');
        return <App/>
    };

    render() {

        this.logoutHandler();

        return <Redirect to="/auth"/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);