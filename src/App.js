import './App.css';
import React, { useState } from 'react';
import Data from './Data';
import { useSelector, useDispatch } from 'react-redux';
import { addValue } from './app/Slices';

function App() {

  const btnClasess = 'btn btn-success btn-outline-warning';
  const [inputText, setInputText] = useState('');
  const [formdisplay, setFormDisplay] = useState('d-none');
  const [btnDisplay, setBtnDisplay] = useState(btnClasess);

  const { value, pendingData, completeData } = useSelector(state => state);

  const dispatch = useDispatch();

  function savePendingData() {
    const inputfield = document.getElementById('post');
    if (inputText.replace(/\s/g, "") !== '') {
      dispatch(addValue(inputText));
      setInputText('');
      setFormDisplay('d-none');
      setBtnDisplay(btnClasess);
    } else {
      alert(' Write Something .... ');
      inputfield.focus();
    }
  }

  const something = (event) => {
    if (event.keyCode === 13) {
      savePendingData();
    }
  };

  React.useEffect(() => {

    const handleClick = (event) => {
      const inputfield = document.getElementById('post');
      if (event.keyCode === 107 || event.keyCode === 65) {
        // event.preventDefault(); 
        setFormDisplay('fixed-bottom d-block');
        setBtnDisplay('d-none');
        inputfield.focus();
      } else if (event.keyCode === 27) {
        setInputText('');
        setFormDisplay('d-none');
        setBtnDisplay(btnClasess);
      } else if (event.keyCode === 123) {
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', handleClick);

    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, []);

  return (
    <>
      <h1 className='text-center m-3' > PMS ! </h1>

      <div className='text-end me-3' style={ { height: '45px' } }>
        <button className={ btnDisplay } onClick={ () => {
          setFormDisplay('fixed-bottom d-block');
          setBtnDisplay('d-none');
        } }>Add Data</button>
      </div>

      <hr className='mx-3' />

      <div className='row w-100 mb-5'>

        {/* Part 1 Start */ }

        <div className='col-md-4 py-3 bg-danger text-white'>
          <h2 className='text-center text-decoration-underline'> To Do </h2>
          <div className='border-right '>
            { value.map((text, index) => {
              return (
                <Data btntext='Pending' text={ text } removeFunction='removeValue' number={ index } key={ index } />
              );
            }) }
          </div>
        </div>

        {/* Part 1 End */ }

        {/* Part 2 Start */ }

        <div className='col-md-4 py-3 bg-warning'>
          <h2 className='text-center text-decoration-underline'> Doing </h2>
          <div className='border-right'>
            { pendingData.map((text, index) => {
              return (
                <Data text={ text } btntext='Complete' removeFunction='removePendingData' number={ index } key={ index } />
              );
            }) }
          </div>
        </div>

        {/*  {/* Part 2 End */ }

        {/* Part 3 Start */ }

        <div className='col-md-4 py-3 bg-success text-white'>
          <h2 className='text-center text-decoration-underline'> Done </h2>

          <div className='border-right'>
            { completeData.map((text, index) => {
              return (
                <Data text={ text } btntext='Post' completeRemove='Remove Data' removeFunction='removeCompleteData' number={ index } key={ index } />
              );
            }) }
          </div>
        </div>
        {/* Part 3 End */ }

      </div>

      <div className={ formdisplay }>
        <div className="input-group bottomFix p-1 bg-dark text-white">
          <input type="text" onKeyDown={ (e) => something(e) } id='post' value={ inputText } onChange={ (e) => setInputText(e.target.value) } className="form-control ms-2 my-2  bg-dark text-white" placeholder=" Post Here ..." />
          <button onClick={ savePendingData } className=" bg-dark text-white input-group-text mb-2 me-2 ">

            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" fill="currentColor" style=
              { { transform: 'rotate(45deg)' } } viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
