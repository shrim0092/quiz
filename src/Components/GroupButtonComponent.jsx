import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function GroupButtonComponent() {
    const [view, setView] = React.useState('');

    const handleChange = (event, nextView) => {
      setView(nextView);
    };

  return (
    <div>
        <ToggleButtonGroup orientation="vertical" value={view} color='primary' exclusive onChange={handleChange}>
            <ToggleButton value='a1'>Answer 1</ToggleButton>
            <ToggleButton value='a2'>Answer 2</ToggleButton>
            <ToggleButton value='a3'>Answer 3</ToggleButton>
            <ToggleButton value='a4'>Answer 4</ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}
