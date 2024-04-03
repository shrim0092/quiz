import React from 'react'
import { Button } from '@mui/material'

export default function ButtonComponent(props) {
  return (
    <div className='Button.css'>
        <Button variant="contained" color={props.color}>{props.txt}</Button>
    </div>
  );
}
