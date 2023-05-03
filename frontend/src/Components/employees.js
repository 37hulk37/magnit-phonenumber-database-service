import React from "react";
import {Table} from "antd";

//TODO: Пагинация нам надо
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
                <Table
                    dataSource={this.props.users}
                    columns={this.columns}
                    pagination={false}
                    rowKey="id"
                />
            </div>
    )}
}

export default Employees;
