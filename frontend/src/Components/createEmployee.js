import React from "react";
import {showAlert} from "../scripts/util.js";
import {addSetAuthListener, getAuth, putData} from "../scripts/api.js";
import Option from "./option";
import {departments, roles} from "../scripts/data";
import {Navigate} from "react-router-dom";

class CreateEmployee extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addButtonActive: true,

            department: '',
            surname: '',
            name: '',
            phonenumber: '',
            email: '',
            password: '',
            role: ''
        }

        addSetAuthListener(this);
        this.addButtonChange = this.addButtonChange.bind(this);
    }


    render() {

        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/login" />;
        }

        return (
            <main>
                <h2>Добавить нового сотрудника</h2>
                <form id="createEmployeeForm" method="post">
                    <label htmlFor="department">Отделение: </label><br/>
                    <select name="department" id="department" ref={(el) => this.departmnet = el}
                            onChange={(evt) => this.setState({department: evt.target.value})}>
                        {
                            departments.map((el) => (
                                <Option value={el} key={el}/>
                            ))
                        }
                    </select><br/>

                    <label htmlFor="surname">Фамилия: </label><br/>
                    <input type="text" name="surname" id="surname"
                           onChange={(evt) => this.setState({surname: evt.target.value})}></input><br/>

                    <label htmlFor="name">Имя: </label><br/>
                    <input type="text" name="name" id="name"
                           onChange={(evt) => this.setState({name: evt.target.value})}></input><br/>

                    <label htmlFor="phonenumber">Телефон: </label><br/>
                    <input type="tel" name="phonenumber" id="phonenumber" placeholder="+7 (***) - *** - ** - **"
                           onChange={(evt) => this.setState({phonenumber: evt.target.value})}></input><br/>

                    <label htmlFor="email">Email: </label><br/>
                    <input type="email" name="email" id="email" placeholder="example@mail.ru"
                           onChange={(evt) => this.setState({email: evt.target.value})}></input><br/>

                    <label htmlFor="password">Изначальный пароль: </label><br/>
                    <input type="text" name="password" id="password" value="basePassword"
                           onChange={(evt) => this.setState({password: evt.target.value})}></input><br/>

                    <label htmlFor="role">Роль: </label><br/>
                    <select name="role" id="role"
                            onChange={(evt) => this.setState({role: evt.target.value})}>
                        {
                            roles.map((el) => (
                                <Option value={el} key={el}/>
                            ))
                        }
                    </select><br/>

                    <div className="buttons">
                        <input type="button" value="Добавить работника" onClick={this.addButtonChange}></input>
                    </div>
                </form>
            </main>
        )
    }

    addButtonChange(evt) {
        evt.preventDefault();
        if(this.state.addButtonActive){
            this.setState({addButtonActive: false});
            const sendBody = {
                department: this.state.department,
                email: this.state.email,
                name: this.state.name,
                surname: this.state.surname,
                phonenumber: this.state.phonenumber,
                password: this.state.password,
                role: this.state.role
            }

            console.log(sendBody)

            putData(
                'http://localhost:8080/api/v1/auth/create-employee',
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
