'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_game(root,channel) {
  ReactDOM.render(<MGame channel={channel}/>, root);
}

// App state for Game is:
// {
//    prevTile: String     // prev tile value
//    letters: Array      // Values of tiles displayed
//    display: Array     // Values displayed on tiles
//    clicks: Number    //  Count of Clicks
//    board: String     // Tells if pointer events should work or not
// }
//

class MGame extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      prevTile: "*",
      letters: ['A10','B10','C10','D10','E10','F10','G10','H10','A20','B20','C20','D20','E20','F20','G20','H20'],
      display: ['','','','','','','','','','','','','','','',''],
      clicks: 0,
      board: "boardOn"
    };
    this.channel.join()
    .receive("ok", this.gotView.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp) });
  }

  gotView(view){
    console.log("New View",view);
    this.setState(view.game);
  }

  // Reset the game
  reset(){
    this.channel.push("reset",{ })
    .receive("ok", this.gotView.bind(this));
  }

  // update tiles
  updateTiles(id){
    let id1 = ""+id;
    this.channel.push("updateDisplay",{ currId: id1 })
    .receive("ok", this.gotView.bind(this));

    this.channel.push("inclicks",{ currId: id1 })
    .receive("ok", this.gotView.bind(this));
  }

  render(){
    return(
      <div id="blocks" className="blocks">
      <div id={this.state.board}>
      {[0,4,8,12].map((i)=>
        <div key={i}>
        {[0,1,2,3].map((j)=>
          <Tiles key={i+j} id= {i+j} root={this}/>
        )}
        </div>
      )}
      </div>
      <br/>
      <div id="clicks">
      Total Clicks: <span id="totalClicks">{this.state.clicks}</span>
      </div>
      <div>
      <button className="btn-default" onClick={()=>this.reset()}>
      Restart
      </button>
      </div>
      </div>
    );
  }
}

function Tiles(props) {
  function checkTiles(e){
    props.root.updateTiles(e.target.id);
  }
  let state = props.root.state;
  return(<button
    className={"btn btn-primary button"+state.letters[props.id].charAt(2)}
    id={props.id}
    onClick={checkTiles}>
    {state.display[props.id]}
    </button>);
  }
