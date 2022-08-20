import React, { useState } from 'react';
import './App.css';
import Content from './components/Content';


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyVWc7psFCmYWDcd'}).base('appjdAtO3BEIEM36b');

const table = base('통합');
const data = [];

const getRecords = async () => {
  const records = await table.select({
      maxRecords: 99999,
      view: '가을학기 APP'
  }).eachPage((lists, fetchNextPage) => {
    lists.forEach((list) => data.push(list.fields))
    fetchNextPage();
  });
}

getRecords();


function App() {

  const [box, setBox] = useState(false)

  return (
    <div className="App">
      <p id='title'>Reservation Status</p>
        <p id='subtitle'>You can check your reservation status after the submission of the booking form.</p>
      <div id="search">
        
        
        <input id="email" placeholder='e-mail (same as reservation)'></input>
        {/* <input id="rcNumber" placeholder='password'></input> */}
        <button type="button" className="btn btn-primary btn-sm" id="searchBtn" onClick={() => {
          setBox(true);
          }}>Login</button>
       
          <div id="loading" className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
     

      </div>
      <p></p>
      <div className="container">
          {
            box === true
            ? 
            <Content 
            data={data}
            // pw={document.getElementById('rcNumber').value}
            em={document.getElementById('email').value}
            inputs={document.getElementById('search')}
            loading={document.getElementById('loading')}
            logo={document.getElementById('hirelogo')}
            />
            : null
          }
      </div>
    </div>
  )
}

export default App
