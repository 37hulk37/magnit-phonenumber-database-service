import React from "react";
import {getData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";
import Employees from "../Components/employees";
import DepartmentSelect from "../Components/departmentSelect";
import {Button, Form, Input, message} from "antd";


//TODO: Пагинация нам надо
class Search extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [

            ],

            formActive: true
        }


        this.searchButtonClick = this.searchButtonClick.bind(this);
    }


    render() {
        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/" />;
        }

        return (
            <main>
                <h2>Параметры поиска</h2>
                <Form
                    layout="horizontal"
                    onFinish={this.searchButtonClick}
                    id="searchForm"
                    ref={(el) => this.searchForm = el}
                    autoComplete="off"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}>
                    <Form.Item
                        name="department"
                        label="Отделение"
                    >
                        <DepartmentSelect name="department" id="department" ref={(el) => this.department = el}/>
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Фамилия"
                        >
                        <Input type="text" name="surname" id="surname" />

                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Имя"
                    >
                        <Input type="text" name="name" id="name" />
                    </Form.Item>

                    <Form.Item
                        name="phonenumber"
                        label="Номер телефона:"
                    >
                        <Input type="tel" name="phonenumber" id="phonenumber" placeholder="+7 (***) - *** - ** - **" />
                    </Form.Item>
                        <div className="buttons">
                            <Button type="primary" htmlType="submit" name="to-search">Найти сотрудников</Button>
                        </div>
                </Form>
                <Employees users={this.state.users}/>
            </main>
        )
    }

    searchButtonClick(values){
        if(this.createUrl(values) === null){
            message.error('Введите хотя бы один параметр поиска');
            return;
        }
        if(this.state.formActive) {
            this.setState({formActive: false});
            getData(
                `home/employees${this.createUrl(values)}`,
                (data) => {
                    console.log(data);
                    this.setState({users: data.content})
                    this.setState({formActive: true});
                },
                (err) => {
                    this.setState({formActive: true});
                    message.error(err);
                }
            );
        }
    }


    createUrl(values){
        let url = '/search?';
        let first = true;
        if(values === null || values === undefined){
            return null;
        }
        for(let key of Object.keys(values)){
            console.log(key);
            if(typeof values[key] === 'undefined' || values[key] === ''){
                continue;
            }
            if(values[key] !== ''){
                if(!first){
                    url += '&';
                } else {
                    first = false;
                }
                url += `${key}=${values[key]}`;
            }
        }
        if(url === '/search?') {
            return null;
        }
        return url;
    }


}

export default Search;
