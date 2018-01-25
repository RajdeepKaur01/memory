'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<MGame />, root);
}

// App state for Game is:
// {
//    prevTile: String    // prev tile value
// }
//

class MGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevTile: null
    };
    this.setNewState = this.setNewState.bind(this);
  }

  // update the state of game
  setNewState(c1){
    let st1 = _.extend(this.state, {
      prevTile: c1
    });
    this.setState(st1);
  }

  // Reset the game
  reset(){
    document.getElementById("totalClicks").innerHTML=0;
    var letters = ("ABCDEFGH").split('');
    letters.map((letter) => {
      let v1 = document.getElementById(letter+"1");
      let v2 = document.getElementById(letter+"2");
      v1.innerHTML = ""; v2.innerHTML = "";
      v1.disabled = false; v2.disabled = false;
    }
  );
}

render(){
  return(
    <div id="blocks" className="blocks">
    <div id="board"><Board root={this}/></div>
    <div id="clicks">
    Total Clicks: <span id="totalClicks">0</span>
    </div>
    <div>
    <button className="btn-default" onClick={this.reset}>Restart</button>
    </div>
    </div>
  );
}
}

function Board(props) {
  return(
    <div>
    <div>
    <Tiles name="A" id="A1" root={props.root}/>
    <Tiles name="B" id="B1" root={props.root}/>
    <Tiles name="G" id="G1" root={props.root}/>
    <Tiles name="D" id="D1" root={props.root}/>
    </div>
    <div>
    <Tiles name="F" id="F1" root={props.root}/>
    <Tiles name="H" id="H1" root={props.root}/>
    <Tiles name="C" id="C1" root={props.root}/>
    <Tiles name="E" id="E1" root={props.root}/>
    </div>
    <div>
    <Tiles name="A" id="A2" root={props.root}/>
    <Tiles name="D" id="D2" root={props.root}/>
    <Tiles name="G" id="G2" root={props.root}/>
    <Tiles name="F" id="F2" root={props.root}/>
    </div>
    <div>
    <Tiles name="E" id="E2" root={props.root}/>
    <Tiles name="H" id="H2" root={props.root}/>
    <Tiles name="B" id="B2" root={props.root}/>
    <Tiles name="C" id="C2" root={props.root}/>
    </div>
    </div>
  );
}

function Tiles(props) {

  // Runs after Timeout of 1sec in case of mismatch
  function setTimer(e,prev1,prev2){
    props.root.setNewState(null);
    if(prev1.disabled){
      console.log("RIGHT 1");
      prev1.innerHTML="";
      prev1.disabled=false;
    }
    if(prev2.disabled){
      console.log("RIGHT 2");
      prev2.innerHTML="";
      prev2.disabled=false;
    }
    e.target.innerHTML="";
    e.target.disabled=false;
    console.log("DIFFERENT");
  }

  function checkTiles(e){
    let current = props.root.state;
    let totalClicksValue = document.getElementById("totalClicks");
    totalClicksValue.innerHTML=Number(totalClicksValue.innerHTML)+1;
    if(current.prevTile==null){
      props.root.setNewState(props.name);
      e.target.innerHTML=props.name;
      e.target.disabled=true;
    }
    else if(current.prevTile==props.name){
      e.target.innerHTML=props.name;
      e.target.disabled=true;
      props.root.setNewState(null);
      console.log("SAME");
    }
    else{
      document.getElementById('blocks').style.pointerEvents = 'none';
      e.target.innerHTML=props.name;
      e.target.disabled=true;
      let prev1=document.getElementById(current.prevTile+"1");
      let prev2=document.getElementById(current.prevTile+"2");
      let curr=e.target;
      setTimeout(() => {
        props.root.setNewState(null);
        if(prev1.disabled){
          console.log("RIGHT 1");
          prev1.innerHTML="";
          prev1.disabled=false;
        }
        if(prev2.disabled){
          console.log("RIGHT 2");
          prev2.innerHTML="";
          prev2.disabled=false;
        }
        curr.innerHTML="";
        curr.disabled=false;
        console.log("DIFFERENT");
        document.getElementById('blocks').style.pointerEvents = 'auto';
      }, 1000)

    }
  }

  return(
    <button className="btn btn-primary" id={props.id} onClick={checkTiles} />
  );
}
