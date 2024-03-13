import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
import Scatterplot from "./Scatterplot";
import Datapoint from "./Datapoint";
import * as d3 from "d3";
import csv_example from "./graphs/random_points.csv";
import csv_0 from "./graphs/random_points_color_0.csv";
import csv_1 from "./graphs/random_points_color_1.csv";
import csv_2 from "./graphs/random_points_color_2.csv";
import csv_3 from "./graphs/random_points_color_3.csv";
import csv_4 from "./graphs/random_points_color_4.csv";
import csv_2_example from "./graphs/experiment2_example.csv"
import csv_2_0 from "./graphs/experiment2_random_points_saturated.csv"
import csv_2_1 from "./graphs/experiment2_random_points_second_farthest.csv"
import csv_2_2 from "./graphs/experiment2_random_points_light.csv"
import csv_2_3 from "./graphs/experiment2_random_points_muted.csv"
import csv_2_4 from "./graphs/experiment2_random_points_dark.csv"


var timeStart
var timeEnd

const timers = []

function App() {
  const csvFiles = [
    csv_example,
    csv_0,
    csv_1,
    csv_2,
    csv_3,
    csv_4,
    csv_2_example,
    csv_2_0,
    csv_2_1,
    csv_2_2,
    csv_2_3,
    csv_2_4,
  ];

  const [csvNumber, setcsvNumber] = useState(0);
  const [canGo, setCanGo] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(csvFiles[csvNumber]).then(function(csvData) {
      const formattedData = csvData.map(d => ({
        id: parseInt(d.line),
        x: parseFloat(d.x),
        y: parseFloat(d.y),
        color: d.Color,
      }));
      setData(formattedData);
    });
  }, [csvNumber]);

  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500
  });

  function navGraph(){
    console.log(csvNumber)
    document.getElementById("graph").style.display = "block";
    document.getElementById("intro").style.display = "none";
    document.getElementById("experiment2").style.display = "none";
    document.getElementById("break").style.display = "none";
    document.getElementById("breakAfterSample").style.display = "none";
    timeStart = performance.now()
    let timeStartTemp = timeStart
    setTimeout(()=>{if(timeStart === timeStartTemp) navBreak()}, 30000);  // 30 secs
  }

  
  function buildEnd(){
    let str = '<ul style="list-style:none">'
    for(let i = 0; i<timers.length; i++){
      str += '<li> Trial '+i+": "+timers[i]/1000+"s<li>"
    }
    str += '<ul>'
    document.getElementById("timerContainer").innerHTML = str;
  }


  function navBreak(){
    console.log(csvNumber)
    timeEnd = performance.now()
    if(csvNumber === 0){
      document.getElementById("break").style.display = "none";
      document.getElementById("breakAfterSample").style.display = "block";
      document.getElementById("graph").style.display = "none";
    }
    else if(csvNumber === 5){
      document.getElementById("graph").style.display = "none";
      document.getElementById("experiment2").style.display = "block";
    }
    else if(csvNumber === 6){
      document.getElementById("breakAfterSample").style.display = "block";
      document.getElementById("graph").style.display = "none";
      document.getElementById("experiment2").style.display = "none";
      document.getElementById("break").style.display = "none";
    }
    else if(csvNumber === 11){
      document.getElementById("graph").style.display = "none";
      buildEnd();
      document.getElementById("end").style.display = "block";
      document.getElementById("experiment2").style.display = "none";
      document.getElementById("breakAfterSample").style.display = "none";
    }
    else{
      document.getElementById("breakAfterSample").style.display = "none";
      document.getElementById("graph").style.display = "none";
      document.getElementById("break").style.display = "block";
      document.getElementById("experiment2").style.display = "none";
    }
    timers.push(timeEnd-timeStart) //Prints time to click
    setcsvNumber(n => n+1)
  }

  useEffect(() => {
    if(csvNumber === 0){
      document.getElementById("break").style.display = "none";
      document.getElementById("breakAfterSample").style.display = "none";
      document.getElementById("graph").style.display = "none";
      document.getElementById("experiment2").style.display = "none";
      document.getElementById("end").style.display = "none";
      }
  }, []);


  return (
    <div className="App">
      <div id="intro" className="text-center intro">
      <h2>Experiment 1</h2>
        <h3 className="mx-auto p-2">In this experiment, you are asked to find and click a <b>red circle</b> as fast as you can in a scatterplot. There will be 5 scatterplots in the experiment. We will also start with a sample scatterplot for you to practice and familiarize yourself with. We won't record any other information from you except the time it takes to find and click the red circle. Your time cutoff for each trial will be 30 seconds.</h3>
        <h3 className="mx-auto p-2">Click the "next" button to begin.</h3>
        <button className="btn btn-primary position-absolute bottom-0 translate-middle-x mb-1" onClick={navGraph}>Next</button> 
      </div>
      
      <svg id="graph" width="700" height="700">
        <Scatterplot
          x={100}
          y={100}
          width={dimensions.width}
          height={dimensions.height}
          data={data}
          callback={navBreak}
          callbackColor={csvNumber < 6 ? '#ff0000' : '#080808'}
        />
      </svg>

      <div id="breakAfterSample">
        <h3 className="mx-auto p-2">Sample trial finished. Click "next" when you're ready to proceed with the experiment.</h3>
        <button className="btn btn-primary position-absolute bottom-0 translate-middle-x mb-1" onClick={navGraph}>Next</button> 
      </div>

      <div id="break" class="container">
        <h3 className="mx-auto p-2">Click "next" when you're ready for the next graph.</h3>
        <button className="btn btn-primary position-absolute bottom-0 translate-middle-x mb-1" onClick={navGraph}>
          Next
        </button> 
      </div>

      <div id= "experiment2">
        <h2>Experiment 2</h2>
        <h3 className="mx-auto p-2">In this experiment, you are asked to find and click the <b>black circle</b> as fast as you can in a scatterplot. There will be 5 scatterplots in the experiment. We won't record any other information from you except the time it takes to find and click the black circle. Your time cutoff for each trial will be 30 seconds. </h3>
        <h3 className="mx-auto p-2">Click the "next" button to begin.</h3>
        <button className="btn btn-primary position-absolute bottom-0 translate-middle-x mb-1" onClick={navGraph}>Next</button> 
      </div>

      <div id="end">
        <h3 className="mx-auto p-2">This is the end of the experiment. Thank you for participating!</h3>
        <h3 className="mx-auto p-2">Here are your results:</h3>
        <div id="timerContainer"></div>
      
      </div>

    </div>
  );
}

export default App;