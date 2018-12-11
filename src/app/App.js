import React, { Component } from 'react';
/**
 * -------------------------------------------
 ARCHIVOS PARA EL LA CONEXION DE
 * -------------------------------------------
 */
import { Route, Router, Switch } from 'react-router'
import Home from '../views/Home'
import PropTypes from 'prop-types'
import DocumentoDetail from '../views/DocsDetail'
import FormData from '../views/FormularioData'
import Inicio from '../views/Inicio'
import Buscar from '../buscar/BUSCAR'
/**
-----------------------------
LOGIN CON EL API REST 
-------------------------------
*/
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import inicio_sesion from '../user/login/iniciar_sesion'
import registro_usuario from '../user/login/registro_usuario'
import Signup from '../user/signup/Signup';
import LoadingIndicator from '../actions/LoadingIndicator';
import { Layout, notification } from 'antd';
const { Content } = Layout;
/**
 * -------------------
 * FIN DE LO AGREGADO 
 * -------------------
 * */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }
  componentDidMount() {
    this.loadCurrentUser();
  }
  handleLogout(redirectTo = "/", notificationType = "success", description = "Cerro sesion satisfactoriamente") {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push(redirectTo);
    notification[notificationType]({
      message: 'Integrador CMS',
      banner:true,
      description: description,
    });
  }
  handleLogin() {
    notification.success({
      message: 'Integrador CMS',
      description: "Inicio sesion satisfactoriamente.",
    });
    this.loadCurrentUser();
    this.props.history.push("/home");
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
      <Layout className="app-container">
        <Router history={this.props.history}>
          <div className="App">
            <Content>
              <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/home" component={Home} />
                {/* se elimo solamente sera un componente */}
                {/* <Route path="/nav" component={Nav}/> */}
                {/* fin del nav */}
                <Route path="/detail/:docuId" component={DocumentoDetail} />
                <Route path="/subirDocs" component={FormData} />
                <Route path="/buscar" component={Buscar} />
                <Route path="/orlando" component={inicio_sesion} />
                <Route path="/camavilca" component={registro_usuario} />
                {/* <Route exact path="/login" component={ Login }/> */}
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
                <Route path="/signup" component={Signup} />
                {/* <Route path="/home" component={ Home }/> */}
                {/* <Route component={NotFun} /> */}
              </Switch>
            </Content>
          </div>
        </Router>
      </Layout>
    );
  }
}
App.propTypes = {
  history: PropTypes.any.isRequired
}
export default App;
