import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

import axios from "axios";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        options:[],
        };
        this.loadOptions = this.loadOptions.bind(this);
    }

    componentWillMount() {
        this.loadOptions();
    }

    async loadOptions() {
        const promise = await axios.get("http://localhost:8000/homepage/");
        const status = promise.status;
        if (status == 200) {
            const data = promise.data.data;
            this.setState({options: data});
        }
    }

    render() {
        return(
            <div>
                <h1>Options idiot</h1>
                    {this.state.options.map((value, index) => {return <Button key={index} variant="primary">{value}</Button>})}
            </div>
        )
    }
}