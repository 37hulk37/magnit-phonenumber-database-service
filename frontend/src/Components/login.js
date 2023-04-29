import React from "react";
import {getAuth, logIn, setAuth, setToken} from "../scripts/api.js";
import {withRouter} from "./withRouter";
import {showAlert} from "../scripts/util";
class Login extends React.Component {

    //TODO: добавить Enter
    constructor(props) {
        super(props);

        this.state = {
            formIsActive: true,

            email: '',
            password: ''
        }
        if(typeof getAuth() === "undefined")
            setAuth(false);
        this.loginButtonClick = this.loginButtonClick.bind(this);
    }


    render() {


        return(
            <main>
                <form method="post" className="send-form">
                    <div><label> Email : <input type="text" name="email" onChange={(e) => {this.setState({email: e.target.value})}}/> </label></div>
                    <div><label> Password: <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value})}/> </label></div>
                    <div className="buttons"><input type="button" value="Sign In" className="submit-button" onClick={this.loginButtonClick}/></div>
                </form>
            </main>
        );
    }

    loginButtonClick(event) {
        event.preventDefault();
        if(this.state.formIsActive) {
            console.log('submitted');
            this.setState({formIsActive: false});
            console.log(this.state.email);
            console.log(this.state.password);
            logIn(
                this.state.email,
                this.state.password,
                (data) => {
                    if(data.code === 'ACCEPTED') {
                        this.props.navigate('/lk');
                        setAuth(true);
                        setToken(data.token);
                        this.props.onAuth(data.user);
                    } else {
                        console.log(data);
                        showAlert('Неверный адрес почты или пароль');
                    }
                    this.setState({formIsActive: true});
                },
            (err) => {
                showAlert(err);
                console.log(err);
                this.setState({formIsActive: true});
            });
        }
    }
}

export default withRouter(Login);
