import React from 'react'


const Button = ({ funcionQueSeteaEstado, valorEstado }) => {
  return (
    <button onClick={() => funcionQueSeteaEstado((valorActualEstado) => valorEstado >= 10 ? valorActualEstado : valorEstado + 1)}>
        
    </button>
  )
}

export default Button