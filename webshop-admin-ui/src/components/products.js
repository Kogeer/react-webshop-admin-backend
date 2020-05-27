import React from 'react';
import ProductTable from './ProductTable/ProductTable';
import {
    Link
} from "react-router-dom";

export default class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            products: undefined,
            dataNotLoaded: false
        }

    }

    componentDidMount() {
        fetch('http://localhost:3050/products')
            .then(res => res.json())
            .then(products => {
                console.dir(products);
                this.setState({ products: products.products })
            })
            .catch((error) => {
                setTimeout(() => {
                    this.setState({ dataNotLoaded: true })
                }, 2000)
            })
    }
    render() {
        return (
            <div>

                {this.state.products ? <ProductTable data={this.state.products} /> :
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>}
                {
                    this.state.dataNotLoaded ? <Link to="/upload-product">Termék feltöltése</Link> : ''
                }
            </div>
        )
    }
}