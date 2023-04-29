import React from "react";
import {getData} from "../scripts/api.js"
import {showAlert} from "../scripts/util.js";
import {Navigate} from "react-router-dom";
import Employees from "./employees";
import DepartmentSelect from "./departmentSelect";
class Search extends React.Component {

    //TODO: Добавить key в данные, а то орёт React

    constructor(props) {
        super(props);
        this.state = {
            users: [

            ],

            params: {
                name: '',
                surname: '',
                department: '',
                phonenumber: '',
            },
            formActive: true
        }


        this.searchButtonClick = this.searchButtonClick.bind(this);
    }


    render() {
        if(this.props.authed === false || this.props.authed === 'false'){
            return <Navigate replace to="/" />;
        }

        return (
            <main>
                <h2>Параметры поиска</h2>
                <form id="searchForm" method="post" ref={(el) => this.searchForm = el}>
                    <div>
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

                        <div className="buttons">
                            <input type="button" name="to-search" value="Найти данные" onClick={this.searchButtonClick}></input>
                        </div>
                        </div>
                </form>
                <Employees users={this.state.users}/>
            </main>
        )
    }

    searchButtonClick(event){
        event.preventDefault();
        if(this.state.formActive) {
            this.setState({formActive: false});
            console.log(this.createUrl());
            getData(
                `home/employees${this.createUrl()}`,
                (data) => {
                    console.log(data);
                    this.setState({users: data.content})
                    this.setState({formActive: true});
                },
                (err) => {
                    this.setState({formActive: true});
                    showAlert(err);
                }
            );
        }
    }


    createUrl(){
        let url = '/search?';
        let first = true;
        for(let key of Object.keys(this.state.params)){
            if(this.state.params[key] !== ''){
                if(!first){
                    url += '&';
                } else {
                    first = false;
                }
                url += `${key}=${this.state.params[key]}`;
            }
        }
        if(url === '/search?') {
            return null;
        }
        return url;
    }


}

export default Search;
