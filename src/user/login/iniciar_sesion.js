import React, {Component} from 'react'
import axios from 'axios'
import {login} from '../../actions/constante'
class Login extends Component{
    constructor() {
        super();
        this.state = {
            username: '',
            password:''
        };
        this.input = this.input.bind(this)
        this.sesion = this.sesion.bind(this)
    }
    // {
    //     "username":"admin",
    //       "password":"12345"
    // }
    sesion(e) {
        e.preventDefault();
        const username = this.state.username
        const password = this.state.password
        const data = {
            username,
            password
        }
        axios.get(login, data)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
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
    render(){
        return(
            <div>
                <form onSubmit={this.sesion}>
                    <input 
                        name="username"
                        value={this.state.username}
                        placeholder="Ingrese usuario"
                        onChange={this.input}
                    />
                    
                    <input 
                        name="password"
                        value={this.state.password}
                        placeholder="Ingrese constraseña"
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