'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_game(root) {
  ReactDOM.render(<MGame />, root);
}

// App state for Game is:
// {
//    prevTile: String    // prev tile value
//    letters: Array     // Values of tiles displayed
// }
//

class MGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevTile: null,
      letters: ['A1','B1','C1','D1','E1','F1','G1','H1','A2','B2','C2','D2','E2','F2','G2','H2']
    };
    this.setNewState = this.setNewState.bind(this);
    this.reset = this.reset.bind(this);
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
    let new_letters = _.shuffle(this.state.letters);
    let st2 = _.extend(this.state, {
      prevTile: null,
      letters: new_letters
    });
    this.setState(st2);
    this.state.letters.map((letter) => {
      document.getElementById(letter).disabled = false;
      document.getElementById(letter).innerHTML = "";
    });
    document.getElementById("totalClicks").innerHTML=0;
  }

  render(){
    return(
      <div id="blocks" className="blocks">
      <div id="board">
      <div>
      <Tiles id={this.state.letters[0]} root={this}/>
      <Tiles id={this.state.letters[1]} root={this}/>
      <Tiles id={this.state.letters[2]} root={this}/>
      <Tiles id={this.state.letters[3]} root={this}/>
      </div>
      <div>
      <Tiles id={this.state.letters[4]} root={this}/>
      <Tiles id={this.state.letters[5]} root={this}/>
      <Tiles id={this.state.letters[6]} root={this}/>
      <Tiles id={this.state.letters[7]} root={this}/>
      </div>
      <div>
      <Tiles id={this.state.letters[8]} root={this}/>
      <Tiles id={this.state.letters[9]} root={this}/>
      <Tiles id={this.state.letters[10]} root={this}/>
      <Tiles id={this.state.letters[11]} root={this}/>
      </div>
      <div>
      <Tiles id={this.state.letters[12]} root={this}/>
      <Tiles id={this.state.letters[13]} root={this}/>
      <Tiles id={this.state.letters[14]} root={this}/>
      <Tiles id={this.state.letters[15]} root={this}/>
      </div>
      </div><br/>
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

function Tiles(props) {
  function checkTiles(e){
    if(props.root.state.prevTile!=e.target.id){
      //Increment Clicks
      let totalClicksValue = document.getElementById("totalClicks");
      totalClicksValue.innerHTML=Number(totalClicksValue.innerHTML)+1;
      let previous = props.root.state.prevTile;
      let curr=e.target;
      //Update Selected Tile
      curr.innerHTML=curr.id.charAt(0);
      // Check if Tile Letter is same as previous
      if(previous==null){
        props.root.setNewState(curr.id);
      }
      else if(previous.charAt(0)==curr.id.charAt(0)){
        props.root.setNewState(null);
        document.getElementById('board').style.pointerEvents = 'none';
        console.log("SAME");
        setTimeout(() => {
          curr.innerHTML="";
          curr.disabled=true;
          document.getElementById(previous).innerHTML="";
          document.getElementById(previous).disabled=true;
          document.getElementById('board').style.pointerEvents = 'auto';
        },1000);
      }
      else{
        document.getElementById('board').style.pointerEvents = 'none';
        setTimeout(() => {
          props.root.setNewState(null);
          document.getElementById(previous).innerHTML="";
          curr.innerHTML="";
          console.log("DIFFERENT");
          document.getElementById('board').style.pointerEvents = 'auto';
        }, 1000);
      }
    }
  }
  return(
    <button className="btn btn-primary" id={props.id} onClick={checkTiles} />
  );
}
