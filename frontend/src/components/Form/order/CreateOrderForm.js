import React from "react";
import './CreateOrderForm.scss';
import {connect} from "react-redux";
import {createAdvert} from "../../../store/actions/Advart/Create";
import {getCategoryList} from "../../../store/actions/Advart/getCategory";
import {withRouter} from "react-router-dom";

class CreateOrderForm extends React.Component{
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
        images: [],
        phone: null,

        nameError: true,
        descriptionError: true,
        featureError: true,
        addressError: true,
        phoneError: true,
        imagesError: true,

        nameTouched: false,
        descriptionTouched: false,
        featureTouched: false,
        addressTouched: false,
        phoneTouched: false,
        imagesTouched: false,
    };

    changeTouchecAllForms() {
        this.setState({
            nameTouched: true,
            descriptionTouched: true,
            featureTouched: true,
            addressTouched: true,
            phoneTouched: true,
            imagesTouched: true,
        });
        this.formValidChange();
    }

    validateControle(value, validate_type) {
        if (validate_type === 'images') {
            return value.length < 1;
        }
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
            && this.state.addressTouched && this.state.phoneTouched && this.state.imagesTouched
        ) {
            if (
                    !(this.state.nameError || this.state.descriptionError || this.state.featureError
                    || this.state.addressError || this.state.phoneError || this.state.imagesError
                )) {
                valid = true;
            }
        }
        this.setState({
            formValid: valid
        })
    }

    componentDidMount() {
        this.props.getCategoryList();
        this.setState({
            country: this.props.countries ? this.props.countries[0] : null,
            city: this.props.cities ? this.props.cities[0] : null,
            profile: this.props.profileId,
        });
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

    createAdvertHandler = () => {
        this.changeTouchecAllForms();
        this.setState({
            profile: this.props.profileId,
        });
        if (this.state.formValid){
            this.props.createAdvert(this.state);
            const {history} = this.props;
            history.push('/home');
        }
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

    onChangeHandlerImages = (event) => {
        const files = [];
        for (let i=0; i<event.target.files.length; i++){
            files.push(event.target.files[i])
        }
        this.setState({
            images: files,
            imagesTouched: true
        });
        this.setState({
            imagesError: this.validateControle(event.target.files, 'images')
        });
        this.formValidChange();
    };

    render(){
        return (
            <div className="CreateOrderForm">
                <div>
                    <div className="form">
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
                                <input type="text" id="name" onChange={this.onChangeHandlerName}/>
                                {
                                    this.state.nameError && this.state.nameTouched
                                        ? <span className="error_message">Введите название объявления</span>
                                        : null
                                }
                            </div>
                            <div>
                                <label htmlFor="description">Описание</label>
                                <textarea id="description" onChange={this.onChangeHandlerDescription}/>
                                {
                                    this.state.descriptionError && this.state.descriptionTouched
                                        ? <span className="error_message">Минимальная длина 20 символов</span>
                                        : null
                                }
                            </div>
                            <div>
                                <label htmlFor="feature">Характеристики</label>
                                <textarea id="feature" onChange={this.onChangeHandlerFeature}/>
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
                                <input type="text" id="address" onChange={this.onChangeHandlerAddress}/>
                                {
                                    this.state.addressError && this.state.addressTouched
                                        ? <span className="error_message">Минимальная длина 8 символов</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="params">
                            <h3>Параметры</h3>
                            <div>
                                Фотографии
                                <input type="file" multiple accept="image/jpeg,image/png,image/gif" id="images" onChange={this.onChangeHandlerImages}/>
                                {
                                    this.state.images.length === 0 && this.state.imagesTouched
                                        ? <span className="error_message">Добавьте фотографии</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="contacts">
                            <h3>Контакты</h3>
                            <div>
                                Номер телефона
                                <input type="phone" id="phone" onChange={this.onChangeHandlerPhone}/>
                                {
                                    this.state.phoneError && this.state.phoneTouched
                                        ? <span className="error_message">Введите корректный номер телефона (+79123456789)</span>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="create_advert">
                            <button onClick={this.createAdvertHandler}>
                                {/*<NavLink to="/">*/}
                                    Создать объявление
                                {/*</NavLink>*/}
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
        createAdvert: (state) => dispatch(createAdvert(state)),
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateOrderForm));
