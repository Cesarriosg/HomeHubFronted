import Inputs from '../componentes/Inputs.jsx';
import { Link } from 'react-router-dom';
import '../hojasEstilos/Ingreso.css';
import { useState } from 'react';

function Ingreso() {

    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [contras, cambiarContras] = useState({campo: '', valido: null});

    const expresiones = {
      usuario: /^[a-zA-Z0-9_-]{4,16}$/, //letras, numeros, guion y guion bajo
      contras: /^.{4,12}$/, // de 4 a 12 digitos
  }

    const onSubmits = async (e) => {
        e.preventDefault();
        // Verifica las credenciales en la base de datos (aquí debes hacer una solicitud al backend)
        if(usuario.valido === 'true' && contras.valido === 'true'){
          let datos = {user: usuario.campo, password: contras.campo}
          let datosJSON = JSON.stringify(datos)

          fetch('http://localhost:8000/login', {
              method: 'POST',
              body: datosJSON,
              headers: {
                  'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea JSON si estás enviando datos JSON
              },
              })      
              .then(response => {
                if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json(); // Suponiendo que el servidor responde con JSON
            })
            .then(data => {
                // Manejar la respuesta exitosa aquí
                //recojo todos los datos y los mandare al backend
                console.log('Respuesta exitosa:', data);
                cambiarUsuario({campo:'',valido: 'null'})
                cambiarContras({campo:'',valido: 'null'})
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                console.log("adios")
            });
            
        } else {
          console.log("hola")
        } 
      }

    return(
        <div id='principal-login'>
            <form id='contenedor-login' onSubmit={onSubmits}>
                <p id='texto-login'>Inicia sesión</p>

                <Inputs 
                    tipo='text'
                    texto='Telefono, e-mail o usuario'
                    estado={usuario}
                    error='Debe ser un telefono valido'
                    cambiarEstado={cambiarUsuario}
                    expresionRegular={expresiones.usuario}
                />
                <Inputs 
                    tipo='password'
                    texto='Contraseña'
                    estado={contras}
                    error='Debe ser un telefono valido'
                    cambiarEstado={cambiarContras}
                    expresionRegular={expresiones.contras}
                />
                
                <div><button id='btn-login' type='submit'>Continuar</button></div>

                <div id='contenedor-rutas'>
                    <nav>
                        <ul>
                            <li><Link to='/Recuperar' id='window1'>Olvide mi contraseña</Link></li>
                            <li><Link to='/Registro' id='window1'>Crear cuenta</Link></li>
                        </ul>
                    </nav>
                </div>
            </form>
        </div>
    );
}

export default Ingreso;