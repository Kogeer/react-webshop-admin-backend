import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';

export default class Row extends Component {


    render() {
        return (

            <tr id="products-row" >
                <td>{(this.props.row.imagePath != 'No image') ? <Image  src={'http://localhost:3050'+this.props.row.imagePath} alt="product-main" rounded/>: 'No main image'}</td> 
                <td>{this.props.row.sku}</td>
                <td>{this.props.row.name}</td>
                <td>{this.props.row.price}</td>
                <td><Link to={`/product/${this.props.row.sku}`}>Edit</Link></td>
            </tr>
        )
    }
}
