import React from "react";
import {connect} from "react-redux";
import SearchComponent from "../../components/Form/search/SearchComponent";

class Search extends React.Component {
    render() {
        return (
            <SearchComponent/>
        )
    }
}

export default connect()(Search);