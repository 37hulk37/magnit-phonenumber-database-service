import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
const { Footer } = Layout;


class InfoFooter extends React.Component {

    render() {
        if(this.props.authed === false || this.props.authed === 'false') {
            return (
                <div>
                </div>
            )
        }
        return(
            <Footer style={{
                height: '60px',
                textAlign: 'center',
                flex: '0 0 auto',
                backgroundColor: '#c6c6c6'
            }}
            >Создано в СПБПУ</Footer>
        )
    }

}

export default InfoFooter;
