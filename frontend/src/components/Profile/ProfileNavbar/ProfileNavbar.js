import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import './ProfileNavbar.scss';
import {connect} from "react-redux";

class ProfileNavbar extends React.Component {

    render() {
        return (
            <div className="profileNavbar">
                <ul className="nav flex-column">
                    <li className="profileHeader">
                        <h3>Профиль</h3>
                    </li>
                    <li>
                        <NavLink to="/profile">Данные</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile/adverts">Мои объявления</NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}



export default withRouter(connect()(ProfileNavbar));