import './App.css';
import React, { useState } from 'react';
import Data from './Data';
import { useSelector, useDispatch } from 'react-redux';
import { addValue, deleteAllData, deleteValue, deletePendingData, deleteCompleteData } from './app/Slices';

// Main Function
function App() {
  const btnClasess = 'btn btn-success btn-outline-warning';
  const [inputText, setInputText] = useState('');
  const [formdisplay, setFormDisplay] = useState('d-none');
  const [btnDisplay, setBtnDisplay] = useState(btnClasess);
  const { value, pendingData, completeData } = useSelector(state => state);
  const dispatch = useDispatch();

  // Add / save data Function 
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

  // Save Data On Enter Press 
  const savePendingDataOnEnter = (event) => {
    if (event.keyCode === 13) {
      savePendingData();
    }
  };

  // Detect Keys 
  React.useEffect(() => {
    const handleClick = (event) => {
      const inputfield = document.getElementById('post');
      if (event.keyCode === 107 /*|| event.keyCode === 65*/) {
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
      } else if (event.keyCode === 46) {
        emptyAllData();
      }
    };
    window.addEventListener('keydown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, []);

  // Delete All Data from Arrays
  function emptyAllData() {
    if (window.confirm('Delete All Data')) { dispatch(deleteAllData()); }
  }

  // Main Function(App) Return
  return (
    <>
      <h1 className='text-center m-3' >
        <span className='text-danger'> P </span>
        <span className='text-warning'> M </span>
        <span className='text-success'> S </span>
      </h1>
      <div className='text-center h5' style={{ marginTop: -25 }}>
        <span className='text-danger text-decoration-underline'> post </span>
        <span className='text-warning text-decoration-underline'> management </span>
        <span className='text-success text-decoration-underline'> system </span>
      </div>

      <div className='text-end me-3'>
        <button className={btnDisplay} onClick={() => {
          setFormDisplay('fixed-bottom d-block');
          setBtnDisplay('d-none');
        }}>Add Data</button>

        <button className='btn btn-success btn-outline-warning mx-2' onClick={emptyAllData}> Empty ! </button>
      </div>

      <hr className='mx-3' />
      <div className='row w-100 mb-5'>
        {/* Part 1 Start */}

        <div className='col-md-4 py-3 bg-danger text-white'>
          <div className='row'>
            <p className='text-center h2 text-decoration-underline col-8'> To Do </p>

            <div className='col-3 text-end' onClick={() => dispatch(deleteValue())}>
              <p className='h1 btn-outline-danger btn-warning w-50 text-center rounded-circle' style={{ fontWeight: 'bold', cursor: 'pointer' }}> &#9249;   </p>
            </div>
          </div>

          <div className='border-right '>
            {value.map((text, index) => {
              return (
                <Data btntext='Pending' text={text} removeFunction='removeValue' number={index} key={index} />
              );
            })}
          </div>
        </div>

        {/* Part 1 End */}

        {/* Part 2 Start */}

        <div className='col-md-4 py-3 bg-warning'>
          <div className='row'>
            <p className='text-center h2 text-decoration-underline col-8'> Doing </p>
            <div className='col-3 text-end' onClick={() => dispatch(deletePendingData())}>
              <p className='h1 btn-outline-warning btn-danger w-50 text-center rounded-circle' style={{ fontWeight: 'bold', cursor: 'pointer' }}> &#9249;   </p>
            </div>
          </div>

          <div className='border-right'>
            {pendingData.map((text, index) => {
              return (
                <Data text={text} btntext='Complete' removeFunction='removePendingData' number={index} key={index} />
              );
            })}
          </div>
        </div>

        {/*  {/* Part 2 End */}

        {/* Part 3 Start */}

        <div className='col-md-4 py-3 bg-success text-white'>
          <div className='row'>
            <p className='text-center h2 text-decoration-underline col-8'> Done </p>
            <div className='col-3 text-end' onClick={() => dispatch(deleteCompleteData())}>
              <p className='h1 btn-outline-success btn-warning w-50 text-center rounded-circle' style={{ fontWeight: 'bold', cursor: 'pointer' }}> &#9249;   </p>
            </div>
          </div>

          <div className='border-right'>
            {completeData.map((text, index) => {
              return (
                <Data text={text} btntext='Post' completeRemove='Remove Data' removeFunction='removeCompleteData' number={index} key={index} />
              );
            })}
          </div>
        </div>

        {/* Part 3 End */}

      </div>

      {/* Add Data form */}

      <div className={formdisplay}>
        <div className="input-group bottomFix p-1 bg-dark text-white">
          <input type="text" onKeyDown={(e) => savePendingDataOnEnter(e)} id='post' value={inputText} onChange={(e) => setInputText(e.target.value)} className="form-control ms-2 my-2  bg-dark text-white" placeholder=" Post Here ..." />
          <button onClick={savePendingData} className=" bg-dark text-white input-group-text mb-2 me-2 ">

            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="30" fill="currentColor" style=
              {{ transform: 'rotate(45deg)' }} viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', margin: '30px' }}>
        <a href='https://digitalduniya.org' target='_blank' >Contact</a>
      </div>
    </>
  );
}

export default App;
