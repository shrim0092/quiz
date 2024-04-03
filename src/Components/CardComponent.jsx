import React from 'react'
import ButtonComponent from './ButtonComponent.jsx'
import TextComponent from './TextComponent.jsx';
import TextHeaderComponent from './TextHeaderComponent.jsx';
import Container from '@mui/material/Container'
import { Paper } from '@mui/material';
import GroupButtonComponent from './GroupButtonComponent.jsx';

export default function CardComponent(props) {
  return (
    <div>
      <Container maxWidth='sm'>
        <Paper elevation={4} style={{padding:'15px'}}>
          <TextComponent txt={props.txt}/>
          <TextHeaderComponent txt={props.Htxt}/>
          <GroupButtonComponent />
          <ButtonComponent txt={props.Btxt} color={props.Bcolor}/>
        </Paper>
      </Container>
    </div>
  );
}

