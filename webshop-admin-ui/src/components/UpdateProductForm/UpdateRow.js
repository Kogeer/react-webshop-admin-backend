import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
export default class UpdateRow extends Component {
    constructor(props) {
        super(props)
    }

    delete(id) {
        this.props.delete(id)
    }

    changePrimary(id) {
        this.props.primary(id)
    }

    render() {
        let styleObject = { backgroundColor: "" }
        if (this.props.row.isPrimary === 1) {
            styleObject.backgroundColor = "#CCFFFF"
        }
        return (
            <tr style={styleObject} id="images-row">
                <td><img src={"http://localhost:3050" + this.props.row.imagePath} alt="product" /></td>
                <td>{this.props.row.realPath}</td>
                <td>{`http://localhost:3050${this.props.row.imagePath}`}</td>
                <td><Button variant="primary" onClick={() => this.changePrimary(this.props.row.id)}>Primary</Button>
                    <Button variant="danger" onClick={() => this.delete(this.props.row.id)} >Delete</Button></td>
            </tr>
        )
    }
}