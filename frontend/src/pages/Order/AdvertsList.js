import React from "react";
import {connect} from "react-redux";
import AdvertsListComponent from "../../components/Form/advertList/AdvertsListComponent";

class AdvertsList extends React.Component {
    render() {
        return (
            <AdvertsListComponent/>
        )
    }
}


export default connect()(AdvertsList);