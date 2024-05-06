import { TextField } from '@mui/material'
import React, { useState } from 'react'

function Test()
{

  const [values, setValues] = useState()

  return(
    <form onSubmit={handleSubmit}>
      <TextField
        value={userName} 
        onChange={handleInput}
        placeholder='Username'
        type='text'
      />

      <TextField
        value={password} 
        onChange={handleInput}
        placeholder='Username'
        type='text'
      />

      <button type='submit'>Submit</button>

    </form>
  )

}

export default Test