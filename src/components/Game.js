import React from "react";
import Board from "./Board";
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faCaretDown, faCaretUp, faShareAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Popup from "./Popup";

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
        theme: "theme1",
        popUp: false,
        themeIcon: faMoon
      };

      this.initialState = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      }
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

    handleTheme = () => {
      if (this.state.theme === "theme1") {
        this.setState({theme: "theme2", themeIcon: faSun})
      } else { this.setState({theme: "theme1", themeIcon: faMoon})}
    }

    togglePopup = () => {
      this.setState({popUp: !this.state.popUp})
    }

    render() {
      const themeIcon = this.state.themeIcon;
      const theme = this.state.theme;
      const arrow = this.state.arrow;
      const show = this.state.show;
      const showMoves = this.state.showMoves;
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const endGameResults = calculateWinner(current.squares);
      const moves = history.map((step,move) => {
        const desc = move ?
        '#' + move :
        '#0';
        return (          
            <div onClick={() => this.jumpTo(move)} className={(move === this.state.stepNumber ? "move highlight" : "move")}>{desc}</div>
        );
      })
      let status;
      if (endGameResults) {
        status = 'The winner is ' + endGameResults.winner + "!";
      } else if (!current.squares.includes(null)){
        status = "Draw!";
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className={theme}>
          <div className="wrapper">
            <div className="game">
              <div className="game-1">
                <div className="status">{status}</div>
                <div className="game-board">            
                    <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winningCombination={endGameResults?.winningCombination}
                    />
                </div>
              </div>
              <div className="game-2">
                <div className="new-game-wrapper"><div className="new-game" onClick={() => this.setState(this.initialState)}>New Game <FontAwesomeIcon icon={faRedo} /></div></div>
                <div className="show-moves-wrapper"><div onClick={this.handleShowMoves} className="show-button">{show} Moves <FontAwesomeIcon icon={ arrow } /></div></div>
                <div className={showMoves ? "move-wrapper" : "move-wrapper hide"}>{moves}</div>
              </div>                
            </div>
            {this.state.popUp && <Popup theme={this.state.theme} handleClose={this.togglePopup} />}  
            <div className="share-theme-icons">
              <div className="share-button-wrapper"><div onClick={this.togglePopup} className="share-button"><FontAwesomeIcon icon={ faShareAlt } /></div></div>              
              <div className="theme-button-wrapper"><div onClick={this.handleTheme} className="theme-button"><FontAwesomeIcon icon={ themeIcon } /></div></div>
            </div>
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
        return {winner: squares[a], winningCombination: lines[i]};
      }
    }
    return null;
  }


  export default Game;
