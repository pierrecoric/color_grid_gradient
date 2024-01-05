import React, { useState, useEffect, useRef } from 'react';

const colorValues = ['#ffffff', '#D8DBE2', '#E3170A', '#FF9505', '#011936', '#26516C', '#000000'];
//style={{background: `linear-gradient(${colorValues[props.col1]}, ${colorValues[props.col2]}`}}

//function to generate random integer
function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    // Generate a random integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

function getRandomFloat(min, max) {
  console.log(Math.random() * (max - min) + min);
  return Math.random() * (max - min) + min;
}



function Cells(props) {

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const cardDivRef = useRef(null);

    useEffect(() => {
      const updateDimensions = () => {
        const divWidth = cardDivRef.current.offsetWidth;
        let divHeight = (2/3) * divWidth;
        setWidth(divWidth);
        setHeight(divHeight);
      }
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }, []);

    const gradientStyle1 = {
        height: `${height}px`,
        background: `linear-gradient(45deg, ${colorValues[props.col1]}, ${colorValues[props.col2]}`,
        //animation: 'rotateGradient 10s linear infinite', 
      };
      const gradientStyle2 = {
        background: `linear-gradient(45deg, ${colorValues[props.col3]}, ${colorValues[props.col4]}`,
        animation: `rotateGradient ${getRandomFloat(0.5,7)}s linear infinite`,
      };
    return(
        <>
        <div id={`${props.id}`} className={`animated-gradient h-2 flex justify-center items-center`} style={gradientStyle1} ref={cardDivRef}>
            <div className={`rounded-full w-[25%] h-[25%] flex justify-center items-center transition-all duration-100`} style={gradientStyle2}>
            </div>
        </div>
        </>
    );
}

export default Cells;