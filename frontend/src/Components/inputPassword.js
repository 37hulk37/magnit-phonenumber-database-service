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
                            { pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/i,
                                message: "Введите пароль длиной от 6 до 16 символов, состоящий из английских букв, цифр и специальных знаков"}
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
