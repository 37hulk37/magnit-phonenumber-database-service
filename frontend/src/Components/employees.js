import React from "react";
import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from "antd";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {deleteData, putData} from "../scripts/api";
import DepartmentSelect from "./departmentSelect";

//TODO: Пагинация нам надо
class Employees extends React.Component{

    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            changeModalOpen: false,
            deleteModalOpen: false,
            clickedRow: 0,
            currPhonenumber: '',
            currDepartment:''
        }
        this.openChange = this.openChange.bind(this);
        this.cancelChange = this.cancelChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    columns = [
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отделение',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Номер телефона',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: '',
            key: 'action',
            render: (_, record, index) => (
                <Space>
                    <Modal
                        okButtonProps={{form:'changeForm', key: 'submit', htmlType: 'submit'}}
                        title={'Изменить данные работника'}
                        open={this.state.changeModalOpen}
                        onOk={this.changeUser}
                        okText={"Изменить"}
                        cancelText={"Отменить изменения"}
                        onCancel={this.cancelChange}

                    >
                        <Form id="changeForm"
                              ref={this.formRef}
                        >
                            <Form.Item
                                name="department"
                                label="Отделение"
                                initialValue={this.state.currDepartment}
                                rules={
                                    [
                                    ]
                                }>
                                <DepartmentSelect name="department" id="department"
                                                  defaultValue={this.props.users[index].department}
                                                  ref={(el) => this.department = el}/>
                            </Form.Item>
                            <Form.Item
                                name="phonenumber"
                                label="Телефон"
                                initialValue={this.state.currPhonenumber}
                                rules={
                                    [
                                        { length: 11, message: 'Введите корректный номер телефона'}
                                    ]
                                }>

                                <Input type="tel"
                                       name="phonenumber" id="phonenumber" placeholder="8**********"/>
                            </Form.Item>
                        </Form>

                    </Modal>
                    <AiFillEdit color='#3b84d5' onClick={() => {
                        this.setState({changeModalOpen: true});
                        this.setState({clickedRow: index});
                        this.setState({currPhonenumber: this.props.users[index].phonenumber})
                        this.setState({currDepartment: this.props.users[index].department})
                        console.log(this.state);
                        this.openChange(index)
                    }}/>


                    <AiFillDelete color='#be0028' onClick={() => {
                        this.setState({deleteModalOpen: true});
                        this.setState({clickedRow: index});
                    }}/>
                    <Modal
                        title={"Удалить работника"}
                        open={this.state.deleteModalOpen}
                        okText={"Да"}
                        cancelText={"Нет"}
                        onOk={this.deleteUser}
                        onCancel={() => this.setState({deleteModalOpen: false})}>
                    Вы точно хотите удалить работника?
                    </Modal>
                </Space>
            )
        }
    ];

    render() {
        return(
            <div>
                <h2>Полученные данные</h2>
                <Table
                    dataSource={this.props.users}
                    columns={this.columns}
                    pagination={{
                        total: this.props.page.totalElements,
                        showSizeChanger: false,
                        showQuickJumper: true,
                        pageSize: this.props.page.size,
                        onChange: (page, pageSize) => {

                            console.log(page);
                            this.props.getPage(page);
                        }
                    }}
                    rowKey="id"
                />
            </div>
    )}

    openChange(index){
        if(this.formRef.current !== null){
            this.formRef.current.setFields([
                    {
                        name: 'phonenumber',
                        value: this.props.users[index].phonenumber
                    },
                    {
                        name: 'department',
                        value: this.props.users[index].department
                    }
                ]
            );
        }
    }
    cancelChange(){
        this.setState({changeModalOpen: false});
        console.log(this.formRef.current)
    }
    changeUser(){
        const tableIndex = this.state.clickedRow;
        console.log('HERE');
        const values = this.formRef.current.getFieldsValue(true);
        console.log(values);
        this.setState({changeModalOpen: false});
        let sendBody = {...values ,...this.props.users[tableIndex]};
        console.log(sendBody)
        putData(
            'home/employees',
            sendBody,
            () => {
                //this.props.onChange(sendBody);
                message.success('Данные успешно изменены')
            },
            (err) => {
                //this.props.onChange(this.props.user);
                message.error('Не удалось отправить данные');
            }
        )

        this.formRef.current.resetFields();
    }
    deleteUser(){
        console.log('DELETE')
        const tableIndex = this.state.clickedRow;
        this.setState({clickedRow: 0});
        this.setState({deleteModalOpen: false});
        deleteData(
            `home/employees/${this.props.users[tableIndex].id}`,
            () => {
                message.success('Работник удалён')
                let copyUsers = [...this.props.users];
                copyUsers.splice(tableIndex, 1);
                this.props.onChange(copyUsers);
            },
            (err) => {
                message.error(err);
            }
        )
    }
}

export default Employees;
