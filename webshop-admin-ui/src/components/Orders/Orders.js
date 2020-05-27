import React from 'react';
import {Table} from 'react-bootstrap';
import OrderTableRow from './OrderTableRow';

export default class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:3050/orders';
        const response = await fetch(url);
        const orders = await response.json();
        console.log(orders)
        this.setState({ orders: await orders })
    }

    render() {
        return (
            <Table striped bordered hover id="products-table" className="justify-content-center">
                <thead id="products-thead">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Address</td>
                        <td>Items name</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        this.state.orders.map((order, rowIndex) => {
                            return (<OrderTableRow row={order} key={rowIndex} />)
                        })}
                </tbody>
            </Table>
        )
    }
}