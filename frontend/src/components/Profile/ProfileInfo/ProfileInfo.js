import React from "react";
import {withRouter} from "react-router-dom";
import './ProfileInfo.scss';
import {connect} from "react-redux";

class ProfileInfo extends React.Component {

    render() {
        return (
            <div className="ProfileInfo">
                <h3>Информация о профиле</h3>
                <div>
                    <p>Имя: {this.props.profileFirstName}</p>
                    <p>Фамилия: {this.props.profileLastName}</p>
                    <p>Email: {this.props.userEmail}</p>
                    <p>Номер телефона: {this.props.profilePhoneNumber}</p>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        userEmail: state.auth.userEmail,
        profilePhoneNumber: state.auth.profilePhoneNumber,
        profileFirstName: state.auth.profileFirstName,
        profileLastName: state.auth.profileLastName,
    }
}


export default withRouter(connect(mapStateToProps)(ProfileInfo));