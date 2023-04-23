import React from "react";
import Login from "./Components/login";
import Lk from "./Components/lk";
import Search from "./Components/search";
import CreateEmployee from "./Components/createEmployee";
import Header from "./Components/header";
import {Route, Routes} from "react-router-dom";
import {addSetAuthListener} from "./scripts/api";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authed: false
        }


    }

    componentDidMount() {
        addSetAuthListener(this);
    }

    render() {
        return(
            <div>
                <Header authed={this.state.authed}/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login authed={this.state.authed}/>} />
                        <Route path="/login" element={<Login authed={this.state.authed}/>} />
                        <Route path="/lk" element={<Lk authed={this.state.authed}/>}/>
                        <Route path="/search" element={<Search authed={this.state.authed}/>}/>
                        <Route path="/create-employee" element={<CreateEmployee authed={this.state.authed}/>}/>
                    </Routes>
                </div>
            </div>
        )
    }
}

export default App;
