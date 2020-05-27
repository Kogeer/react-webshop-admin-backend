import React, { Component } from 'react'
import { Table, Row, Container, Col, Form, Button } from 'react-bootstrap'
import UpdateRow from './UpdateRow'
import '../../stylesheets/UpdateProductImage.css'

export default class UpdateProductImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }

    this.delete = this.delete.bind(this)
    this.primary = this.primary.bind(this)
    this.sendImages = this.sendImages.bind(this)
    this.images = React.createRef()
  }

  delete(id) {
    fetch(`http://localhost:3050/files/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        if (!Object.keys(res).length) {
          this.setState(state => {
            const newData = state.data.filter(d => d.id !== id)
            return { data: newData }
          })
        }
      })
      .catch(res => {
        console.log(res)
      })
  }

  async primary(id) {
    const requestOptions = { method: 'PUT' }
    const url = `http://localhost:3050/files/${id}`
    const imagePrimary = fetch(url, requestOptions);
    const resImgPrimary = await imagePrimary;
    const jsonImg = await resImgPrimary.json();
    if (!Object.keys(jsonImg).length) {
      const imgs = [...this.state.data]
      const datas = imgs.map(img => {
        if (img.id === id) {
          return {
            ...img,
            isPrimary: 1
          }
        }
        return {
          ...img,
          isPrimary: 0
        }
      })

      this.setState(state => {
        state.data = datas
        return { ...state }
      })
    }
  }

  async sendImages() {
    const data = new FormData();
        for (let i = 0; i <= this.images.current.files.length; i++) {
            data.append('images', this.images.current.files[i])
        }
        const response = await fetch(`http://localhost:3050/product/${this.props.sku}/files/`,
            {
                method: 'POST',
                body: data
            }
        );
        const resdata = await response.json();
        
        this.setState((state, props) => {
          state.data = resdata.newList
          return { ...state }
      })
  }

  render() {
    const length = this.state.data.length
    return (
      <div>
        { length ?
        <Table striped bordered hover id="images-table">
          <thead id="images-thead">
            <tr>
              <th>Image</th>
              <th>Path</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((row, rowIndex) => {
                return <UpdateRow row={row} key={rowIndex} delete={this.delete} primary={this.primary} />
              })
            }
          </tbody>
        </Table>  : <div id="images-table">No images</div>}
        <div id="update-images-form">
          <Form.Label>Update images</Form.Label>
          <Form.File.Input style={{ marginBottom: "30px" }} multiple ref={this.images} />
          <Button variant="primary" onClick={this.sendImages}>Submit</Button>
        </div>
      </div>
    )
  }
}