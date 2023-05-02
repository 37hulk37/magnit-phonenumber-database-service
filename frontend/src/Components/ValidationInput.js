import {Input} from 'antd'
import React from "react";

class ValidationInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: '',
            value: '',
            valid: false
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt){
        this.setState({value: evt.target.value})
        this.props.onChange(evt);

        if(this.props.status !== ''){
            this.setState({status: this.props.status});
            return;
        }

        const valid = (this.props.validation(evt.target.value)).toLowerCase();

        if(valid === 'error') {
            this.setState({status: 'error'});
            this.setState({valid: false});
            return;
        }
        this.setState({valid: true});
        if(valid === 'warning') {
            this.setState({status: 'warning'});
            return;
        }
        this.setState({status: ''});
    }

    render(){
        return(
            <Input
                placeholder={this.props.placeholder}
                status={this.state.status}
                onChange={this.onChange}
                defaultValue={this.props.defaultValue}
                prefix = {this.props.prefix}
                size = {this.props.size}
                type = {this.props.type}
            />
        );
    }
}

ValidationInput.defaultProps = {
    validation: () => {return ''},
    status: ''
}

export default ValidationInput;
