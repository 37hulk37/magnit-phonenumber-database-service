import React from "react";
import {showAlert} from "../scripts/util.js";
import {addLogOutListener, postData} from "../scripts/api.js";
import {Navigate} from "react-router-dom";
import DepartmentSelect from "../Components/departmentSelect";
import RoleSelect from "../Components/roleSelect";
import {Button, Form, Input, message, Typography} from "antd";

//TODO: уведомление о добавлении пользователей

class CreateEmployee extends React.Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            addButtonActive: true,

        }

        addLogOutListener(this);
        this.addButtonChange = this.addButtonChange.bind(this);
    }


    render() {

        if(this.props.authed === false || this.props.authed === 'false'  || this.props.user.role === 'USER'){
            return <Navigate replace to="/" />;
        }

        return (
            <main>
                <Typography.Title>Добавить нового сотрудника</Typography.Title>
                <Form
                    layout="horizontal"
                    onFinish={this.addButtonChange}
                    autoComplete="off"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 'auto',
                    }}
                    ref={this.formRef}
                >
                    <Form.Item
                        name="department"
                        label="Отделение"
                        rules={
                            [
                                { required: true, message: 'Выберите отдел' },
                            ]
                        }>
                        <DepartmentSelect name="department" id="department" ref={(el) => this.department = el}/>
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Фамилия"
                        rules={
                            [
                                { required: true, message: 'Введите Фамилию' },
                                { min: 2, message: 'Введите Фамилию'}
                            ]
                        }>
                        <Input type="text" name="surname" id="surname"/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={
                            [
                                { required: true, message: 'Введите Имя' },
                                { min: 2, message: 'Введите Имя'}
                            ]
                        }>
                        <Input type="text" name="name" id="name"/>
                    </Form.Item>
                    <Form.Item
                        name="phonenumber"
                        label="Телефон"
                        rules={
                            [
                                { required: true, message: 'Введите Номер телефона' },
                                { pattern: /^(\+?[78]{1,1}[0-9]{10,10})$/i, message: 'Введите корректный номер телефона'}
                            ]
                        }>
                        <Input type="tel" name="phonenumber" id="phonenumber" placeholder="8**********"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={
                            [
                                { required: true, message: 'Введите почту' },
                                {pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                    message: 'Невалидная почта'}
                            ]
                        }>
                        <Input type="email" name="email" id="email" placeholder="example@mail.ru"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Начальный пароль"
                        initialValue="Magn1t!"
                        rules = {
                            [
                                {required: true, message: "Пароль не может быть пустым"},
                                { pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$/i,
                                    message: 'Введите пароль длиной от 6 до 16 символов, состоящий из английских заглавных и строчных букв, цифр и специальных знаков'}
                            ]
                        }>
                        <Input type="text" name="password" id="password"/>
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Роль"
                        rules={
                            [
                                { required: true, message: 'Выберите роль' },
                            ]
                        }
                        initialValue="USER">
                        <RoleSelect name="role" id="role"/>
                    </Form.Item>
                    <div className="buttons">
                        <Button type="primary" htmlType="submit">Добавить работника</Button>
                    </div>
                </Form>
            </main>
        )
    }

    addButtonChange(values) {
        console.log(values)
        if(this.state.addButtonActive){
            this.setState({addButtonActive: false});
            const sendBody = {...values};

            console.log(sendBody)

            postData(
                'auth/create-employee',
                sendBody,
                () => {
                    this.setState({addButtonActive: true});
                    message.success('Пользователь успешно добавлен')
                    this.formRef.current.resetFields();
                },
                (err) => {
                    this.setState({addButtonActive: true});
                    message.error('Не удалось добавить пользователя');
                }
            )
        }
    }

}

export default CreateEmployee;
