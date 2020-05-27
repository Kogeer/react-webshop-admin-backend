import React from 'react';

import { Form, Container, Row, Col, Badge, Button, Modal } from 'react-bootstrap'
import UploadValidation from '../../api/upload-validation'
import FormError from '../FormError'

export default class UpdateProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataNotLoaded: false,
            name: this.props.data.name,
            price: this.props.data.price,
            description: this.props.data.description,
            specs: this.props.data.specs,
            stock: this.props.data.stock,
            warn_at: this.props.data.warn_at,
            error: false,
            deleteModalShow: false
        }

        this.sku = React.createRef();
        this.name = React.createRef();
        this.price = React.createRef();
        this.description = React.createRef();
        this.specs = React.createRef();
        this.stock = React.createRef();
        this.warn_at = React.createRef();
        console.log(this.stock);

        this.update = this.update.bind(this)
        this.deleteModalClose = this.deleteModalClose.bind(this)
        this.deleteModalOpen = this.deleteModalOpen.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
    }


    async update() {
        const sku = this.sku.current.value;
        const name = this.state.name;
        const price = this.state.price;
        const desc = this.state.description;
        const specs = this.state.specs;
        const stock = this.state.stock;
        const warn_at = this.state.warn_at;
        console.log(stock,warn_at)

        const frontedValidation = new UploadValidation();
        const frontedNotValid = frontedValidation.formValidation(sku, name, price, desc, specs)

        if (Object.keys(frontedNotValid).length > 0) {
            this.setState({ error: frontedNotValid })
            return;
        }


        let data = new FormData()
        data.append('name', name)
        data.append('price', price)
        data.append('description', desc)
        data.append('specs', specs)
        data.append('stock', stock);
        data.append('warn_at', warn_at);

        const response = await fetch(`http://localhost:3050/product/${sku}`, {
            method: 'PUT',
            body: data
        })

        const resdata = await response.json();

        if (Object.keys(resdata).length === 0) {
            setTimeout(() => {
                document.getElementById('succes').innerText = "Succes"
            }, 2000)
        }

        if (Object.keys(resdata).length > 0) {
            this.setState({ error: resdata })
        }

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state);
    }

    reShow() {
        this.setState({ error: false })
    }

    deleteModalOpen() {
        this.setState({ deleteModalShow: true })
    };

    deleteModalClose() {
        this.setState({ deleteModalShow: false })
    };

    deleteProduct(){
        this.setState({ deleteModalShow: false })
        this.props.deleteAll()
    }

    render() {
        return (

            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto"><h1><Badge>Update product</Badge></h1></Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm={8} style={{ borderStyle: "solid", borderWidth: '1px', borderColor: 'grey', padding: "20px" }}>
                            <Form.Group onChange={(e) => this.handleChange(e)}>
                                <Row className="justify-content-md-between">
                                    <Col sm={4}>
                                        <Form.Label>SKU</Form.Label>
                                        <Form.Control plaintext defaultValue={this.props.data.sku} ref={this.sku} readOnly />                                        
                                        <Form.Label>Current stock</Form.Label>
                                        <Form.Control type="number" name="stock" ref={this.stock} />
                                    </Col>
                                    <Col sm={3}>
                                        <Button variant="danger" onClick={this.deleteModalOpen}>Delete Product</Button>
                                    </Col>
                                </Row>
                                <br />
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.name} name="name" ref={this.name} />                                
                                <Form.Label>Warning at</Form.Label>
                                <Form.Control type="number" name="warn_at" ref={this.warn_at} />
                                <br />
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.price} name="price" ref={this.price} />
                                <br />
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.description} name="description" ref={this.desc} />
                                <br />
                                <Form.Label>Specs</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.specs} name="specs" ref={this.specs} />
                                <br />
                                <Button variant='primary' onClick={this.update}>Submit</Button>
                                <p id="succes" style={{ color: "green", listStyleType: "none" }}></p>
                                {this.state.error ? <FormError errorType={this.state.error} reshow={this.reShow.bind(this)} /> : ''}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.deleteModalShow} onHide={this.deleteModalClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want really?</Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.deleteModalClose}>
                            Close
                         </Button>
                        <Button variant="danger" onClick={this.deleteProduct}>
                            Delete Product
                        </Button>
                    </Modal.Footer>
                    
                </Modal>
            </div>
        )
    }
}
