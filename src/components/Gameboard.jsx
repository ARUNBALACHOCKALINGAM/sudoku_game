import React,{useContext} from 'react';
import GlobalContext from '../context/GlobalContext';
import {Numbers }from "./Numpad"




export const Gameboard = (props) => {
  const rows = [0,1,2,3,4,5,6,7,8];
  let {numberSelected,gameboard,cellSelected,initboard } = useContext(GlobalContext);
  gameboard=gameboard.flat(Infinity);

  function _isCellRelatedToSelectedCell(row, column) {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    let rowOfSelectedCell = Math.floor(cellSelected / 9);
    let columnOfSelectedCell = cellSelected % 9;
    if (rowOfSelectedCell === row || columnOfSelectedCell === column) {
      return true;
    }
    return [  [0,3,0,3],
              [0,3,3,6],
              [0,3,6,9],
              [3,6,0,3],
              [3,6,3,6],
              [3,6,6,9],
              [6,9,0,3],
              [6,9,3,6],
              [6,9,6,9]
            ].some((array) => {
              if (rowOfSelectedCell > array[0]-1 && row > array[0]-1 &&
                  rowOfSelectedCell < array[1] && row < array[1] &&
                  columnOfSelectedCell > array[2]-1 && column > array[2]-1 &&
                  columnOfSelectedCell < array[3] && column < array[3])
                  return true;
              return false;
            });
  }

  /**
   * Cell Highlight Method 2: Highlight all cells with
   * the same number as in the current cell.
   */
  function _isCellSameAsSelectedCell(row, column) {
    
      if (numberSelected === gameboard[row * 9 + column]) {
        return true;
      }

      if (cellSelected === row * 9 + column) {
        return true;
      }
      if (gameboard[cellSelected] === '0') {
        return false;
      }
      if (gameboard[cellSelected] === gameboard[row * 9 + column]) {
        return true;
      }
    
  }

 
  function _selectedCell(indexOfArray, value, highlight) {
    if (value !== '0') {
      if (initboard[indexOfArray] === '0') {
        return (
          <td className={`game__cell game__cell--userfilled game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
        )
      } else {
        return (
          <td className={`game__cell game__cell--filled game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
        )
      }
    } else {
      return (
        <td className={`game__cell game__cell--${highlight}selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
      )
    }
  }

  /**
   * Returns the classes or a cell not related to the selected cell.
   */
  function _unselectedCell(indexOfArray, value) {
    if (value !== '0') {
      if (initboard[indexOfArray] === '0') {
        return (
          <td className="game__cell game__cell--userfilled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
        )
      } else {
        return (
          <td className="game__cell game__cell--filled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
        )
      }
    } else {
      return (
        <td className="game__cell" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value===0?"":value}</td>
      )
    }
  }

  return (
    <section className="game">
      <table className="game__board">
        <tbody>
          {
            rows.map((row) => {
              return (
                <tr className="game__row" key={row}>
                  {
                    rows.map((column) => {
                      const indexOfArray = row * 9 + column;
                      const value = gameboard[indexOfArray];

                      if (cellSelected === indexOfArray) {
                        return _selectedCell(indexOfArray, value, 'highlight');
                      }

                      
                       
                        if (cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                          return _selectedCell(indexOfArray, value, '');
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
    </section>
  )
}
