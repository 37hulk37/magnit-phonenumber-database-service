import React from "react";
import {putData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";
import InputPassword from "../Components/inputPassword";
import InputPhonenumber from "../Components/inputPhonenumber";
import {Button, Form, message, Space, Typography} from "antd";
const { Text, Link, Title } = Typography;
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
            <main style={{
                justifyContent: "center",
                display: "flex"
            }}>
                <Space direction="vertical"
                       style={{
                           width: 400
                       }}>
                    <Title level={2}>Данные сотрудника</Title>
                    <span><img alt="Фото"></img></span>

                    <Title level={3}>Сотрудник</Title>
                    <Text>Фамилия: {this.props.user.surname}</Text>
                    <Text>Имя:     {'     '+this.props.user.name}</Text>
                    <Text>Отдел:   {this.props.user.department}</Text>
                    <Title level={3}>Контактные данные</Title>
                    <Text>Почта:   {this.props.user.email}</Text>
                    <Text>Телефон: {this.props.user.phonenumber}</Text>
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
                        }}
                    >
                        <Space direction={"horizontal"} className="buttons">
                            <Button id="changeNumber" disabled={!this.state.changeNumberActive}
                                    onClick={this.changeNumberClick}>Изменить номер телефона</Button>
                            <Button id="changePassword" disabled={!this.state.changePasswordActive}
                                    onClick={this.changePasswordClick}>Изменить пароль</Button>
                        </Space>

                        <InputPhonenumber type="tel" name="phonenumber" id="phonenumber" hidden={!this.state.numberActive}
                                          phonenumber={this.props.user.phonenumber} />

                        <InputPassword hidden={!this.state.passwordActive} />

                        <Space direction={"horizontal"} className="buttons">
                            <Button type="primary" htmlType="submit" id="sendButton"
                                    disabled={!this.state.sendButtonActive}>Сохранить изменения</Button>
                            <Button type="primary" htmlType="button" id="cancelButton"
                                    disabled={!this.state.sendButtonActive}
                                    onClick={this.cancelButtonClick}>Отменить изменения</Button>

                        </Space>
                    </Form>
                </Space>
            </main>
        )}

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.form.resetFields();
    }

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
        let userData = {...this.props.user};
        let changedData;

        if(values.password !== '' && typeof values.password !== 'undefined'){
            userData.password = values.password;
            changedData = values.password;
        }

        if(values.phonenumber !== '' && typeof values.phonenumber !== 'undefined'){
            userData.phonenumber = values.phonenumber;
            changedData = values.phonenumber;
        }
        putData(
            'home/employees',
            {
                id: this.props.user.id,
                state: changedData
            },
            () => {
                this.props.onChange(userData);
                message.success('Данные успешно изменены');
                this.afterSend();
            },
            (err) => {
                this.props.onChange(this.props.user);
                message.error('Не удалось отправить данные');
                this.afterSend();
            }
        )
    }

    afterSend() {
        this.setState({passwordActive: false})
        this.setState({numberActive: false});
        this.setState({changeNumberActive: true});
        this.setState({changePasswordActive: true});
        this.setState({sendButtonActive: false});
        this.form.resetFields();
    }

}

export default Lk;
