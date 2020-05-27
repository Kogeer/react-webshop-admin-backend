import React, {Component} from 'react'
import Row from './Row'
import {Table} from 'react-bootstrap'
import './product-table.css'

export default class ProducTable extends Component{


    render(){
        return(
            <Table striped bordered hover id="products-table" className="justify-content-center">
                <thead id="products-thead">
                    <tr>
                        <td>Image</td>
                        <td>SKU</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody >
                    {
                    this.props.data.map((row, rowIndex)=>{
                       return(<Row row={row} key={rowIndex} />)
                    })}
                </tbody>
            </Table>
        )
    }
}