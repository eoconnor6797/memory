import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root, channel) {
    ReactDOM.render(<Demo channel={channel} />, root);
}

function PlaceHolder() {
    var cards = [];
    for (let ii = 0; ii < 16; ii++) {
        cards[ii] = { display : "?" }
    }
    return cards
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.channel = props.channel;
        this.state = { guess1 : 17, guess2 : 17, cards : PlaceHolder(), score : 0 };
        console.log(this.channel);
        this.channel.join()
            .receive("ok", this.gotView.bind(this))
            .receive("error", resp => { console.log("Unable to join channel", resp) }) ;
    }

    gotView(view) {
        let c = this.state.cards
        console.log("got the state", view.game);
        this.setState(view.game);
        if (this.state.guess2 != 17) {
            this.checkMatch(this.state.guess1, this.state.guess2)
        }
    }

    checkMatch(card1, card2) {
        setTimeout(() => {
            this.channel.push("guess", {c1: card1, c2: card2})
                .receive("ok", this.gotView.bind(this))
        }, 1000)
    }

    handleClick(ii) {
        if (this.state.guess2 == 17) {
            this.channel.push("guess", { card: ii })
                .receive("ok", this.gotView.bind(this));
        }
    }
    Rendercards(ii) {
        let c = this.state.cards[ii]
        if (c.matched) {
            return <button type="button" className="btn btn-success btn-xl custom-size" onClick={() => this.handleClick(ii)}> {c.display} </button>;
        } else if (c.flipped) {
            return <button type="button" className="btn btn-warning btn-xl custom-size" onClick={() => this.handleClick(ii)}> {c.display} </button>;
        } else {
            return <button type="button" className="btn btn-outline-info btn-xl custom-size" onClick={() => this.handleClick(ii)}> {c.display} </button>;
        }
    }
    reset() {
        this.channel.push("reset")
            .receive("ok", this.gotView.bind(this))
    }
    render() {
        return (
            <div>
            <div className="row">
            <div className="col">
            <button type="button" className="btn-danger" onClick={() => this.reset()}>Reset</button>
            </div>
            <div className="Score">Score: {this.state.score}</div>
            </div>
            <div className="row justify-content-md-center">
            {this.Rendercards(0)}
            {this.Rendercards(1)}
            {this.Rendercards(2)}
            {this.Rendercards(3)}
            </div>
            <div className="row justify-content-md-center">
            {this.Rendercards(4)}
            {this.Rendercards(5)}
            {this.Rendercards(6)}
            {this.Rendercards(7)}
            </div>
            <div className="row justify-content-md-center">
            {this.Rendercards(8)}
            {this.Rendercards(9)}
            {this.Rendercards(10)}
            {this.Rendercards(11)}
            </div>
            <div className="row justify-content-md-center">
            {this.Rendercards(12)}
            {this.Rendercards(13)}
            {this.Rendercards(14)}
            {this.Rendercards(15)}
            </div>
            </div>
        );
    }
}

