import React, {Component} from 'react';
import axios from 'axios';

import './style.css';
import Cinema from '../Cinema';

export default class Main extends Component {
    constructor() {
        super();

        this.state = {
            cinemas: [],
            block: false
        }

        this.handlerScroll = this.handlerScroll.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillMount() {
        axios.get('https://api.kinohod.ru/api/restful/v1/cinemas?city=1', {
            params: {
                rangeStart: 0,
                limit: 10
            }
        })
            .then(response => response.data)
            .then(cinemas => this.setState({cinemas: cinemas.data}))
            .catch(error => console.error(error.message));

        window.addEventListener('scroll', this.handlerScroll);
    }

    getData() {
        axios.get('https://api.kinohod.ru/api/restful/v1/cinemas?city=1', {
            params: {
                rangeStart: this.state.cinemas.length,
                limit: 10
            }
        })
            .then(response => response.data)
            .then(cinemas => this.setState({cinemas: [...this.state.cinemas, ...cinemas.data], block: false}))
    }

    handlerScroll() {
        if (document.body.offsetHeight - (document.documentElement.scrollTop + window.innerHeight) <= 600 && !this.state.block) {
            this.setState({block: true});
            this.getData();
        }
    }

    render() {
        return (
            <main className="main">
                {(this.state.cinemas.length > 0)
                    ? this.state.cinemas.map(cinema => <Cinema cinema={cinema} key={cinema.id}/>)
                    : null}
            </main>
        )
    }
}