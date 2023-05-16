import React from "react";
import {Select} from "antd";
import {departments, departmentsValues} from "../scripts/data";

//TODO: поменять value
class DepartmentSelect extends React.Component {
    constructor(props) {
        super(props);

        this.departments.push({value: '', label: 'Не выбрано', key: ''});
        for(let i = 0; i < departments.length; i++){
            this.departments.push({value: departmentsValues[i], label: departments[i], key: departmentsValues[i]});
        }

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
                    defaultValue={this.props.defaultValue}
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

DepartmentSelect.defaultProps = {
    defaultValue: "Не выбрано"
}
export default DepartmentSelect;
