import React from "react";
import {connect} from "react-redux";
import './ProfileAdverts.scss';
import ProfileNavbar from "../../components/Profile/ProfileNavbar/ProfileNavbar";
import ProfileAdvertComponent from "../../components/Profile/ProfileAdvertComponent/ProfileAdvertComponent";

class ProfileAdverts extends React.Component {
    render() {
        return (
            <div className="profileAdverts">
                <div className="menu">
                    <ProfileNavbar />
                </div>
                <div className="adverts">
                    <ProfileAdvertComponent />
                </div>
            </div>
        )
    }
}


export default connect()(ProfileAdverts);