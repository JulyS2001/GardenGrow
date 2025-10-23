import React, { useEffect} from 'react'

function ComponenteEfecto() {

    useEffect (() => {
        console.log('El componente se ha montado');
    }, []); //Arreglo vacia: ejecuta solo al montar

  return (
    <h1>Hola mundo</h1>
  )
}

export default ComponenteEfecto