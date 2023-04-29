import React from "react";
import {Select} from "antd";
import {departments} from "../scripts/data";

//TODO: поменять value
class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);

        this.departments.push({value: '', label: 'Не выбрано', key: ''})
        departments.forEach(value => {this.departments.push({value: value, label: value, key: value})})

    }
    departments = [];
    render() {
        return(
            <Select name="department" id="department"
                    placeholder='Название отдела'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    } options={this.departments}
                    onChange={this.props.onChange}
                    defaultValue='Не выбрано'>
            </Select>
        );
    }
}

export default DepartmentSelect;
