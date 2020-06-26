import React from "react";
import {connect} from "react-redux";
import Auth from "../../components/Form/auth/Auth";
import {withRouter} from "react-router-dom";

class Register extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Auth />
            </React.Fragment>
        )
    }
}


export default withRouter(connect()(Register));