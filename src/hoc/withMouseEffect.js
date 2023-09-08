import { useEffect, useState } from 'react';

function withMouseEffect(WrappedComponent) {
  
  const Hoc = (props) => {
    
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
    });

    const mousePosition = (e) => {
      setPosition({
        ...position, 
        x: e.pageX, 
        y: e.pageY
      }); 
    };

    useEffect(() => {
      document.body.addEventListener('mousemove', mousePosition);
    }, []);

    return (
      <WrappedComponent 
        {...props} 
        mouseX={position.x} 
        mouseY={position.y}/> 
    );
  };

  return Hoc;
};

export default withMouseEffect;