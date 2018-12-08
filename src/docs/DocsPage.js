import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Col,
    Card,
    CardBody,
    Fa,
}
    from 'mdbreact';

import { Redirect } from 'react-router'
import './estilo.css'
class DocsPage extends Component {
    // dowloadDocumento = () => {
    //     fetch('http://ec2-52-43-55-173.us-west-2.compute.amazonaws.com:8080/v2/documentos')
    //         .then(response => {
    //             const filename = response.headers.get('Content-Disposition');
    //             response.blob().then(blob => {
    //                 let url = window.URL.createObjectURL(blob);
    //                 let a = document.createElement('a');
    //                 a.href = url;
    //                 a.download = filename;
    //                 a.click();
    //             });
    //         });
    // }
    constructor() {
        super();
        this.state = {
            isRedirected: false
        }
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        //TODO
        this.setState({ isRedirected: true });
    }
    render() {
        /**TAMBIEN SE PUEDE USAT 'descripcion---archivo' */
        const { id, titulo, fechaCreacion } = this.props;
        if (this.state.isRedirected) {
            return (<Redirect to={"detail/" + id} />);
        }
        return (
            /**
             * ---------------------------------------------------------
             * 
             * EL CARD SOLO CONTENDRA EL NOMBRE ICONO DETALLE Y FECHA
             * 
             * 
             * --------------------------------------------------------
             */
            <div style={{maxHeight:'300px'}}>
            <Col lg="6" md="12" className="mb-lg-0 mb-4">
                <div style={{minWidth:'20rem', minHeight:'30rem'}}>
                    <Card className="my-5">
                        <CardBody>
                            <h5 className="">{titulo}</h5>
                            <div className="d-flex justify-content-center">
                                <div className="card-circle d-flex justify-content-center align-items-center">
                                    <Fa
                                        icon="file-word-o"
                                        className="indigo-text"
                                        size="3x"
                                    ></Fa>
                                </div>
                            </div>
                            <Fa
                                className="my-3"
                                icon="plus-circle"
                                fixed
                                size="2x"
                                onClick={this.onClick}
                            />
                            {/* <p className="grey-text">{descripcion}</p>
                            <Button
                                className="my-3"
                                onClick={this.dowloadDocumento}>
                                <Fa
                                    icon="cloud-download"
                                    size="2x" />
                            </Button> */}
                        </CardBody>
                        <hr className="bg-info"/>
                        <p>{fechaCreacion}</p>
                    </Card>
                </div>
            </Col>
            </div>
        )
    }
}

///VARIABLE DEL API REST EN ESTE CASO IRAN LOS 
DocsPage.propTypes = {
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    archivo: PropTypes.string.isRequired,
    fechaCreacion: PropTypes.string.isRequired
}


export default DocsPage;