import React, { Component } from 'react'
import { Form, Button, Row, Container, Col, Badge } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import UploadValidation from '../api/upload-validation'
import FormError from './FormError'

export default class UploadProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            redirect: false
        }

        this.sku = React.createRef()
        this.name = React.createRef()
        this.price = React.createRef()
        this.desc = React.createRef()
        this.specs = React.createRef()
        this.images = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        
        const sku = this.sku.current.value;
        const name = this.name.current.value;
        const price = this.price.current.value;
        const desc = this.desc.current.value;
        const specs = this.specs.current.value;
        const images = this.images.current.files;
        
        const frontedValidation = new UploadValidation();
        const frontedNotValid = frontedValidation.formValidation(sku,name,price,desc,specs)
        if(Object.keys(frontedNotValid).length > 0) {
            this.setState({error:frontedNotValid})
            return;
        }

        const data = new FormData();
        data.append('sku', sku);
        data.append('name', name);
        data.append('price', price);
        data.append('description', desc);
        data.append('specs', specs);
        for(let i = 0; i < images.length; i++) {
            data.append('images',images[i])
        }

        const requestOptions = {
            method: 'POST',
            body: data
        }
        const response = await fetch('http://localhost:3050/product',requestOptions);
        const resdata = await response.json();

        if(Object.keys(resdata).length === 0){
            setTimeout(()=>{
                document.getElementById('succes').innerText = "Succes"
                this.setState({redirect: true})
            }, 2000)
        }

        if(Object.keys(resdata).length > 0) {
            this.setState({error : resdata})
        }
        // console.dir(resdata)
        
    }

    reShow() {
        this.setState({error:false})
    }

    render() {

        return (
            <div>
                {this.state.redirect ? <Redirect to="/"/> : ""}
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto"><h1><Badge>Upload product</Badge></h1></Col>
                    </Row>
                    <Row className="justify-content-md-center mt-2">
                        <Col sm={8} style={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'grey', padding: "20px" }}>

                            <Form.Group controlId="sku">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" ref={this.sku} maxLength="12"/>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" re='name' ref={this.name} />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" ref={this.price} />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" row="3" ref={this.desc} maxLength="240"/>
                            </Form.Group>

                            <Form.Group controlId="specs">
                                <Form.Label>Specs</Form.Label>
                                <Form.Control as="textarea" row="3" ref={this.specs} />
                            </Form.Group>

                            <Form.File.Input style={{ marginBottom: "30px" }} multiple ref={this.images} />

                            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                            <p id="succes" style={{ color: "green", listStyleType: "none" }}></p>
                            {this.state.error ? <FormError errorType={this.state.error} reshow={this.reShow.bind(this)}/> : ''}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}