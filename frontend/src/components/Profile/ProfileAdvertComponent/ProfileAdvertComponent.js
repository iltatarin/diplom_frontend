import React from "react";

import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import axios from "axios";

import './ProfileAdvertComponent.scss';
import {getDate} from "../../../utils";

class ProfileAdvertComponent extends React.Component{
    state = {
        adverts: [],
        baseUrl: 'http://127.0.0.1:8000',
    };

    componentDidMount() {
        axios.get(`${this.state.baseUrl}/api/advert/adverts/?profile_id=${this.props.profileId}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    adverts: res.data['result'],
                });
            });
    }

    render(){
        return (
            <div className="profileAdvertComponent">
                <div className="row row-cols-1 row-cols-md-3">
                    {this.state.adverts.map(advert => {
                        return (
                            <div className="col mb-3" key={advert.id}>
                                <div className="card">
                                    <div className="card_media">
                                        <img className="card_img_top" src={`${this.state.baseUrl}${advert.images[0]['original']}`} alt="image_photo"/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title"><NavLink to={`/profile/adverts/${advert.id}`}>{advert.name}</NavLink></h5>
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
        profileId: state.auth.profileId,
    }
}

export default connect(mapStateToProps)(ProfileAdvertComponent);
