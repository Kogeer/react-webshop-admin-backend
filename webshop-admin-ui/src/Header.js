import React from 'react';
import './stylesheets/Header.css'
import { Jumbotron } from 'react-bootstrap';


export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Jumbotron fluid className="d-flex align-items-center justify-content-center">
                <h1 className="pagetitle">Baz Team Webshop</h1>
            </Jumbotron>
        )
    }
}