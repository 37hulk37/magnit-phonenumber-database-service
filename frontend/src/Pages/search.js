import React from "react";
import {getData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";
import Employees from "../Components/employees";
import DepartmentSelect from "../Components/departmentSelect";
import {Button, Form, Input, message, Typography} from "antd";


//TODO: Пагинация нам надо
class Search extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [

            ],
            page: {},
            formActive: true,
            currValues: {}
        }

        this.getPage = this.getPage.bind(this);
        this.changeUsers = this.changeUsers.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
    }


    render() {
        if(this.props.authed === false || this.props.authed === 'false' || this.props.user.role === 'USER'){
            return <Navigate replace to="/" />;
        }

        return (
            <main>
                <Typography.Title level={2}>Параметры поиска</Typography.Title>
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
                        maxWidth: 'auto',
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
                        label="Телефон:"
                    >
                        <Input type="tel" name="phonenumber" id="phonenumber" placeholder="8**********" />
                    </Form.Item>
                        <div className="buttons">
                            <Button type="primary" htmlType="submit" name="to-search">Найти сотрудников</Button>
                        </div>
                </Form>
                <Employees page={this.state.page} users={this.state.users}
                           onChange={this.changeUsers} getPage={this.getPage}/>
            </main>
        )
    }

    getPage(index){
        console.log('Getting page: ' + index);
        let url = this.createUrl(this.state.currValues);
        if(url === null){
            url = `?offset=${index-1}`;
        } else {
            url = `/search?offset=${index-1}&` + url;
        }
        console.log(url);
        getData(
            `home/employees${url}`,
            (data) => {
                console.log(data);
                this.setState({page: data})
                this.setState({users: data.content})
                this.setState({formActive: true});
            },
            (err) => {
                this.setState({formActive: true});
                message.error('Не удалось получить данные');
            }
        );
    }
    changeUsers(users){
        this.setState({users: users})
    }

    searchButtonClick(values){
        this.setState({currValues: values})
        if(this.createUrl(values) === null){
            getData(
                `home/employees?`,
                (data) => {
                    console.log(data);
                    this.setState({page: data})
                    this.setState({users: data.content})
                    this.setState({formActive: true});
                },
                (err) => {
                    this.setState({formActive: true});
                    message.error('Не удалось получить данные');
                }
            );
            return;
        }
        if(this.state.formActive) {
            this.setState({formActive: false});
            getData(
                `home/employees/search?${this.createUrl(values)}`,
                (data) => {
                    console.log(data);
                    this.setState({page: data})
                    this.setState({users: data.content})
                    this.setState({formActive: true});
                },
                (err) => {
                    this.setState({formActive: true});
                    message.error('Не удалось получить данные');
                }
            );
        }
    }


    createUrl(values){
        let url = '';
        let first = true;
        if(values === null || values === undefined){
            return null;
        }
        for(let key of Object.keys(values)){
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
        if(url === '') {
            return null;
        }
        return url;
    }


}

export default Search;
