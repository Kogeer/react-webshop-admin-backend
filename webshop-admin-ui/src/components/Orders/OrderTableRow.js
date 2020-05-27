import React from 'react';

export default function OrderTableRow(props) {
    return (
        <tr id="products-row" >
            <td>{props.row.id}</td>
            <td>{props.row.name}</td>
            <td>{props.row.email}</td>
            <td>{props.row.address}</td>
            <td>{props.row.item.map(item => item.name)}</td>
        </tr>
    )
}