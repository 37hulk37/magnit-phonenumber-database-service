import React from "react";
import { NavLink } from "react-router-dom";
import {setAuth} from "../scripts/api.js";
import { Layout, Menu, theme } from 'antd';
const { Header } = Layout;


class NavHeader extends React.Component {

    render() {
        if(this.props.authed === false || this.props.authed === 'false') {
            return (
                <div>
                </div>
            )
        }
        return(
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                height: '60px',
                backgroundColor: '#be0028',
                textAlign: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}>
                <div

                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['lk']}
                    style={{
                        //justifyContent: 'flex-end',
                        position: 'absolute',
                        height: '60px',
                        textAlign: 'center',
                        width: '500px',
                        backgroundColor: '#be0028'
                    }}
                    items={[
                        {
                            label: (<NavLink to="/lk">
                                Lk
                            </NavLink>),
                            key: "lk",

                        },
                        {
                            label: (<NavLink to="/search">
                                Search
                            </NavLink>),
                            key: "search",

                        },
                        {
                            label: (<NavLink to="/create-employee">
                                AddUser
                            </NavLink>),
                            key: "create-employee",

                        }

                    ]}
                />
            </Header>
        )
    }

}

export default NavHeader;
