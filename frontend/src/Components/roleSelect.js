import React from "react";
import {Select} from "antd";
import {roles} from "../scripts/data";

class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);

        roles.forEach(value => {this.roles.push({value: value, label: value, key: value})})

    }
    roles = [];
    render() {
        return(
            <Select name="roles" id="roles"
                    placeholder='Роль'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    } options={this.roles}
                    onChange={this.props.onChange}
                    defaultValue='USER'
                    style={{
                        minWidth: '120px',
                        maxWidth: '200px',
                        margin: '5px 0 10px 0',
                        padding: '2px 5px',
                    }}
            >
            </Select>
        );
    }
}

export default DepartmentSelect;
