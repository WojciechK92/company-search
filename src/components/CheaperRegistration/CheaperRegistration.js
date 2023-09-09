import { useState } from 'react';
import Timer from '../Other/Timer/Timer';

function CheaperRegistration() {
  const [timer, setTimer] = useState(true);

  const resetTimer = () => {
    setTimer(false);
  };

  if (timer) {
    return (
      <div className='card my-3 mx-3 text-center'>
        <div className='card-header h4 bg-warning'>Special offer for you!</div>
        <div className='card-body'>
          <p>You stil have time to register with a 25% discount:</p>
          <Timer hours={0} minutes={0} seconds={15} reset={resetTimer} />
        </div>
      </div>
    );
  } else {
    return null;
  };

};

export default CheaperRegistration;