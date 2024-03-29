import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cells from './assets/components/Cells.jsx'

function App() {

  let amountCols = 5;
  let amountRows = 30;
  let amountColors = 3;

  let randomArrayCells_1 = populate2DArray(amountCols, amountRows, amountColors, generate2DArray(amountCols, amountRows, 0));
  let randomArrayCells_2 = generateDifferentArray(amountCols, amountRows, randomArrayCells_1);

  let randomArrayCells_3 = populate2DArray(amountCols, amountRows, amountColors, generate2DArray(amountCols, amountRows, 0));
  let randomArrayCells_4 = generateDifferentArray(amountCols, amountRows, randomArrayCells_3);

  console.log(randomArrayCells_1);
  console.log(randomArrayCells_2);

  //function to initialize the array
  function generate2DArray (cols, rows, content) {
    let theArray = [];
    for (let y = 0; y < rows; y++) {
      let currentRow = []
      for (let x = 0; x < cols; x++) {
        currentRow.push(content);
      }
      theArray.push(currentRow);
    }
    return theArray;
  }

  //function to populate the array with random numbers
  function populate2DArray (cols, rows, maxColors, theArray) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let randomValue;
        do {
          randomValue = getRandomInt(0, maxColors);
        } while (hasSameNeighbor(theArray, y, x, randomValue));
        theArray[y][x] = randomValue;
      }
    }
    return theArray;
  }

  //funcion to change an array
  function generateDifferentArray (cols, rows, originalArray) {
    let theArray = [];
    for (let y = 0; y < rows; y++) {
      let currentRow = []
      for (let x = 0; x < cols; x++) {
        let newValue = generateDifferentNumber(originalArray[y][x]);
        currentRow.push(newValue);
      }
      theArray.push(currentRow);
    }
    return theArray;
  }


  //function to check if the neighbors have the same value
  function hasSameNeighbor(array, row, col, value) {
    const neighbors = [
      [row - 1, col], // Top
      [row + 1, col], // Bottom
      [row, col - 1], // Left
      [row, col + 1]  // Right
    ];
    // Check if one of the neighbors has the same value
    for (const neighbor of neighbors) {
      const r = neighbor[0];
      const c = neighbor[1];
      // Check if the neighbor coordinates are within bounds and have the same value
      if (r >= 0 && r < array.length && c >= 0 && c < array[0].length && array[r][c] === value) {
        return true; // Value is the same as a neighbor
      }
    }
    return false; // No neighbor has the same value
  }

  //function to generate random integer
  function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    // Generate a random integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  //generate a different number than the one given as argument
  function generateDifferentNumber(initial) {
    let result = initial;
    do {
      result = getRandomInt(0, amountColors);
    } while (result == initial);
    return result
  }


  //generate all the cells 
  let allCells = [];
  for (let y = 0; y < amountRows; y++) {
    for (let x = 0; x < amountCols; x++) {
      allCells.push(
        <Cells 
          key={y*amountCols+x} 
          id={`cells${y*amountCols+x}`} 
          col1={`${randomArrayCells_1[y][x]}`}
          col2={`${randomArrayCells_2[y][x]}`}
          col3={`${randomArrayCells_3[y][x]}`}
          col4={`${randomArrayCells_4[y][x]}`}
          text={randomArrayCells_1[y][x]}
        />
      );
    }
  }

  







  return (
    <>
    <div className={`grid grid-cols-5 gap-0`}>
      {allCells}
    </div>
    </>
  )
}

export default App
