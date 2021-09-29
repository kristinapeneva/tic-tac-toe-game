import React from "react";
import Board from "./Board";
import { EmailShareButton, FacebookShareButton, FacebookMessengerShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, EmailIcon, WhatsappIcon, TwitterIcon, FacebookMessengerIcon } from 'react-share';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        showMoves: false,
        show: "Show",
        arrow: faCaretDown,
      };
      this.initialState = {...this.state}
    }

  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if(calculateWinner(squares) || squares[i]) {
        return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    handleShowMoves = () => {
      this.setState({showMoves: !this.state.showMoves})
      if (this.state.show === "Show") {
        this.setState({show: "Hide", arrow: faCaretUp})
      } else { this.setState({show: "Show", arrow: faCaretDown})}
    }
  
    render() {
      const arrow = this.state.arrow;
      const show = this.state.show;
      const showMoves = this.state.showMoves;
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step,move) => {
        const desc = move ?
        '#' + move :
        '#0';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)} className={(move === this.state.stepNumber ? "move highlight" : "move")}>{desc}</button>
          </li>
        );
      })
      let status;
      if (winner) {
        status = 'The winner is ' + winner + "!";
      } else if (!current.squares.includes(null)){
        status = "Draw!";
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

  
      return (
        <div className="wrapper">
        <div className="game">
          <div className="game-1">
              <div className="status">{status}</div>
              <div className="game-board">            
                <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                />
              </div>
          </div>
          <div className="game-2">
              <div className="new-game-wrapper"><button className="new-game" onClick={() => this.setState(this.initialState)}>New Game <FontAwesomeIcon icon={faRedo} /></button>
                </div>
              <div className="game-info">
              <div className="show-moves-wrapper"><button onClick={this.handleShowMoves} className="show-button">{show} Moves <FontAwesomeIcon icon={ arrow } /></button></div>
                <ul className={showMoves ? null : "hide"}>{moves}</ul>
              </div>
            </div>      
        </div>
        <div className="social-icons">
          <FacebookShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
            <FacebookIcon size="1.5rem" round={true} className="icon icon-fb" quote="Check this awesome Tic-Tac-Toe game! I just love it <3" />
          </ FacebookShareButton>
          <FacebookMessengerShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
            <FacebookMessengerIcon size="1.5rem" round={true} className="icon icon-msg" quote="Check this awesome Tic-Tac-Toe game! I just love it <3" />
          </ FacebookMessengerShareButton>
          <WhatsappShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
            <WhatsappIcon size="1.5rem" round={true} className="icon icon-wa" />
          </ WhatsappShareButton>
          <EmailShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
            <EmailIcon size="1.5rem" round={true} className="icon icon-eml" subject="A New Tic-Tac-Toe Game! Check it!"/>
          </ EmailShareButton>
          <TwitterShareButton url="https://kristinapeneva.com/tic-tac-toe-game">
            <TwitterIcon size="1.5rem" round={true} className="icon icon-tw" title="Tic-Tac-Toe Game" />
          </ TwitterShareButton>
        </div>
        </div>
      );
    }
  }

  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  export default Game;
