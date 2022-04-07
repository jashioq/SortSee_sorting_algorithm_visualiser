import './array.css';
import { v4 as uuid } from 'uuid';

const Array = ({ array }) => {
    const boxWidth = 80 / array.length;
    const boxMargin = 10 / array.length;
    const boxHeight = window.innerHeight * 0.0006;
  return (
    <div className='array-container'>
      {array.map((item, index) => 
      <div 
      className='array-bar' 
      key={uuid()}
      style={{height: `${boxHeight * item}px`, width: `${boxWidth}%`, marginLeft: `${boxMargin}%`, marginRight: `${boxMargin}%`}}></div>
      )}
    </div>
  )
}

export default Array
