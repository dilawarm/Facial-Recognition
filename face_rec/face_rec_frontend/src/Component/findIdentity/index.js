import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';

export default class findIdentity extends Component {

  state = {
    image: null,
    result: null,
    waiting: false,
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
    this.state.waiting = true;
    this.forceUpdate();
    this.state.waiting = false;
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
    if (this.state.waiting) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    else if (!this.state.result) {
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
        <Col xs={8} md={5}>
          <Image src={"ai_output/"+this.state.result} fluid/>
        </Col>
        </div>
      );
    }
  }
}