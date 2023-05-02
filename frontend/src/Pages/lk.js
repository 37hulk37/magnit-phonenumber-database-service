import React from "react";
import {putData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";
import InputPassword from "../Components/inputPassword";
import InputPhonenumber from "../Components/inputPhonenumber";
import {Button, Form, message} from "antd";

class Lk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeNumberActive: true,
            sendButtonActive: false,
            changePasswordActive: true,
            numberActive: false,
            passwordActive: false,
        }

        this.sendButtonClick = this.sendButtonClick.bind(this);
        this.changeNumberClick = this.changeNumberClick.bind(this);
        this.changePasswordClick = this.changePasswordClick.bind(this);
        this.cancelButtonClick = this.cancelButtonClick.bind(this);

   }

    render() {
        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/" />;
        }

        return(
            <main>

                    <h2>Данные сотрудника</h2>
                <span>
                    <img alt="Фото"></img>
                </span><br/>
                <h3>Сотрудник</h3>
                <span>{this.props.user.surname}</span><br/>
                <span>{this.props.user.name}</span><br/>
                <h3>Контактные данные</h3>
                <span>{this.props.user.email}</span><br/>
                <span>{this.props.user.phonenumber}</span><br/>
                <h3>Отделение</h3>
                <span>{this.props.user.department}</span><br/>
                <Form
                    id="form"
                    ref={(el) => this.form = el}
                    layout="horizontal"
                    onFinish={this.sendButtonClick}
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
                    <div className="buttons">
                        <Button id="changeNumber" disabled={!this.state.changeNumberActive}
                                onClick={this.changeNumberClick}>Изменить номер телефона</Button>
                        <Button id="changePassword" disabled={!this.state.changePasswordActive}
                                onClick={this.changePasswordClick}>Изменить пароль</Button>
                    </div>

                    <InputPhonenumber type="tel" name="phonenumber" id="phonenumber" hidden={!this.state.numberActive}
                                      phonenumber={this.props.user.phonenumber} />

                    <InputPassword hidden={!this.state.passwordActive} />

                    <div className="buttons">
                        <Button type="primary" htmlType="submit" id="sendButton"
                                disabled={!this.state.sendButtonActive}>Сохранить изменения</Button>
                        <Button type="primary" htmlType="button" id="cancelButton"
                                disabled={!this.state.sendButtonActive}
                                onClick={this.cancelButtonClick}>Отменить изменения</Button>

                    </div>
                </Form>
            </main>
    )}

    cancelButtonClick(event) {
        this.form.resetFields();
        this.afterSend();
    }
    changePasswordClick(event) {
        this.setState({passwordActive: true});
        this.setState({sendButtonActive: true});
        this.setState({changeNumberActive: false});
        this.setState({changePasswordActive: false});
    }

    changeNumberClick(event) {
        this.setState({numberActive: true});
        this.setState({sendButtonActive: true});
        this.setState({changeNumberActive: false});
        this.setState({changePasswordActive: false});

    }

    sendButtonClick(values) {
        this.setState({sendButtonActive: false});
        let sendBody = {...this.props.user};

        if(values.password !== '' && typeof values.password !== 'undefined'){
            sendBody.password = values.password;
        }

        if(values.phonenumber !== '' && typeof values.phonenumber !== 'undefined'){
            sendBody.phonenumber = values.phonenumber;
        }
        putData(
            'home/employees',
            sendBody,
            () => {
                this.afterSend();
                this.props.onChange(sendBody);
                message.success('Данные успешно изменены')
            },
            (err) => {
                this.afterSend();
                this.props.onChange(this.props.user);
                message.error(err);
            }
        )
    }

    afterSend() {
        this.setState({passwordActive: false})
        this.setState({numberActive: false});
        this.setState({changeNumberActive: true});
        this.setState({changePasswordActive: true});
        this.setState({sendButtonActive: false});
    }

}

export default Lk;
