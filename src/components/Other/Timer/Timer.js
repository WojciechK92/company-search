import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';

function Timer(props) {

  const addZero = (value) => {
    return value < 10 
      ? '0' + value 
      : value;
  };

  const hoursLeft = addZero(props.hours);
  const minutesLeft = addZero(props.minutes);
  const secondsLeft = addZero(props.seconds - 1);

  const { color } = useContext(ThemeContext);
  const [timer, setTimer] = useState({
    hoursLeft,
    minutesLeft,
    secondsLeft,
  });

  
  useEffect(() => {
    let endTime = new Date();
    endTime.setHours(endTime.getHours() + props.hours);
    endTime.setMinutes(endTime.getMinutes() + props.minutes);
    endTime.setSeconds(endTime.getSeconds() + props.seconds);
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endTime - now;
      
      if (diff <= 0) props.reset();
      
      let hoursLeft = Math.floor(diff / 3600000);
      let minutesLeft = Math.floor((diff - hoursLeft *3600000) / 60000);
      let secondsLeft = Math.floor((diff - hoursLeft *3600000 - minutesLeft * 60000) / 1000);
      
      hoursLeft = addZero(hoursLeft);
      minutesLeft= addZero(minutesLeft);
      secondsLeft= addZero(secondsLeft);
      
      setTimer({...timer, hoursLeft, minutesLeft, secondsLeft});
      
    }, 1000);
    
    return () => clearInterval(interval);
   
    
  }, []);

  const expression = (
    <div>
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
      <a href="#" className={`btn btn-${color}`}>Register</a>
    </div>
    );
    
  return (
    <div className='d-flex justify-content-center'>
      {expression}
    </div>
  );
};

  Timer.defaultProps = {
    hours: 1,
    minutes: 45,
    seconds: 45, 
  };
  
  Timer.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  reset: PropTypes.func.isRequired,
  };
  
export default Timer;
