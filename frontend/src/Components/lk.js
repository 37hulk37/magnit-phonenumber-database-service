import React from "react";
import {putData} from "../scripts/api.js"
import {Navigate} from "react-router-dom";

class Lk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeButtonActive: true,
            sendButtonActive: false,
            inputActive: false
        }

        this.sendButtonClick = this.sendButtonClick.bind(this);
        this.changeButtonClick = this.changeButtonClick.bind(this);
        //TODO: сделать поля состояниями, и отправлять их в бади
    }
    render() {

        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/login" />;
        }

        return(
            <main>

                <h2>Персональные данные</h2>
                <span>
                    <img src="someSource-2" alt="Фото"></img>
                </span><br/>
                <h3>ФИО</h3>
                <span>Александров</span><br/>
                <span>Александр Александрович</span><br/>
                <h3>Отделение</h3>
                <span>IT-Department</span><br/>
                <h2>Контактные данные</h2>
                <form id="personForm" method="post">
                    <input type="number" name="id" id={this.props.id} readOnly hidden></input>

                    <label htmlFor="email">Email:</label><br/>
                    <input type="email" name="email" id="email" placeholder="example@mail.ru" readOnly={!this.state.inputActive}></input><br/>
                    <label htmlFor="phonenumber">Телефон:</label><br/>
                    <input type="tel" name="phonenumber" id="phonenumber" placeholder="+7(***)***-**-**" readOnly={!this.state.inputActive}></input><br/>

                    <div className="buttons">
                        <input type="button" id="changeButton" value="Изменить номер телефона" readOnly={!this.state.changeButtonActive} onClick={this.changeButtonClick}></input>
                        <input type="button" id="sendButton" value="Сохранить изменения" readOnly={!this.state.sendButtonActive} onClick={this.sendButtonClick}></input>
                    </div>
                </form>
            </main>
    )}

    changeButtonClick(event) {
        event.preventDefault();
        if(!event.target.readOnly){
            this.setState({inputActive: true});
            this.setState({sendButtonActive: true});
            this.setState({changeButtonActive: false});
            console.log('changeButton click');
        }
    }
    sendButtonClick(event) {
        event.preventDefault();
        if(!event.target.readOnly){
            const sendBody = {
                'id': this.props.id,
            };
            putData(
                'home/employees',
                sendBody,
                () => {
                    this.setState({inputActive: false});
                    this.setState({changeButtonActive: true});
                    this.setState({sendButtonActive: false});
                },
                () => {
                    this.setState({inputActive: false});
                    this.setState({changeButtonActive: true});
                    this.setState({sendButtonActive: false});
                }
            )
                console.log('sendButton click');

        }
    }
}

export default Lk;
