import React from "react";
import './ProfileAdvertEdit.scss';
import {connect} from "react-redux";
import {removeAdvert, updateAdvert} from "../../store/actions/Advart/Create";
import {getCategoryList} from "../../store/actions/Advart/getCategory";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {getDate} from "../../utils";

class ProfileAdvertEdit extends React.Component{
    state = {
        formValid: false,
        name: null,
        description: null,
        feature: null,
        country: null,
        city: null,
        address: null,
        category: null,
        profile: null,
        phone: null,
        id: null,

        nameError: false,
        descriptionError: false,
        featureError: false,
        addressError: false,
        phoneError: false,

        nameTouched: true,
        descriptionTouched: true,
        featureTouched: true,
        addressTouched: true,
        phoneTouched: true,

        createdAdvert: {},
    };

    changeTouchecAllForms() {
        this.setState({
            nameTouched: true,
            descriptionTouched: true,
            featureTouched: true,
            addressTouched: true,
            phoneTouched: true,
        });
        this.formValidChange();
    }

    validateControle(value, validate_type) {
        let isValid = true;

        isValid = value.trim() !== '' && isValid;

        if (validate_type === 'phone_number') {
            isValid = /^((\+7)+([0-9]){10})$/.test(value) && isValid;
        }

        if (validate_type === 'name') {
            isValid = value.length >= 2 && isValid;
        }

        if (validate_type === 'text') {
            isValid = value.length >= 20 && isValid;
        }

        if (validate_type === 'address') {
            isValid = value.length >= 8 && isValid;
        }

        return !isValid;
    }

    formValidChange(){
        let valid = false;
        if (
            this.state.nameTouched && this.state.descriptionTouched && this.state.featureTouched
            && this.state.addressTouched && this.state.phoneTouched
        ) {
            if (
                !(this.state.nameError || this.state.descriptionError || this.state.featureError
                    || this.state.addressError || this.state.phoneError
                )) {
                valid = true;
            }
        }
        this.setState({
            formValid: valid
        })
    }

    getCreatedAdvert = () => {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/api/advert/adverts/${id}`)
            .then(res => {
                const results = res.data['result'];
                this.setState({
                    createdAdvert: {
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
                    },
                    name: results['name'],
                    description: results['description'],
                    feature: results['feature'],
                    address: results['address'],
                    phone: results['phone_number'],
                    id: id,
                    category: results['category']['id']
                });
            });
    };

    componentDidMount() {
        this.props.getCategoryList();
        this.setState({
            country: this.props.countries ? this.props.countries[0] : null,
            city: this.props.cities ? this.props.cities[0] : null,
            profile: this.props.profileId,
        });
        this.getCreatedAdvert();
    }

    onChangeHandlerName = (event) => {
        this.setState({
            name: event.target.value,
            category: this.state.category ? this.state.category : this.props.categories[0].id,
            nameTouched: true,
            nameError: this.validateControle(event.target.value, 'name'),
        });
        this.formValidChange();
    };

    onChangeHandlerDescription = (event) => {
        this.setState({
            description: event.target.value,
            descriptionTouched: true,
            descriptionError: this.validateControle(event.target.value, 'text'),
        });
        this.formValidChange();
    };

    onChangeHandlerFeature = (event) => {
        this.setState({
            feature: event.target.value,
            featureTouched: true,
            featureError: this.validateControle(event.target.value, 'text'),
        });
        this.formValidChange();
    };

    onChangeHandlerPhone = (event) => {
        this.setState({
            phone: event.target.value,
            phoneTouched: true,
            phoneError: this.validateControle(event.target.value, 'phone_number'),
        });
        this.formValidChange();
    };

    onChangeHandlerAddress = (event) => {
        this.setState({
            address: event.target.value,
            addressTouched: true,
            addressError: this.validateControle(event.target.value, 'address'),
        });
        this.formValidChange();
    };

    updateAdvertHandler = () => {
        this.changeTouchecAllForms();
        this.setState({
            profile: this.props.profileId,
        });
        if (this.state.formValid){
            this.props.updateAdvert(this.state);
            const {history} = this.props;
            history.push('/profile/');
        }
    };

    removeAdvertHandler = () => {
        this.props.removeAdvert(this.state);
        const {history} = this.props;
        history.push('/profile/');
    };

    onChangeHandlerCategory = (event) => {
        this.setState({
            category: event.target.value
        });
    };

    onChangeHandlerCountry = (event) => {
        this.setState({
            country: event.target.value
        });
    };

    onChangeHandlerCity = (event) => {
        this.setState({
            city: event.target.value
        });
    };

    render(){
        return (
            <div className="ProfileAdvertEdit">
                <div>
                    <div className="form">
                        <h4 style={{color: 'red'}}>Статус: {this.state.createdAdvert.status}</h4>
                        <div className="category">
                            <h3>Категория</h3>
                            Выберите категорию
                            <select name="category" required onChange={this.onChangeHandlerCategory}>
                                {
                                    this.props.categories.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="description">
                            <h3>Описание</h3>
                            <div>
                                Название объявления
                                <input type="text" id="name" defaultValue={this.state.createdAdvert.name} onChange={this.onChangeHandlerName}/>
                                {
                                    this.state.nameError && this.state.nameTouched
                                        ? <span className="error_message">Введите название объявления</span>
                                        : null
                                }
                            </div>
                            <div>
                                <label htmlFor="description">Описание</label>
                                <textarea id="description" defaultValue={this.state.createdAdvert.description} onChange={this.onChangeHandlerDescription}/>
                                {
                                    this.state.descriptionError && this.state.descriptionTouched
                                        ? <span className="error_message">Минимальная длина 20 символов</span>
                                        : null
                                }
                            </div>
                            <div>
                                <label htmlFor="feature">Характеристики</label>
                                <textarea id="feature" defaultValue={this.state.createdAdvert.feature} onChange={this.onChangeHandlerFeature}/>
                                {
                                    this.state.featureError && this.state.featureTouched
                                        ? <span className="error_message">Минимальная длина 20 символов</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="location">
                            <h3>Место</h3>
                            <div>
                                Страна
                                <select name="country" required onChange={this.onChangeHandlerCountry}>
                                    {this.props.countries.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                Город
                                <select name="city" className="city" required onChange={this.onChangeHandlerCity}>
                                    {this.props.cities.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="address">
                                Адрес
                                <input type="text" defaultValue={this.state.createdAdvert.address} id="address" onChange={this.onChangeHandlerAddress}/>
                                {
                                    this.state.addressError && this.state.addressTouched
                                        ? <span className="error_message">Минимальная длина 8 символов</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="contacts">
                            <h3>Контакты</h3>
                            <div>
                                Номер телефона
                                <input type="phone" id="phone" defaultValue={this.state.createdAdvert.phone_number} onChange={this.onChangeHandlerPhone}/>
                                {
                                    this.state.phoneError && this.state.phoneTouched
                                        ? <span className="error_message">Введите корректный номер телефона (+79123456789)</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="create_advert">
                            <button onClick={this.updateAdvertHandler}>
                                Сохранить изменения
                            </button>
                            <button className="removeAdvert" onClick={this.removeAdvertHandler}>
                                Удалить объявление
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        updateAdvert: (state) => dispatch(updateAdvert(state)),
        removeAdvert: (state) => dispatch(removeAdvert(state)),
        getCategoryList: () => dispatch(getCategoryList()),
    }
}


function mapStateToProps(state) {
    return {
        profileId: state.auth.profileId,
        categories: state.advert.categories,
        cities: state.advert.cities,
        countries: state.advert.countries,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileAdvertEdit));
