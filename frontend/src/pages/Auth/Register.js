import React from "react";
import RegisterForm from "../../components/Form/register/RegisterForm";
import {connect} from "react-redux";

class Register extends React.Component {

    render() {
        return (
            <React.Fragment>
                <RegisterForm />
            </React.Fragment>
        )
    }
}


export default connect()(Register);