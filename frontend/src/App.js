import React from "react";
import Login from "./Components/login";
import Lk from "./Components/lk";
import Search from "./Components/search";
import CreateEmployee from "./Components/createEmployee";
import Header from "./Components/header";
import {Route, Routes} from "react-router-dom";
import {addSetAuthListener, getAuth, getToken} from "./scripts/api";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authed: false,
            user: {
                id: '',
                name: '',
                surname: '',
                department: '',
                email: '',
                role: '',
                phonenumber: ''
            }
        }
        this.changeUser = this.changeUser.bind(this);
        this.logUser = this.logUser.bind(this);
    }

    componentDidMount() {
        addSetAuthListener(this);
    }

    render() {
        return(
            <div>
                <button onClick={() => {console.log(this.state.user)}}>check</button>
                <Header authed={this.state.authed}/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login authed={this.state.authed} onAuth={this.changeUser}/>} />
                        <Route path="/lk" element={<Lk authed={this.state.authed} user={this.state.user} onChange={this.changeUser}/>}/>
                        <Route path="/search" element={<Search authed={this.state.authed} user={this.state.user}/>}/>
                        <Route path="/create-employee" element={<CreateEmployee authed={this.state.authed} user={this.state.user}/>}/>
                    </Routes>
                </div>
            </div>
        )
    }

    changeUser(user){
        this.setState({user: user});
    }

    logUser(){
        console.log(this.state);
    }
}

export default App;
