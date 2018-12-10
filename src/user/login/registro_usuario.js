import React, { Component } from 'react'
import axios from 'axios'
import { signup } from '../../actions/constante'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            apellidos: '',
            correo: '',
            carrera: '',
            contraseña: ''
        }
        this.input = this.input.bind(this)
        this.registro = this.registro.bind(this)
    }
    registro(e) {
        e.preventDefault();
        const nombre = this.state.nombre
        const apellidos = this.state.apellidos
        const correo = this.state.correo
        const carrera = this.state.carrera
        const contraseña = this.state.contraseña
        const data = {
            nombre,
            apellidos,
            correo,
            carrera,
            contraseña
        }
        axios.post(signup, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    input(e) {
        const { value, name } = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.registro}>
                    <input
                        name="nombre"
                        value={this.state.nombre}
                        placeholder="Ingrese nombre"
                        onChange={this.input}
                    />
                    <input
                        name="apellidos"
                        value={this.state.apellidos}
                        placeholder="Ingrese apellidos"
                        onChange={this.input}
                    />
                    <input
                        name="carrera"
                        value={this.state.carrera}
                        placeholder="Ingrese carrera"
                        onChange={this.input}
                    />
                    <input
                        name="correo"
                        value={this.state.correo}
                        placeholder="Ingrese correo"
                        onChange={this.input}
                    />
                    <input
                        name="contraseña"
                        value={this.state.contraseña}
                        placeholder="Ingrese contraseña"
                        onChange={this.input}
                    />
                    <button>
                        aceptar
                    </button>
                </form>
            </div>
        )
    }
}
export default Login