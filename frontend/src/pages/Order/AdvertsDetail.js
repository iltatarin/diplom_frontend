import React from "react";
import {connect} from "react-redux";
import AdvertsDetailComponent from "../../components/Form/advertDetail/AdvertsDetailComponent";
import {withRouter} from "react-router-dom";

class AdvertsDetail extends React.Component {
    render() {
        return (
            <AdvertsDetailComponent/>
        )
    }
}


export default withRouter(connect()(AdvertsDetail));