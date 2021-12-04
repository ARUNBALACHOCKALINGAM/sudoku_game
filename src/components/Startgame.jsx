import React from "react"

//material ui components
import {Card,Button} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Mode from "./Mode";
import { Router, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Startgame(props) {
 
  return (
    <>

      <Card className="startgame_card" elevation={5}>
         <Link style={{textDecoration:"none"}} to="/game"><Button onClick={props.onClick} size="large" variant="outlined" startIcon={<PlayArrowIcon/>}>Start game</Button></Link>
         <Mode/>
      </Card>
 
    </>
  )
}

export default Startgame