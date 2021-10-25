import React from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';

class App extends React.Component {
  state = {
    players: [
      {
        name: "Guil",
        score: 0,
        id: 1,
      },
      {
        name: "Treasure",
        score: 0,
        id: 2,
      },
      {
        name: "Ashley",
        score: 0,
        id: 3,
      },
      {
        name: "James",
        score: 0,
        id: 4,
      }
    ]
  };

  //player id counter
  prevPlayerID = 4;
  prevHighscore = 0;

  checkHighestScore = () => {
    const scores = this.state.players.map ( players => players.score );
    const highScore = Math.max(...scores);
    if (highScore) 
    {
      return highScore;
    }
    return null;
  }

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  }



  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  handleAddPlayer = (name) => {
    this.setState( prevState => {
      return {
          players: [
            ...prevState.players,
            {
              name,
              score: 0,
              id: this.prevPlayerID += 1
            }
          ]
      };
    });
  }

  render() {

    const highScore = this.checkHighestScore();

    return (
      <div className="scoreboard">
        <Header 
          title="Scoreboard" 
          players={this.state.players} 
        />
  
        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}   
            isHighScore={highScore === player.score}        
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer}/>
      </div>
    );
  }
}

export default App;
