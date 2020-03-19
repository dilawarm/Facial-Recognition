import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export default class findIdentity extends Component {

  state = {
    image: null,
    result: null
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
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    let extension = this.state.image.name.split(".")[1];
    let filename = this.state.image.name.split(".")[0];
    let timestamp = Date.now();
    form_data.append('image', this.state.image, filename + "-" + timestamp + "." + extension);
    let url = 'http://localhost:8000/api/uploads/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          this.state.result = res.data.image.split("/media/upload_images/")[1];
          console.log(this.state.result);
          this.forceUpdate();
        })
        .catch(err => console.log(err))
  };

  render() {
    if (!this.state.result) {
      return (
        <div className="App">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                <input type="file"
                   id="image"
                   accept="image/png, image/jpeg" onChange={this.handleImageChange} required/>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={this.handleSubmit}>Find Identity</Button>
        </div>
      );
    } else {
      console.log("HEISANN!!!");
      return (
        <div className="App">
          <Image src={"ai_output/"+this.state.result} fluid/>
        </div>
      );
    }
  }
}