import React from "react";
import {Form, Input} from "antd";

class inputPhonenumber extends React.Component {

    render() {
        if(this.props.hidden) {
            return (
                <div></div>
            )
        }
        return(
            <div>
                <Form.Item
                    name="phonenumber"
                    label="Новый номер"
                    initialValue={this.props.phonenumber}
                    rules = {
                        [
                            {required: true, message: "Введите номер телефона"},
                            { len: 11, message: 'Введите корректный номер телефона'}
                        ]
                    }
                >
                <Input type="tel" name="phonenumber" id="phonenumber"/>
                </Form.Item>
            </div>
    );
    }
}

export default inputPhonenumber;
