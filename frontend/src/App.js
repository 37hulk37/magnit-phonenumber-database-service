import React from "react";
import Login from "./Pages/login";
import Lk from "./Pages/lk";
import Search from "./Pages/search";
import CreateEmployee from "./Pages/createEmployee";
import NavHeader from "./Pages/navHeader";
import InfoFooter from "./Pages/infoFooter";
import {Route, Routes} from "react-router-dom";
import {addLogOutListener} from "./scripts/api";
import {Layout} from 'antd';
const { Content, } = Layout;

//TODO: Footer к низу растянуть
//TODO: Дизайн всего !!!

//TODO: в хедере уже есть готовая вещь, для того, чтобы детей в право пихать (мб понадобится для иконки)

//TODO: валидация номера
//TODO: пагинация
class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authed: false,
            user: {
                id: '',
                name: '',
                surname: 'a',
                department: '',
                email: '',
                role: '',
                phonenumber: '',
                password: '',
                bossId: ''
            }
        }
        this.changeUser = this.changeUser.bind(this);
    }

    componentDidMount() {
        addLogOutListener(this);
    }

    render() {
        return(
            <Layout className="wrapper">
                {/*<button onClick={() => {console.log([this.state])}}>check</button>*/}
                <NavHeader authed={this.state.authed} user={this.state.user}/>
                <Content className="content">
                    <Routes>
                        <Route path="/" element={<Login authed={this.state.authed} onAuth={this.changeUser}/>} />
                        <Route path="/lk" element={<Lk authed={this.state.authed} user={this.state.user} onChange={this.changeUser}/>}/>
                        <Route path="/search" element={<Search authed={this.state.authed} user={this.state.user}/>}/>
                        <Route path="/create-employee" element={<CreateEmployee authed={this.state.authed} user={this.state.user}/>}/>
                    </Routes>
                </Content>
                <InfoFooter authed={this.state.authed}/>

            </Layout>
        )
    }

    changeUser(user){
        this.setState({user: user});
    }

}

export default App;
