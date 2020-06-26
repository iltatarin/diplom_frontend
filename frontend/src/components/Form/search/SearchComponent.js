import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import './SearchComponent.scss';
import {getSearchedAdverts} from "../../../store/actions/Advart/Search";
import {getDate} from "../../../utils";

class SearchComponent extends React.Component {
    state = {
        baseUrl: 'http://127.0.0.1:8000',
    };

    render() {
        console.log('SearchComponent: ', this.props.adverts);
        return (
            <div className="searchedAdverts">
                <div className="row row-cols-1 row-cols-md-5">
                    {this.props.adverts.map((advert, index) => {
                        return (
                            <div className="col mb-3" key={advert.id}>
                                <div className="card">
                                    <div className="card_media">
                                        <img className="card_img_top" src={`${this.state.baseUrl}${advert.images[0]['original']}`} alt="image_photo"/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title"><NavLink to={`/adverts/${advert.id}`}>{advert.name}</NavLink></h5>
                                        <p className="card-text">{advert.city}</p>
                                        <p className="card-text">{getDate(advert.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        search: state.advert.search,
        params: state.advert.params,
        adverts: state.advert.adverts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSearchedAdverts: (state) => dispatch(getSearchedAdverts(state))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchComponent));
