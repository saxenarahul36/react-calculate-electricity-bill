import React, { useState } from "react";
import "./css/App.css";

const MainObj = {
  MainMeter : {
    startUnit:0,
    endUnit:0
  },

  FirstFloor : {
    startUnit:0,
    endUnit:0
  },
  SecondFloor : {
    startUnit:0,
    endUnit:0
  },
  ThirdFloor : {
    startUnit:0,
    endUnit:0
  }
};
const FinalObj = {
  MainMeter: 0,
  FirstFloor :0,
  SecondFloor : 0,
  ThirdFloor : 0,
  TotalSubMeter:0,
  FUnit :0,SUnit:0,TUnit:0 
}
const FinalObjC = {
  MainMeter: 0,
  FirstFloor :0,
  SecondFloor : 0,
  ThirdFloor : 0,
  TotalSubMeter:0,
  FUnit :0,SUnit:0,TUnit:0 
}


const App = () => {
  const [UnitObj, SetUnitValue] = useState(MainObj);
  const [FinalObj, billCalulater] = useState([]);
  const [unitRs, setUintPrice] = useState(6.5);
  const [groundFloorBill, setGorunFloorBillAmount] = useState(0);
  const setUintrate = e => {
    const {value,name} = e.target
    setUintPrice(value);
  }

  const groundFloorCal = e => {
    const {value,name} = e.target
    const groundFloor  =  value ? parseInt(value): 0;
    setGorunFloorBillAmount(groundFloor);
  }
  const finalCal = e => {
    const MainMeter = UnitObj.MainMeter.endUnit -  UnitObj.MainMeter.startUnit
    const FirstFloor = UnitObj.FirstFloor.endUnit -  UnitObj.FirstFloor.startUnit
    const SecondFloor = UnitObj.SecondFloor.endUnit -  UnitObj.SecondFloor.startUnit
    const ThirdFloor = UnitObj.ThirdFloor.endUnit -  UnitObj.ThirdFloor.startUnit
    const TotalSubMeter = FirstFloor + SecondFloor+ ThirdFloor;
    const MainMeterDiff = TotalSubMeter - MainMeter;
    const FUnit = parseInt(MainMeter/TotalSubMeter * FirstFloor);
    const SUnit = parseInt(MainMeter/TotalSubMeter * SecondFloor);
    const TUnit = parseInt(MainMeter/TotalSubMeter * ThirdFloor);
    const FinalObj = { MainMeter,FirstFloor,SecondFloor,ThirdFloor, TotalSubMeter,FUnit,SUnit,TUnit };
    billCalulater(FinalObj);
  }
  
  const enterUnitValue = e => {
   const {value,name} = e.target
   const Unit  =  value ? parseInt(value): 0;
   const MainObj= Object.assign({},UnitObj);
   if(name=='mainstart'){
    MainObj.MainMeter.startUnit = Unit;
   }
   if(name=='mainend'){
    MainObj.MainMeter.endUnit = Unit;
   }
   if(name=='FS'){
    MainObj.FirstFloor.startUnit = Unit;
   }
   if(name=='FE'){
    MainObj.FirstFloor.endUnit = Unit;
   }
   if(name=='SS'){
    MainObj.SecondFloor.startUnit = Unit;
   }
   if(name=='SE'){
    MainObj.SecondFloor.endUnit = Unit;
   }
   if(name=='TS'){
    MainObj.ThirdFloor.startUnit = Unit;
   }
   if(name=='TE'){
    MainObj.ThirdFloor.endUnit = Unit;
   }
    SetUnitValue(MainObj);
    console.log(MainObj);
  };
  const clearData = e => {
    const MainObj = {
      MainMeter : {
        startUnit:0,
        endUnit:0
      },
    
      FirstFloor : {
        startUnit:0,
        endUnit:0
      },
      SecondFloor : {
        startUnit:0,
        endUnit:0
      },
      ThirdFloor : {
        startUnit:0,
        endUnit:0
      }
    }
    SetUnitValue(MainObj);
    billCalulater(FinalObjC);
    setUintPrice(0);
    setGorunFloorBillAmount(0);
    };
    const groundFAmount =  Math.floor(groundFloorBill/3);

    let FirstAmount = FinalObj.FUnit * unitRs 
    FirstAmount = FirstAmount - groundFAmount;


    let SecondAmount = FinalObj.SUnit * unitRs
    SecondAmount = SecondAmount - groundFAmount;


    let ThirdAmount = FinalObj.TUnit * unitRs
    ThirdAmount = ThirdAmount - groundFAmount;

    const MainMeter = UnitObj.MainMeter.endUnit -  UnitObj.MainMeter.startUnit;
return (

<div class="container">
  <h2>Calculate Electricity bill: C-57 Noida Sector 50</h2>
  <div  className="row MainMeter">
    <div class="col-2">Main Meter</div>
    <div class="col-2"><label for="inputPrefilledEx">Start Unit</label>
    <input name="mainstart"
      value= { UnitObj.MainMeter.startUnit}
      onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx1" class="form-control">
      </input>
      </div>
    <div class="col-2"><label for="inputPrefilledEx">End Unit</label>
      <input name="mainend" value={UnitObj.MainMeter.endUnit}  
    onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx2" class="form-control"></input>
    </div>
    <div class="col-2"> Total Consumption Unit = <label >{ FinalObj.MainMeter}</label> </div>
    <div class="col-2"> Unit Rate ({unitRs}) 
      <input name="mainend" value={ unitRs}  onChange={e => setUintrate(e)} type="text" id="inputPrefilledEx" class="form-control">
      </input> 
      </div> 
    <div class="col-2"> Ground Floor Bill<input name="mainend" 
    value={groundFloorBill}
    onChange={e => groundFloorCal(e)} type="text" id="inputPrefilledEx" class="form-control"></input> </div> 

  </div>

  <div className="row FirstMeter">
  <div class="col-2">First Floor</div>
    <div class="col-2"><label for="inputPrefilledEx">Start Unit</label>
    <input  name="FS" 
      value={UnitObj.FirstFloor.startUnit} 
      onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
    <div class="col-2"><label for="inputPrefilledEx">End Unit</label><input  name="FE"
    value={UnitObj.FirstFloor.endUnit}
    onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
    <div class="col-2">  Consumption Unit = <label f>{ FinalObj.FirstFloor }</label> </div>
    <div class="col-2"> Correct Unit = <label f>{ FinalObj.FUnit }</label> </div> 
    <div class="col-2"> Amount = <label f>{ FinalObj.FUnit * unitRs }</label> </div> 
  </div>

  <div className="row SecondMeter" >
  <div class="col-2">Second Floor</div>
  <div class="col-2"><label for="inputPrefilledEx">Start Unit</label><input   name="SS" 
  value={UnitObj.SecondFloor.startUnit} 
  onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
  <div class="col-2"><label for="inputPrefilledEx">End Unit</label><input  name="SE" 
  
  value={UnitObj.SecondFloor.endUnit} onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
  <div class="col-2">  Consumption Unit = <label f>{ FinalObj.SecondFloor}</label> </div>
  <div class="col-2"> Correct Unit = <label f>{ FinalObj.SUnit }</label> </div> 
  <div class="col-2"> Amount = <label f>{ FinalObj.SUnit * unitRs }</label> </div> 
  </div>

  <div className="row ThirdMeter">
  <div class="col-2">Third Floor</div>
  <div class="col-2"><label for="inputPrefilledEx">Start Unit</label><input  name="TS" 
  value={UnitObj.ThirdFloor.startUnit} 
  onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
    <div class="col-2"><label for="inputPrefilledEx">End Unit</label><input  name="TE" 
    value={UnitObj.ThirdFloor.endUnit}
    onChange={e => enterUnitValue(e)} type="text" id="inputPrefilledEx" class="form-control"></input></div>
    <div class="col-2">Consumption Unit = <label f>{ FinalObj.ThirdFloor}</label> </div> 
    <div class="col-2"> Correct Unit = <label f>{ FinalObj.TUnit }</label> </div> 
    <div class="col-2"> Amount = <label f>{ FinalObj.TUnit * unitRs }</label> </div> 
  </div>

  <div className="calbutton row ">
  <div class="col-3">
  <button type="button" 
  onClick={e => finalCal(e)}
  class="btn btn-primary">Calculate Electricity bill</button> </div>
  
   <div class="col-6"> <label >Total Units: ( First Floor + Second Floor + Third Floor )= { FinalObj.TotalSubMeter} Diffrence = {FinalObj.TotalSubMeter-MainMeter} </label> </div> 
   <div class="col-2">
  <button type="button" 
  onClick={e => clearData(e)}
  class="btn btn-primary">Clear</button> </div>
  </div>


  <div className="row FinalRow">
      <div class="col-3">Final Units Bill Amount</div>
      <div class="col-3">Fst Floor - G.Floor = { FirstAmount}</div>
        <div class="col-3">Sec Floor - G.Floor = { SecondAmount }</div>
        <div class="col-3">Third Floor - G.Floor = { ThirdAmount } </div> 
  </div>
</div>


    );
}
export default App;

