import React from "react";
import {showAlert} from "../scripts/util.js";
import {addSetAuthListener, postData} from "../scripts/api.js";
import {Navigate} from "react-router-dom";
import DepartmentSelect from "./departmentSelect";
import RoleSelect from "./roleSelect";

class CreateEmployee extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addButtonActive: true,

            params: {
                department: '',
                surname: '',
                name: '',
                phonenumber: '',
                email: '',
                password: '',
                role: ''
            }
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
                <form id="createEmployeeForm" method="post">
                    <label htmlFor="department">Отделение: </label><br/>
                    <DepartmentSelect name="department" id="department" ref={(el) => this.department = el}
                            onChange={(val) => this.setState({params : {...this.state.params, department: val}})} /><br/>

                    <label htmlFor="surname">Фамилия: </label><br/>
                    <input type="text" name="surname" id="surname"
                           onChange={(evt) => this.setState({params : {...this.state.params, surname: evt.target.value}})}></input><br/>

                    <label htmlFor="name">Имя: </label><br/>
                    <input type="text" name="name" id="name"
                           onChange={(evt) => this.setState({params : {...this.state.params, name: evt.target.value}})}></input><br/>

                    <label htmlFor="phonenumber">Телефон: </label><br/>
                    <input type="tel" name="phonenumber" id="phonenumber" placeholder="+7 (***) - *** - ** - **"
                           onChange={(evt) => this.setState({params : {...this.state.params, phonenumber: evt.target.value}})}></input><br/>

                    <label htmlFor="email">Email: </label><br/>
                    <input type="email" name="email" id="email" placeholder="example@mail.ru"
                           onChange={(evt) => this.setState({params : {...this.state.params, email: evt.target.value}})}></input><br/>

                    <label htmlFor="password">Изначальный пароль: </label><br/>
                    <input type="text" name="password" id="password" defaultValue="basePassword"
                           onChange={(evt) => this.setState({params : {...this.state.params, password: evt.target.value}})}></input><br/>

                    <label htmlFor="role">Роль: </label><br/>
                    <RoleSelect name="role" id="role"
                            onChange={(val) => this.setState({params : {...this.state.params, role: val}})} /><br/>

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
            const sendBody = {...this.state.params};

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
