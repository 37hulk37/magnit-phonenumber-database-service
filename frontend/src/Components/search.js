import React from "react";
import {getData} from "../scripts/api.js"
import {showAlert} from "../scripts/util.js";
import Table from "./table"
import {Navigate} from "react-router-dom";
class Search extends React.Component {

    //TODO: поменять запрос на нужный, когда бек подтянут, поля под это уже сделаны
    constructor(props) {
        super(props);
        this.state = {
            users: [
                 {
                    surname: 'Denisov',
                    name: 'VlaDICK',
                    department: 'IT',
                    phonenumber: '333-333-333',
                    id: '1'
                },
                {
                    surname: 'Ustinov',
                    name: 'Sergey',
                    department: 'POW-POW',
                    phonenumber: '8-800-535-35-35',
                    id: '2'
                }
            ],

            department: '',
            surname: '',
            name : '',
            phonenumber: '',
            formActive: true
        }
        this.searchButtonClick = this.searchButtonClick.bind(this);
    }


    render() {
        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/login" />;
        }

        return (
            <main>
                <h2>Параметры поиска</h2>
                <form id="searchForm" method="post" ref={(el) => this.searchForm = el}>
                    <div>
                        <label htmlFor="department">Отделение: </label><br/>
                        <select name="department" id="department"
                                onChange={(evt) => this.setState({department: evt.target.value})}>
                        </select><br/>

                        <label htmlFor="surname">Фамилия: </label><br/>
                        <input type="text" name="surname" id="surname"
                               onChange={(evt) => this.setState({surname: evt.target.value})}></input>
                        <br/>

                        <label htmlFor="name">Имя: </label><br/>
                        <input type="text" name="name" id="name"
                               onChange={(evt) => this.setState({name: evt.target.value})}></input>
                        <br/>

                        <label htmlFor="tel">Телефон: </label><br/>
                        <input type="tel" name="phonenumber" id="phonenumber" placeholder="+7 (***)*** - ** - **"
                               onChange={(evt) => this.setState({phonenumber: evt.target.value})}></input>
                        <br/>
                        <div className="buttons">
                            <input type="button" name="to-search" value="Найти данные" onClick={this.searchButtonClick}></input>
                        </div>
                        </div>
                </form>
                <Table users={this.state.users}/>
            </main>
        )
    }

    searchButtonClick(event){
        event.preventDefault();
        console.log(this.state)
        if(this.state.formActive) {
            this.setState({formActive: false});
            getData(
                'http://localhost:8080/api/v1/controller/employees',
                (data) => {
                    this.setState({users: data})
                    this.setState({formActive: true});
                },
                (err) => {
                    this.setState({formActive: true});
                    showAlert(err);
                }
            );
        }
    }
}

export default Search;
