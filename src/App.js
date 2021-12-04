//react hooks
import React,{useState} from 'react';
import {BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom";



//styles
import './App.css';

//API
import generateSudoku from './config/sudoku';

//context
import GlobalContext from "./context/GlobalContext";

//components
import Startgame from './components/Startgame';
import {Gameboard} from './components/Gameboard';





function App() {


  //intial board
  const [initboard,setinitBoard] = useState([]);
  const [gameboard,setGameboard]=useState([]);
  let [ history, setHistory ] = useState([]);
  const [cellSelected,setCellSelected] = useState();
  const [solved,setsolvedBoard] = useState([]);
  const [numberSelected,setnumberSelected]=useState();
  const [overlay,setOverlay]=useState();
  const [won,setWon]= useState();
  
  //function to create game
  async function createGame(){
   let [tempinit,tempsolved]= await generateSudoku("easy");
   let tempArray= tempinit.flat(Infinity);
   let tempSol=tempsolved.flat(Infinity)
   setinitBoard(tempArray);
   setGameboard(tempArray);
   setsolvedBoard(tempSol);
   
  }

  function onClickCell(indexOfArray) {
    if (numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }

  function onClickNumber(number) {
    if (cellSelected !== -1) {
      _userFillCell(cellSelected,number);
       
    }
  }

  function _userFillCell(index, value) {
    
      _fillCell(index, value);
      console.log(index,value);
    
  }


  function _fillCell(index, value){
    console.log(initboard.flat(Infinity)[index]);
    if (initboard.flat(Infinity)[index] === 0) {
      
      let tempArray = gameboard.slice();
      let tempHistory = history.slice();

      tempHistory.push(gameboard.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameboard(tempArray);
      console.log(gameboard);

      if (_isSolved(index, value)) {
        setOverlay(true);
        setWon(true);
      }
    }
  }

  function onClickOverlay() {
    setOverlay(false);
    createGame();
  }


  function _isSolved(index, value) {
    if (gameboard.every((cell, cellIndex) => {
          if (cellIndex === index)
            return value === solved[cellIndex];
          else
            return cell === solved[cellIndex];
        })) {
      return true;
    }
    return false;
  }


  return (
    <GlobalContext.Provider value={{numberSelected,gameboard,cellSelected,initboard }}>
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Startgame onClick={createGame}/>}/>
        <Route exact path="/game" element={<Gameboard board={initboard} onClickNumber={(number) => onClickNumber(number)} onClick={(indexOfArray) => onClickCell(indexOfArray)} />}/>
      </Routes>
    </Router>
    <div className= { overlay
                        ? "overlay overlay--visible"
                        : "overlay"
                      }
           onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          You <span className="overlay__textspan1">solved</span> <span className="overlay__textspan2">it!</span>
        </h2>
      </div>
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
