import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = ({ children, isLoading }) => {
  return (
    <div>
    {isLoading && 
      <Spinner animation='border' role='status' >
        <span className='visually-hidden'>Loading...</span>

      </Spinner>
    }
        {children}
    </div>
  )
}

export default Loading