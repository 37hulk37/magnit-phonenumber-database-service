import React from "react";

class Tr extends React.Component{
    user = this.props.user;
    constructor(props) {

        super(props);
    }

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

class Table extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                <h2>Полученные данные</h2>
                <table id="table" ref={(el) => this.table = el}>
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
                </table>
            </div>
    )}
}

export default Table;
