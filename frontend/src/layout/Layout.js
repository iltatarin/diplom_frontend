import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

class Layout extends React.Component {
    render() {
        return (
            <div style={{height: '100vh'}}>
                <Navbar/>

                    { this.props.children }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Layout));