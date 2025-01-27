import React from "react"

function Timer() {
    let [currentTime, setCurrentTime] = useState(moment());
    let { timeGameStarted, won } = useSudokuContext();
  
    useEffect(() => {
      if (!won)
        setTimeout(() => tick(), 1000);
    });
  
    function tick() {
      setCurrentTime(moment());
    }
  
    function getTimer() {
      let secondsTotal = currentTime.diff(timeGameStarted, 'seconds');
      if (secondsTotal <= 0)
        return '00:00';
      let duration = moment.duration(secondsTotal, 'seconds');
      let hours = duration.hours();
      let minutes = duration.minutes();
      let seconds = duration.seconds();
      let stringTimer = '';
  
      stringTimer += hours ? '' + hours + ':' : '';
      stringTimer += minutes ? (minutes < 10 ? '0' : '') + minutes + ':' : '00:';
      stringTimer += seconds < 10 ? '0' + seconds : seconds;
  
      return stringTimer;
    }
  
    return (
      <div className="status__time">{getTimer()}
      </div>
    )
}

export default Timer