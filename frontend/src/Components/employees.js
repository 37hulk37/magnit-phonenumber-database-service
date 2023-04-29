import React from "react";
import {Table} from "antd";

class Tr extends React.Component{
    user = this.props.user;

    render() {
        return(
            <tr>
                <th>{this.user.surname}</th>
                <th>{this.user.name}</th>
                <th>{this.user.department}</th>
                <th>{this.user.phonenumber}</th>
            </tr>
        )
    }
}

class Employees extends React.Component{
    columns = [
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отделение',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
    ];

    render() {
        return(
            <div>
                <h2>Полученные данные</h2>
                {/*<table id="table" ref={(el) => this.table = el}>
                    <thead>
                        <tr>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отделение</th>
                            <th>Номер телефона</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.users.map((el) => (
                            <Tr user={el} key={el.id}/>
                        ))
                    }
                    </tbody>
                </table>*/}
                <Table dataSource={this.props.users} columns={this.columns}/>
            </div>
    )}
}

export default Employees;
