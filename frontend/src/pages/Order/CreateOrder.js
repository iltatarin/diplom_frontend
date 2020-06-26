import React from "react";
import {connect} from "react-redux";
import CreateOrderForm from "../../components/Form/order/CreateOrderForm";

class CreateOrder extends React.Component {

    render() {
        return (
            <React.Fragment>
                <CreateOrderForm />
            </React.Fragment>
        )
    }
}


export default connect()(CreateOrder);