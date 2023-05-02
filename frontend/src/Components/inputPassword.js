import React from "react";
import {Input, Form} from "antd";
class InputPassword extends React.Component {

    render() {
        if(this.props.hidden){
            return(
                <div>
                </div>
            )
        }
        return(

            <div >
                <Form.Item
                    name="password"
                    label="Новый пароль"
                    initialValue=""
                    rules = {
                    [
                        {required: true, message: "Пароль не может быть пустым"},
                        {min: 6, type: 'string', message: "Пароль хотя бы 6 символов длиной"}
                    ]
                    }
                >
                    <Input type="password" name="password" id="password"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    label="Повторите пароль"
                    initialValue=""
                    rules = {
                        [
                            {required: true, message: "Подтвердите ваш пароль"},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]
                    }
                >
                    <Input type="password" name="confirm" id="confirm"/>
                </Form.Item>
            </div>
        );
    }


}


export default InputPassword;
