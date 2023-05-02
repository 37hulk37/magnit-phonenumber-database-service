import React from "react";
import {showAlert} from "../scripts/util.js";
import {addSetAuthListener, postData} from "../scripts/api.js";
import {Navigate} from "react-router-dom";
import DepartmentSelect from "../Components/departmentSelect";
import RoleSelect from "../Components/roleSelect";
import {Button, Form, Input} from "antd";
class CreateEmployee extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addButtonActive: true,

        }

        addSetAuthListener(this);
        this.addButtonChange = this.addButtonChange.bind(this);
    }


    render() {

        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/" />;
        }

        return (
            <main>
                <h2>Добавить нового сотрудника</h2>
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
                        maxWidth: 600,
                    }}
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
                                //{ length: 2, message: 'Введите Имя'}
                            ]
                        }>
                        <Input type="tel" name="phonenumber" id="phonenumber" placeholder="+7 (***) - *** - ** - **"/>
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
                        initialValue="basePassword"
                        rules={
                            [
                                { required: true, message: 'Введите начальный пароль' },
                                { min: 6, message: 'Слишком короткий пароль'}
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
                () => {this.setState({addButtonActive: true})},
                (err) => {
                    this.setState({addButtonActive: true});
                    showAlert(err);
                }
            )
        }
    }

}

export default CreateEmployee;
