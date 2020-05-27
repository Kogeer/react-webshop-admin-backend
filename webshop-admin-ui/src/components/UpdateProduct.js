import React from 'react';
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import UpdateProductForm from './UpdateProductForm/UpdateProductForm'
import UpdateProductImages from './UpdateProductForm/UpdateProductImages'


export default class UpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: false,
            images: false,
            redirect: false
        }
        this.download = this.download.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
    }

    componentDidMount() {
        this.download()
    }

    
    deleteAll(){
        console.log(this.props.match.params.sku)
       fetch(`http://localhost:3050/product/${this.props.match.params.sku}`, {method: "DELETE"})
        .then(res => res.json())
        .then(res =>{
            if(Object.keys(res).length === 0){
                this.setState({redirect: true})
            }
        })
     }


    async download() {
        console.log('Letöltés')
        const sku = this.props.match.params.sku;
        const url = `http://localhost:3050/product/${sku}`;
        const resDetails = await fetch(url);
        const resJsonDetails = await resDetails.json();
        this.setState((state, props) => {
            return (state.products = resJsonDetails.product,
                state.images = resJsonDetails.imagesPath)
        })
        console.log(this.state.images)
    }


    render() {

        return (
            <div>
                {this.state.redirect ? <Redirect to="/products"/> : ""}
                {this.state.products ? <UpdateProductForm data={this.state.products} deleteAll={this.deleteAll}/> : ''}
                {this.state.images ? <UpdateProductImages data={this.state.images} sku={this.props.match.params.sku}/> : <div>Pictures are unavailable</div>}
            </div>
        )
    }
}