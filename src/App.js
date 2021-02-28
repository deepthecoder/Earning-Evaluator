import React, { useState } from 'react';
import "tachyons"

var valueStore = new Array(100);
var sumValue = new Array(100);
function getUserInfo(earning, rate, year) {

  if (earning != -1 && year != -1 && rate != -1) {
    document.getElementById("earn").value="";
    document.getElementById("rate").value="";
    document.getElementById("year").value="";
  }

  for (var i = 0; i <= year; i++) {
    valueStore[i] = [];
  }
  for (var i = 0; i < year; i++) {
    for (var j = 0; j < year; j++) {
      valueStore[i][j] = "--";
    }
  }
  valueStore[0][0] = Number(0.35 * earning).toFixed(2);
  var finalRate = ((100 + Number(rate)) / 100);
  for (var j = 1; j < year; j++) {
    valueStore[0][j] = Number(finalRate * valueStore[0][j - 1]).toFixed(2);
  }
  let nextRate = (0.075) / (0.35).toFixed(2);
  let thirdRate = (0.05) / (0.35).toFixed(2);
  for (var j = 1; j < year; j++) {
    valueStore[1][j] = Number(nextRate * valueStore[0][j - 1]).toFixed(2);
    if (j >= 2) {
      valueStore[2][j] = Number(valueStore[1][j - 1]).toFixed(2);
    }
  }
  for (var i = 3; i < year; i++) {
    for (var j = i; j < year; j++) {
      valueStore[i][j] = Number(thirdRate * valueStore[0][j - i]).toFixed(2);
    }
  }
  for (var j = 0; j < year; j++) {
    let sum = 0;
    for (var i = 0; i < year; i++) {
      if (valueStore[i][j] != "--")
        sum += Number(valueStore[i][j])
    }
    sumValue[j] = sum.toFixed(2);
    //console.log(sumValue[j])
  }

}



function App() {
  const [err, setError] = useState(true)
  const [earning, setEarning] = useState(-1)
  const [rate, setRate] = useState(-1)
  const [year, setYear] = useState(-1)
  const [check, setCheck] = useState(false)

  function timeout() {
    setTimeout(() => {
      setCheck(false);
    }, 1000);
  }

  function sumTotal(year) {
    let sum = 0;
    for (var i = 0; i < year; i++) {
      sum += Number(sumValue[i]);
    }
    return sum.toFixed(2);
  }

  return (
    <div>
      <div className="pa2 ma2" align='center'>
        <p ><h2>Earning Evaluator</h2></p>
        Rs.<input className="ma2" type="text" placeholder="Enter the earning" id="earn" onChange={event => { setEarning(event.target.value) }}></input>
        <input className="ma2" type="text" placeholder="Enter the fixed annual rate" id="rate" onChange={event => setRate(event.target.value)}></input>%
        <input className="ma2 " type="text" placeholder="Enter the year" id="year" onChange={event => { setYear(event.target.value); }}></input> years
      </div>
      <div align="center">
      <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-light-red" onClick={() => { setError(true); }}>Reset</button>
        {err === true && earning != -1 && rate != -1 && year != -1 ?
          <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-green" onClick={() => { setError(false); getUserInfo(earning, rate, year) }}>Submit</button> :
          err == false && earning != -1 && rate != -1 && year != -1 ?
            <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-gray" onClick={() => { setError(false); getUserInfo(earning, rate, year) }}>Submit </button> :
            <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-gray" onClick={() => { setCheck(true); timeout() }}>Submit </button>
        }
      </div>
      <div>{check && <div className="flex justify-center items-center mv4"><div className="pa2 w5 bg-yellow mt2 tc">please fill all the details</div></div>}</div>
      <div align="center" className="pa4">
        {err == false && earning != -1 && rate != -1 && year != -1 ?
          <div class="overflow-auto">
            <table class="f6 w-50 mw8 center" cellSpacing="0">
              <tr>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Earning</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Gift Value</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Annual Rate</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Year</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Amount</th>
                <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">Sum Total({year} years)</th>
              </tr>
              <tbody class="lh-copy">
                <tr>
                  <td class="pv3 pr3 bb b--black-20">Rs. {earning}</td>
                  <td class="pv3 pr3 bb b--black-20">Rs. {Number(0.35 * earning).toFixed(2)}</td>
                  <td class="pv3 pr3 bb b--black-20">{rate}%</td>
                  <td class="pv3 pr3 bb b--black-20">{year}yrs</td>
                  {err == true ?
                    <td class="pv3 pr3 bb b--black-20">Rs. {0}</td>
                    :
                    <td class="pv3 pr3 bb b--black-20">Rs. {sumValue[year - 1]}</td>
                  }
                  <td class="pv3 pr3 bb b--black-20">Rs. {sumTotal(year)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          : null
        }
      </div>
      <div align="center">
        {
          err == false ?
            <div className="pa2" align="center">
              <div>
                <b>Summary</b>
              </div>
              <div class="overflow-auto">
                <table class="f6 w-50 mw8 center bg-lightgreen" cellSpacing="0">
                  <tr>

                    {sumValue.map((r, index) =>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">{index + 1}</th>)}
                  </tr>
                  <tbody class="lh-copy">
                    {
                      valueStore.map(rows => {
                        var row = rows.map(cell => <td className="pv3 pr3 bb b--black-20">{cell}</td>)
                        return <tr>{row}</tr>
                      })
                    }

                  </tbody>
                </table>

              </div>
              <div>
                <div>
                  <b>Yearly Total </b>
                </div>
                <table class="f6 w-50 mw8 center" cellSpacing="0">
                  <tr>
                    {sumValue.map((r, index) =>
                      <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">{index + 1}</th>)}
                  </tr>

                  <tbody class="lh-copy">
                    {
                      <tr>
                        {sumValue.map(r => <td className="pv3 pr3 bb b--black-20"><b>{r}</b></td>)}
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

            </div> :
            null
        }
      </div>
    </div>

  );
}

export default App;
