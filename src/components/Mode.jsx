import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Mode() {
  const [anchorEl, setAnchorEl] = React.useState();
  const [mode,setMode] = React.useState("Mode");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = (e) => {
    setMode(e.currentTarget.id);
    setAnchorEl(null);
  };

  return (
    <div className="mode">
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        endIcon={<ArrowDropDownIcon/>}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       {mode}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem id="Easy" onClick={handleClose}>Easy</MenuItem>
        <MenuItem id="Medium" onClick={handleClose}>Medium</MenuItem>
        <MenuItem id="Hard" onClick={handleClose}>Hard</MenuItem>
      </Menu>
    </div>
  );
}


export default Mode;