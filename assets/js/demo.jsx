import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
    ReactDOM.render(<Demo />, root);
}

function Shuffle_Cards() {
    var values = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
    values = _.shuffle(values);
    var cards = [];
    for (let ii = 0; ii < values.length; ii++) {
        cards[ii] = { val : values[ii], flipped : false, matched : false, display : "?" }
    }
    return cards;

}
class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.matched) {
            return <button type="button" className="btn btn-success btn-xl custom-size" onClick={() => this.props.onClick()}>{this.props.display}</button>
        } else if (this.props.flipped) {
                return <button type="button" className="btn btn-warning btn-xl custom-size" onClick={() => this.props.onClick()}>{this.props.display}</button>
            } else {
                return <button type="button" className="btn btn-outline-info btn-xl custom-size" onClick={() => this.props.onClick()}>{this.props.display}</button>
            }
        }
    }
    class Demo extends React.Component {
        constructor(props) {
            super(props);
            this.state = { pause : false, flippedCard : 17, cards : Shuffle_Cards(), score : 0 };
        }
        handleClick(ii) {
            if (this.state.cards[ii].flipped) {
                return ;
            }
            if (this.state.pause) {
                return ;
            }
            this.state.score++;
            if (this.state.flippedCard === 17) {
                let c = this.state.cards[ii]
                c.display = c.val;
                c.flipped = true;
                const cards = this.state.cards.slice();
                cards[ii] = c;
                this.setState(cards : cards);
                this.state.flippedCard = ii;
            } else {
                let c = this.state.cards[ii]
                c.display = c.val;
                c.flipped = true;
                const cards = this.state.cards.slice();
                cards[ii] = c;
                this.setState(cards : cards);
                this.state.pause = true;
                setTimeout(() => {
                    let c1 = this.state.cards[ii];
                    let c2 = this.state.cards[this.state.flippedCard];
                    if (c1.val == c2.val) {
                        this.state.flippedCard = 17;
                        const cards = this.state.cards.slice();
                        c1.matched = true;
                        c2.matched = true;
                        cards[ii] = c1;
                        cards[this.state.flippedCard] = c2;
                        this.setState(cards : cards);
                        this.state.pause = false;
                    } else {
                        c1.display = "?";
                        c2.display = "?";
                        c1.flipped = false;
                        c2.flipped = false;
                        this.state.flippedCard = 17;
                        const cards = this.state.cards.slice();
                        cards[ii] = c1;
                        cards[this.state.flippedCard] = c2;
                        this.setState(cards : cards);
                        this.state.pause = false;
                    }}, 1000);

            }
        }
        Rendercards(ii) {
            let c = this.state.cards[ii]
            return <Card onClick={() => this.handleClick(ii)} display={c.display} matched={c.matched} flipped={c.flipped}/>;
        }
        reset() {
            this.setState({ pause : false, flippedCard : 17, cards : Shuffle_Cards(), score : 0 });
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

