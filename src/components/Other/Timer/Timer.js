import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const getEndTime = () => {
  let endTime = JSON.parse(window.localStorage.getItem('timer'));
  endTime = new Date(endTime);
  return endTime;
};

const initialTime = (endTime, props) => {
  
  const now = new Date();
  const diff = endTime - now;
  
  if (diff <= 0 && props) props.reset();
  
  let hoursLeft = Math.floor(diff / 3600000);
  let minutesLeft = Math.floor((diff - hoursLeft *3600000) / 60000);
  let secondsLeft = Math.floor((diff - hoursLeft *3600000 - minutesLeft * 60000) / 1000);
  
  const addZero = (value) => {
    return value < 10 
      ? '0' + value 
      : value;
  };

  return {
    hoursLeft: addZero(hoursLeft),
    minutesLeft: addZero(minutesLeft),
    secondsLeft: addZero(secondsLeft),
  };
};

function Timer(props) {

  const [timer, setTimer] = useState(initialTime(getEndTime()));
  
  useEffect(() => {
    const endTime = getEndTime(); 

    const interval = setInterval(() => {
      setTimer(initialTime(endTime, props));
    }, 1000);

    return () => clearInterval(interval);
  }, [])
    
  return (
    <div className='d-flex justify-content-center'>
      <table className='mb-2'>
        <thead>
          <tr>
            <th className='h4'>
              <span className='badge bg-dark mx-3'>{timer.hoursLeft}</span>
            </th>
            <th>:</th>
            <th className='h4'>
              <span className='badge bg-dark mx-3'>{timer.minutesLeft}</span>
            </th>
            <th>:</th>
            <th className='h4'>
              <span className='badge bg-dark mx-3'>{timer.secondsLeft}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hours</td>
            <td></td>
            <td>minutes</td>
            <td></td>
            <td>seconds</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Timer.propTypes = {
reset: PropTypes.func.isRequired,
};
  
export default Timer;
