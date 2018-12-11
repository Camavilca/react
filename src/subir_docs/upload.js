import React, { Component } from 'react';
import { upload } from '../actions/constante'
import axios from 'axios';
import './UPLOAD.css'
import {
    Container,
    Fa,
    Button,
    MDBInput
} from 'mdbreact'

class uploadMyFile extends Component {
    constructor() {
        super();
        this.state = {
            titulo: '',
            descripcion: '',
            archivo: null,
            loading: '',
            message: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    }
    //**UPLOAD FILE */
    fileSelectedHandler(event) {
        var archivo = event.target.files[0]
        var nombre = event.target.files[0].name
        var extencion = (/[.]/.exec(nombre)) ? /[^.]+$/.exec(nombre)[0] : undefined
        // var permitidos = /(\.doc|\.docx)$/i;
        console.log(nombre)
        console.log(extencion)
        if(extencion == 'doc' || extencion == 'docx'){
            this.setState({
                archivo: event.target.files[0]
            })
        }else{
            alert('Ingrese archivo no valido porfavor')
            archivo.value = ''
            return false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let archivo = this.state.archivo
        let titulo = this.state.titulo
        let descripcion = this.state.descripcion
        let data = new FormData()
        data.append('titulo', titulo)
        data.append('descripcion', descripcion)
        data.append('archivo', archivo)
        this.setState({
            loading: true
        })
        axios.post(upload, data)
            .then(response => {
                this.setState({
                    loading: false,
                    // message: response.data
                })
                console.log(response);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                })
            })
    }

    handleInputChange(e) {
        const { value, name } = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    mensageShow() {
        if (this.state.loading) {
            return <p>
                <Fa icon="spinner" pulse size="3x" fixed />
                <span className="sr-only">Loading...</span>
            </p>
        } else {
            return <p>{this.state.message}</p>
        }
    }
    render() {
        return (
            <div>
                <div className="card mx-xl-5 ">
                    <div className="card-body " style={{ marginTop: '30px' }}>
                        <form onSubmit={this.handleSubmit}>
                            <p className="h4 text-center py-4 text-uppercase text-secondary">
                                subir archivos
                        </p>
                            <label
                                htmlFor="defaultFormCardNameEx"
                                className="grey-text font-weight-light">
                                Titulo * 
                        </label>
                            {/* <input
                                type="text"
                                name="titulo"
                                className="form-control"
                                placeholder="Ingrese el titulo del archivo"
                                value={this.state.titulo}
                                onChange={this.handleInputChange}
                                required
                            /> */}
                            <MDBInput
                                label="Ingrese el titulo del arhivo"
                                icon="file-pdf-o"
                                group
                                type="text"
                                validate
                                name="titulo"
                                error="wrong"
                                value={this.state.titulo}
                                onChange={this.handleInputChange}
                                required
                                success="right"
                            />
                            <br />
                            <label
                                className="grey-text font-weight-light text-left">
                                Descripción *
                            </label>
                            {/* <input
                                type="text"
                                name="descripcion"
                                className="form-control"
                                value={this.state.descripcion}
                                onChange={this.handleInputChange}
                                placeholder="Descripcion"
                                required
                            /> */}
                            <MDBInput
                                label="Ingrese la descripcion del arhivo"
                                icon="newspaper-o"
                                group
                                type="text"
                                validate
                                name="descripcion"
                                error="wrong"
                                value={this.state.descripcion}
                                onChange={this.handleInputChange}
                                required
                                success="right"
                            />
                            <label
                                className="grey-text font-weight-light text-left mx-5">
                                Elija archivo *
                            </label>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                className="form-control ml-5"
                                onChange={(e) => this.fileSelectedHandler(e)}
                                required
                                ref={fileInput => this.fileInput = fileInput}
                            />
                            <Button
                                onClick={() => this.fileInput.click()}
                                outline
                                required
                                className="center m-5"
                                color="danger"
                            >
                                <Fa
                                    icon="cloud-upload"
                                    size="3x"
                                    className="m-5"
                                >
                                </Fa>
                            </Button>
                            <br />
                            <Button
                                type="submit"
                                className="m-5 align-text-bottom"
                                outline
                                color="primary">
                                Guardar 
                                <Fa icon="paper-plane-o"></Fa>
                            </Button>
                        </form>
                        {this.mensageShow()}
                    </div>
                </div>
            </div>
        )
    }
}
export default uploadMyFile;
