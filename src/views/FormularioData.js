import React, { Component } from 'react'
// import FormularioDocs from '../components/subir_docs/FormularioDocs'
import FormularioDocs from '../subir_docs/UPLOAD'
import Nav from '../views/Nav'

class FormData extends Component{
    
    render(){
        return(
            <div>
                <Nav/>
                <div style={{marginLeft:'15rem'}}>
                <FormularioDocs/>
                </div>
            </div>
        )
    }
}

export default FormData;