import React, {Component} from "react";
import './AdvertsDetailComponent.scss';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {getDate} from "../../../utils";

class AdvertsDetailComponent extends Component {
    state = {
        advert: {},
        address: '',
        category: {},
        city: '',
        country: '',
        createDate: '',
        description: '',
        feature: '',
        images: [],
        name: '',
        profile: {},
        phone_number: '',
        status: '',
        hidePhone: true,
        baseUrl: 'http://127.0.0.1:8000',
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/api/advert/adverts/${id}`)
            .then(res => {
                const results = res.data['result'];
                this.setState({
                    advert: results,
                    address: results['address'],
                    category: results['category'],
                    city: results['city'],
                    country: results['country'],
                    createDate: getDate(results['created_at']),
                    description: results['description'],
                    feature: results['feature'],
                    images: results['images'],
                    name: results['name'],
                    phone_number: results['phone_number'],
                    profile: results['profile'],
                    status: results['status'],
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="container_content">
                    <div className="advertHeader">
                        <h4 className="category">Категория: {this.state.category.name}</h4>
                        <h3 className="name">{this.state.name}</h3>
                        <p className="date">{this.state.createDate}</p>
                    </div>
                    <div className="advertContent">
                        <div className="row_carousel">
                                <div id="my-slider" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        {
                                            this.state.images.map((_, index) => {
                                                if (index === 0) {
                                                    return (
                                                        <li data-target="#my-slider" key={`li${index}`} data-slide-to={`${index}`} className="active"></li>
                                                    )
                                                } else {
                                                    return (
                                                        <li data-target="#my-slider" key={`li${index}`} data-slide-to={`${index}`}></li>
                                                    )
                                                }
                                            })
                                        }
                                    </ol>
                                    <div className="carousel-inner">
                                        {this.state.images.map((item, index) => {
                                            if (index === 0) {
                                                return (
                                                    <div key={`div${index}`} className="carousel-item active">
                                                        <img src={`${this.state.baseUrl}${item['original']}`} alt={index}/>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={`div${index}`} className="carousel-item" id={index}>
                                                        <img src={`${this.state.baseUrl}${item['original']}`} alt={index}/>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    <a className="carousel-control-prev" href={"#my-slider"} role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href={"#my-slider"} role="button" data-slide="next">
                                        <span className={"carousel-control-next-icon"} aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                        </div>
                        <div className="advert_profile">
                            <h5 className="status">Статус: {this.state.status}</h5>
                            <h4 className="profileName">{this.state.profile.first_name}</h4>
                            {
                                this.state.hidePhone
                                ? <button onClick={() => {this.setState({hidePhone: false})}}><h4>Показать телефон +79ХХХХХХХХХ</h4></button>
                                : <button className="activated"><h3>{this.state.phone_number}</h3></button>
                            }
                            <div className="locationBlock">
                                <h5 className="location">Страна: {this.state.country}</h5>
                                <h5 className="location">Город: {this.state.city}</h5>
                                <h5 className="location">Адрес: {this.state.address}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="descriptionBlock">
                        <div className="description">
                            <h4>Описание</h4>
                            <p>{this.state.description}</p>
                        </div>
                        <div className="feature">
                            <h4>Характеристики</h4>
                            <p>{this.state.feature}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(AdvertsDetailComponent));
