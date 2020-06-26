import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import './Navbar.scss';
import {connect} from "react-redux";
import {getSearchedAdverts, setSearch} from "../../store/actions/Advart/Search";

class Navbar extends React.Component {

    onSearchHandler = (event) => {
        this.props.setSearch({
            search: event.target.value,
            params: {
                categories: '',
                city: '',
                country: ''
            }
        });
    };
    searchClickHandler = () => {
        this.props.getSearchedAdverts({
            search: this.props.search,
            params: this.props.params
        });
        const {history} = this.props;
        history.push('/search');
    };

    render() {
        let links = null;
        if (this.props.isAuthenticated) {
            links = (
                <React.Fragment>
                    <li>
                        <NavLink className="nav-link" to="/order">Создать объявление <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/adverts">Объявления <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/profile">
                            Профиль <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/logout">Выйти <span className="sr-only">(current)</span></NavLink>
                    </li>
                </React.Fragment>
            )
        } else {
            links = (
                <React.Fragment>
                    <li >
                        <NavLink className="nav-link" to="/register">Регистрация <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li >
                        <NavLink className="nav-link" to="/auth">Войти</NavLink>
                    </li>
                </React.Fragment>
            )
        }

        return (
            <div className="Navbar">
                <nav>
                    <div id="navbarTogglerDemo01">
                        <ul>
                            <li>
                                <NavLink className="nav-link" exact={true} to="/">Главная <span
                                    className="sr-only">(current)</span></NavLink>
                            </li>
                            {links}
                        </ul>
                        <div>
                            <input type="search" onChange={this.onSearchHandler} placeholder="Поиск" aria-label="Search"/>
                            <button onClick={this.searchClickHandler}>
                                Поиск
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        search: state.advert.search,
        params: state.advert.params
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSearch: (state) => dispatch(setSearch(state)),
        getSearchedAdverts: (state) => dispatch(getSearchedAdverts(state))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));