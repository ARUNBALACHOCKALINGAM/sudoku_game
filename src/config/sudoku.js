import Axios from 'axios';


async function generateSudoku(difficulty){
    const res= await Axios.get('https://sugoku2.herokuapp.com/board?difficulty=easy');
    const sol= await Axios.post('https://sugoku2.herokuapp.com/solve',res.data);
    return [res.data.board,sol.data.solution];
}

export default generateSudoku;