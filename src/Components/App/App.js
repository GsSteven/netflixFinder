import './App.css';
import React from 'react';
import TitleList from '../TitleList/TitleList';
import headerLogo from './../../images/netflixLogo.png';
import axios from 'axios';
require('dotenv').config();

const API_KEY = process.env.REACT_APP_API_KEY;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      titles: [],
      currentPage: 1,
      daysBack: 7,
      moreTitles: false
    }
    this.newTitles = this.newTitles.bind(this);
    this.moreTitles = this.moreTitles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  newTitles() {
    const options = {
      method: 'GET',
      url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
      params: { q: `get:new${this.state.daysBack}:US`, p: `${this.state.currentPage}`, t: 'ns', st: 'adv' },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        this.setState({
          titles: this.state.titles.concat(response.data.ITEMS)
        });
        //remove more button if all titles are displayed
        if (this.state.titles.length === Number(response.data.COUNT)) {
          this.setState({ moreTitles: false })
        } else {
          //display more titles button if count is more than displayed
          Number(response.data.COUNT) > 100 ? this.setState({ moreTitles: true }) : this.setState({ moreTitles: false });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  moreTitles() {
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      this.newTitles();
    });
  }

  handleChange(e) {
    const newValue = e.target.value;
    if (newValue) {
      this.setState({ daysBack: newValue });
    } else {
      this.setState({ titles: [] });
    }
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.newTitles();
    }
  }


  render() {
    return (
      <div className="appWrapper">
        <header>
          <img id="headLogo" src={headerLogo} alt="Netflix" />
        </header>
        <div className="searchArea">
          <input className="searchBar" type="number" placeholder="how many days back?" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
          <br />
          <button id="whatsNew" onClick={this.newTitles}>Whats new?</button>
        </div>
        {this.state.titles[0] &&
          <h1 id="daysDisplay">New releases since {this.state.daysBack} days ago</h1>
        }
        <TitleList titles={this.state.titles} />
        {this.state.moreTitles &&
          <div className="buttonContainer">
            <button className="moreButton" onClick={this.moreTitles}>more</button>
          </div>
        }
      </div>
    );
  }
};

export default App;


