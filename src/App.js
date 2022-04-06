import './app.css'
import { useEffect, useState } from "react";
import Array from "./components/Array";

function App() {
  const [array, setArray] = useState([])
  const [sortRunning, setSortRunning] = useState(false)
  const [arrayRender, setArrayRender] = useState([])
  const [arraySize, setArraySize] = useState(100)
  const [sortSpeed, setSortSpeed] = useState(5)
  const [selectValue, setSelectValue] = useState('bubble')

  useEffect(() => {
    document.title = 'SortSee';
  }, []);

  useEffect(() => {
    setArray(arrayRender)
  }, [arrayRender])

  useEffect(() => {
    generateNewArray()
  }, [arraySize])

  useEffect(() => {
    generateNewArray()
  }, [])

// Genarating new array when sort not running

  const generateNewArray = () => {
    const newArray = []
    for(let i = 0; i < arraySize; i++) {
      // From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
      newArray.push(Math.floor(Math.random() * (1000 - 5 + 1)) + 5)
    }
    if (!sortRunning) {
      setArray(newArray)
    }
  }

// Parameter adjustments

  const handleSizeChange = (event) => {
    setArraySize(event.target.value)
  }

  const handleSpeedChange = (event) => {
    setSortSpeed(event.target.value)
  }

  const handleSelectValue = (event) => {
    setSelectValue(event.target.value)
  }

// Handling algorithim choice

  const sort = () => {
    if (!sortRunning) {
      switch(selectValue) {
        case 'bubble':
          bubbleSort()
          break
        case 'insertion':
          insertionSort()
          //quickSort()
          break
        case 'selections':
          selectionsSort()
          break
        case 'cocktail':
          cocktailSort()
          //mergeSort()
          break
        case 'shell':
          shellSort()
          break
      }
    }
  }

// Delay function for universal use in all algoritm functions

  const delay = (milisec) => {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
  }

// Bubble sort function

  const bubbleSort = async () => {
    setSortRunning(true)
    let newArray = [...array]
    let swaps;
    do {
      await delay(110 - sortSpeed * 10)
      swaps = false;
      for(let i=0;i<arraySize;i++){ 
        if(newArray[i]>newArray[i + 1]){        
          let temp = newArray[i];
          newArray[i] = newArray[i + 1];
          newArray[i + 1] = temp;
          swaps = true; 
        }   
      } 
      setArrayRender([...newArray])  // For use with useEffect() hook to handle asynchrous state updates
    }while(swaps)
    setSortRunning(false)
  }

// Selections sort function

  const selectionsSort = async () => {
    setSortRunning(true)
    let i, j, min_idx, temp;
    let newArray = [...array]
    for (i = 0; i < arraySize-1; i++)
    {
      await delay(110 - sortSpeed * 10)
      min_idx = i;
      for (j = i + 1; j < arraySize; j++)
        if (newArray[j] < newArray[min_idx])
            min_idx = j;
        temp = newArray[min_idx];
        newArray[min_idx] = newArray[i];
        newArray[i] = temp;
        setArrayRender([...newArray])  // For use with useEffect() hook to handle asynchrous state updates 
    }
    setSortRunning(false)
  }

  // Insertion sort function

  const insertionSort = async () => {
    setSortRunning(true)
    let newArray = [...array]
    for (let i = 1; i < arraySize; i++) {
      await delay(110 - sortSpeed * 10)
      let currentValue = newArray[i]
      let j
      for (j = i - 1; j >= 0 && newArray[j] > currentValue; j--) {
        newArray[j + 1] = newArray[j]
      }
      newArray[j + 1] = currentValue
      setArrayRender([...newArray]) // For use with useEffect() hook to handle asynchrous state updates 
    }
    setSortRunning(false)
  }

  // Cocktail sort function

  const cocktailSort = async () => {
    setSortRunning(true)
    let newArray = [...array]
    let start = 0, end = newArray.length, swapped = true;
    while (swapped) {
      await delay(110 - sortSpeed * 10)
      swapped = false;
      for (let i = start; i < end - 1; i++) {
        if (newArray[i] > newArray[i + 1]) {
          let temp = newArray[i];
          newArray[i] = newArray[i + 1];
          newArray[i + 1] = temp;
          swapped = true;   
        }
      }
      end--;
      if (!swapped)
        break;
      swapped = false;
      for (let i = end - 1; i > start; i--) {
        if (newArray[i - 1] > newArray[i]) {
          let temp = newArray[i];
          newArray[i] = newArray[i - 1];
          newArray[i - 1] = temp;
          swapped = true;
        }
      }
      start++;
      setArrayRender([...newArray])
    }
    setSortRunning(false)
  }
  
  // Shell sort function

  const shellSort = async () => {
    setSortRunning(true)
    let newArray = [...array]
    let n = newArray.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
      await delay(400 - sortSpeed * 40)
      for (let i = gap; i < n; i += 1) {
        let temp = newArray[i];	
        let j;
        for (j = i; j >= gap && newArray[j-gap] > temp; j-=gap) {
          newArray[j] = newArray[j-gap];
        }
        newArray[j] = temp;
      }
      setArrayRender([...newArray])
    }
    setSortRunning(false)
  }

  return (
    <div className="App">
      <header>
        <button id='reset' onClick={generateNewArray}>reset array</button>
        <div id='label1' className='labels'>
          <input value={arraySize} onChange={handleSizeChange} type={'range'} name='arraySize' min='10' max='350' step='10' />  
          <label htmlFor='arraySize'>Sample size {arraySize}</label>
        </div>
        <div id='label2' className='labels'>
          <input value={sortSpeed} onChange={handleSpeedChange} type={'range'} name='sortSpeed' min='1' max='10' step='1' />  
          <label htmlFor='sortspeed'>Sort speed {sortSpeed}</label>
        </div>
        <select onChange={handleSelectValue} name='algorithm' id='algorithm'>
          <option value='bubble'>Bubble sort</option>
          <option value='insertion'>Insertion sort</option>
          <option value='selections'>Selections sort</option>
          <option value='cocktail'>Cocktail sort</option>
          <option value='shell'>Shell sort</option>
        </select>
        <button id='sort' onClick={sort}>Sort</button>
      </header>
      <Array array={array} />
    </div>
  );
}

export default App;
