import React,{useContext} from 'react';
import GlobalContext from '../context/GlobalContext';


export const Numbers = ({ onClickNumber }) => {
  let { numberSelected } = useContext(GlobalContext);

  return (
    <div className="status__numbers">
      {
        [1,2,3,4,5,6,7,8,9].map((number) => {
          if (numberSelected === number.toString()) {
            return (
              <div className="status__number status__number--selected" key={number} onClick={() => onClickNumber(number.toString())}>{number}</div>
            )
          } else {
            return (
              <div className="status__number" key={number} onClick={() => onClickNumber(number.toString())}>{number}</div>
            )
          }
        })
      }
    </div>
  )
}
