import React from "react";
import test from '../img/test.png'
import {NavLink} from "react-router-dom";
import {setAuth} from "../scripts/api.js";
class Header extends React.Component {

//TODO: добавить норм кнопку выхода

    render() {
        if(this.props.authed === false || this.props.authed === 'false') {
            return (
                <div>
                </div>
            )
        }
        return(

            <header className="page-header">
                <h1>
                    <img alt="Магнит" src={test} style={{height:100, width:100}}/>
                        Магнит mobiles
                </h1>
                <input type="button" onClick={() => setAuth(false)} value={'Kill'}></input>
                <div className="navbar">
                    <h1>Navbar</h1>
                    <ul>
                        <li><NavLink to="/lk">Lk</NavLink></li>
                        <li><NavLink to="/search">Search</NavLink></li>
                        <li><NavLink to="/create-employee">AddEmployee</NavLink></li>
                    </ul>
                </div>
            </header>
        )
    }

}

export default Header;
