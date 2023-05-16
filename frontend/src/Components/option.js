import React from "react";

class Option extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <option value={this.props.value}>
                {this.props.value}
            </option>
        )
    }
}

export default Option;
