import React from "react";
import {putData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";
import {showAlert} from "../scripts/util";


//TODO: телефон не меняется(внешне)
//TODO: добавить соообщение о Succe
class Lk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeNumberActive: true,
            sendButtonActive: false,
            changePasswordActive: true,
            numberActive: false,
            passwordActive: false,
            newNumber: '',
            newPassword: '',
        }

        this.sendButtonClick = this.sendButtonClick.bind(this);
        this.changeNumberClick = this.changeNumberClick.bind(this);
        this.changePasswordClick = this.changePasswordClick.bind(this);
        this.setNumber = this.setNumber.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }
    render() {

        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/" />;
        }

        return(
            <main>

                <h2>Персональные данные</h2>
                <span>
                    <img alt="Фото"></img>
                </span><br/>
                <h3>Сотрудник</h3>
                <span>{this.props.user.surname}</span><br/>
                <span>{this.props.user.name}</span><br/>
                <h3>Почта</h3>
                <span>{this.props.user.email}</span>
                <h3>Отделение</h3>
                <span>{this.props.user.department}</span><br/>
                <h2>Контактные данные</h2>
                <form id="personForm" method="post">
                    <label htmlFor="phonenumber">Телефон:</label><br/>
                    <input type="tel" name="phonenumber" id="phonenumber" readOnly={!this.state.numberActive}
                           defaultValue={this.props.user.phonenumber} onChange={this.setNumber}></input><br/>

                    <label htmlFor="password">Пароль:</label><br/>
                    <input type="password" name="password" id="password" readOnly={!this.state.passwordActive}
                           onClick={this.setPassword}></input><br/>

                    <div className="buttons">
                        <input type="button" id="changeNumber" value="Изменить номер телефона"
                               readOnly={!this.state.changeNumberActive} onClick={this.changeNumberClick}></input>
                        <input type="button" id="changePassword" value="Изменить пароль"
                               readOnly={!this.state.changePasswordActive} onClick={this.changePasswordClick}></input>
                        <br/>
                        <input type="button" id="sendButton" value="Сохранить изменения"
                               readOnly={!this.state.sendButtonActive} onClick={this.sendButtonClick}></input>
                    </div>
                </form>
            </main>
    )}

    setNumber(event) {
        this.setState({newNumber: event.target.value});
    }

    setPassword(event) {
        this.setState({newPassword: event.target.value});
    }

    changePasswordClick(event) {
        if(!event.target.readOnly){
            this.setState({passwordActive: true});
            this.setState({sendButtonActive: true});
            this.setState({changeNumberActive: false});
            this.setState({changePasswordActive: false});
            console.log('changePassword click');
        }
    }

    changeNumberClick(event) {
        event.preventDefault();
        if(!event.target.readOnly){
            this.setState({numberActive: true});
            this.setState({sendButtonActive: true});
            this.setState({changeNumberActive: false});
            this.setState({changePasswordActive: false});
            console.log('changeNumber click');
        }
    }
    sendButtonClick(event) {
        event.preventDefault();
        if(!event.target.readOnly){
            this.setState({sendButtonActive: false});

            let sendBody = {...this.props.user};
            if(this.state.newPassword !== ''){
                sendBody.password = this.state.newPassword;
            }

            if(this.state.newNumber !== ''){
                sendBody.phonenumber = this.state.newNumber;
            }

            putData(
                'home/employees',
                sendBody,
                () => {
                    this.afterSend();
                    this.props.onChange(sendBody);
                },
                (err) => {
                    this.afterSend();
                    this.props.onChange(this.props.user);
                    showAlert(err);
                }
            )
                console.log('sendButton click');

        }
    }

    afterSend() {
        this.setState({passwordActive: false})
        this.setState({numberActive: false});
        this.setState({changeNumberActive: true});
        this.setState({changePasswordActive: true});
        this.setState({sendButtonActive: false});
        this.setState({newNumber: ''});
        this.setState({newPassword: ''});
    }

}

export default Lk;
