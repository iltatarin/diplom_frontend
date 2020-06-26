import React from "react";
import {connect} from "react-redux";
import './Profile.scss';
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";

class Profile extends React.Component {
    render() {
        return (
            <div className="profilePage">
                <div className="menu">
                    <ProfileNavbar />
                </div>
                <div className="info">
                    <ProfileInfo />
                </div>
            </div>
        )
    }
}


export default connect()(Profile);