import React from 'react'
import '../stylesheets/UploadProduct.css'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'

export default class FormError extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show : false
        }
    }

    componentDidMount() {
        this.setState({show:true})
    }

    hideModal() {
        this.props.reshow();
        this.setState({show:false})
    }

    render() {
        const messageValues = Object.values(this.props.errorType)
        const wholeMessages = Object.keys(this.props.errorType).map((err,i) => {
            return <div className="errorMessage" key={i}>{`${err.toUpperCase()} is ${messageValues[i]}!`}</div>
            })

        return(
        <div>
            <Modal show={this.state.show} onHide={() => this.hideModal}>
                <Modal.Header>
                    <Modal.Title>Ooops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{wholeMessages}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.hideModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}