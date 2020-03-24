import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from '../../widgets';

export default class createIdentity extends Component {

  state = {
    name: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    console.log("hallo");
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    let extension = this.state.image.name.split(".")[1];
    let filename = this.state.image.name.split(".")[0];
    let timestamp = Date.now();
    form_data.append('image', this.state.image, filename + "-" + timestamp + "." + extension);
    form_data.append('name', this.state.name);
    let url = 'http://localhost:8000/api/identities/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          Alert.success("Identity uploaded!");
          history
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
        <div className="App">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of Identity</Form.Label>
                    <Form.Control type="text" placeholder="Dilawar Mahmood" onChange={(event) => {
                                                this.state.name = event.target.value
                                            }} required/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={this.handleSubmit}>Upload Identity</Button>
        </div>
    );
  }
}