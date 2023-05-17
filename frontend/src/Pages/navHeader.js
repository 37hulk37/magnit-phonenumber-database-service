import React from "react";
import { NavLink } from "react-router-dom";
import {logOut} from "../scripts/api.js";
import {Button, Layout, Menu, theme} from 'antd';
import logo from '../img/logoLightGrey.svg';
const { Header } = Layout;

class NavHeader extends React.Component {

    menuItems = [
        {
            icon: (
            <img src={logo} alt="logo" style={{
                height: 60
        }}/>),
            disabled: true,
            style: {cursor: 'default'},
            key: 'logo'
        },
        {
            label: (<NavLink to="/lk">
                ЛК
            </NavLink>),
            key: "lk",

        },
        {
            label: (<NavLink to="/search">
                Поиск
            </NavLink>),
            key: "search",

        },
        {
            label: (<NavLink to="/create-employee">
                Добавить работника
            </NavLink>),
            key: "create-employee",

        }

    ]

    outItem = [

    {
        label: ('Выйти'),
        key: 'log-out',
        onClick: () => {logOut()},
        style: {float: 'right'}
    }

    ]

    constructor(props) {
        super(props);
        this.state = {
            menuItems: this.menuItems,
            outItem: this.outItem,
        }
        this.getItems = this.getItems.bind(this);
        //this.getItems();
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps) {
            this.getItems()
        }
    }

    render() {

        return(
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                height: '60px',
                backgroundColor: '#be0028',
                textAlign: 'right',
                justifyContent: 'center',
                display: 'flex'
            }}>
                <div style = {{width: 800, verticalAlign: 'middle'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['lk']}
                    style={{
                        //justifyContent: 'flex-end',
                        position: 'absolute',
                        height: '60px',
                        textAlign: 'center',
                        width: '600px',
                        backgroundColor: '#be0028'
                    }}
                    items={this.state.menuItems}
                />
                    <Menu
                        hidden={!this.props.authed}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['log-out']}
                        style={{
                            justifyContent: 'flex-end',
                            height: '60px',
                            textAlign: 'center',
                            backgroundColor: '#be0028'
                        }}
                        items={this.state.outItem}
                    />

                </div>
            </Header>

        )
    }

    getItems(){
        if(this.props.authed === false || this.props.authed === 'false'){
            this.setState({outItem: []})
        } else {
            this.setState({outItem: this.outItem})
        }
        if(this.props.authed === false || this.props.authed === 'false') {
            this.setState({menuItems: [this.menuItems[0]]});
        }
        else if(this.props.user.role === 'USER'){
            this.setState({menuItems:
                    [this.menuItems[0], this.menuItems[1]]});
        }
        else if(this.props.user.role === 'ADMIN' ||
                this.props.user.role === 'DAEMON'){
            this.setState({menuItems: this.menuItems});
        }
        else {
            console.log('HeaderError (role)');
        }
    }
}

export default NavHeader;
