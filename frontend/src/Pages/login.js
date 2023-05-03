import React from "react";
import {getAuth, logIn, setAuth, setToken} from "../scripts/api.js";
import {withRouter} from "../Components/withRouter";
import {showAlert} from "../scripts/util";
import {Button, Form, Input, message} from "antd";
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formIsActive: true,
        }
        this.loginButtonClick = this.loginButtonClick.bind(this);
    }

    componentDidMount() {
        if(typeof getAuth() === "undefined")
            setAuth(false);
    }

    render() {


        return(
            <main>
                <Form
                    layout="horizontal"
                    onFinish={this.loginButtonClick}
                    autoComplete="off"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={
                        [
                            {
                                required: true,
                                message: 'Введите почту'
                            },
                            {
                                pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                message: 'Невалидная почта'
                            }
                        ]
                        }
                    >
                     <Input type="text" name="email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Введите пароль'
                                }
                            ]
                        }
                    >
                        <Input type="password" name="password"/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="submit" type="primary" value="Sign In" className="submit-button">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        );
    }

    loginButtonClick(values) {
        if(this.state.formIsActive) {

            console.log('submitted');
            this.setState({formIsActive: false});
            console.log(values.email);
            console.log(values.password);
            logIn(
                values.email,
                values.password,
                (data) => {
                    if(data.code === 'ACCEPTED') {
                        this.props.navigate('/lk');
                        setAuth(true);
                        setToken(data.token);
                        let user = {...data.user, password: values.password}
                        this.props.onAuth(user);
                    } else {
                        console.log(data);
                        showAlert('Неверный адрес почты или пароль');
                    }
                    this.setState({formIsActive: true});
                },
            (err) => {
                    message.error('Вход не удался');
                    this.setState({formIsActive: true});
            });
        }
    }

}



export default withRouter(Login);
