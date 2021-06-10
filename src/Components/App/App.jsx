import "./App.css";
import React from "react";
import TitleList from "../TitleList/TitleList";
import headerLogo from "./../../images/netflixLogo.png";
import axios from "axios";
require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      titles: [],
      currentPage: 1,
      daysBack: 7,
      moreTitles: false,
      searchCount: 0,
      errors: "",
    };
    this.newTitles = this.newTitles.bind(this);
    this.moreTitles = this.moreTitles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  newTitles() {
    //if max searches reach display error (to prevent spam to external API)
    if (this.state.searchCount >= 20) {
      this.setState({ errors: "Max searches reached for this session" });
      return;
    }
    //max to 100 days back
    let daysBack = this.state.daysBack;
    if (!daysBack) {
      this.setState({ errors: "Please input a valid number" });
      return;
    }
    if (daysBack > 100) daysBack = 100;
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi",
      params: {
        q: `get:new${daysBack}:US`,
        p: `${this.state.currentPage}`,
        t: "ns",
        st: "adv",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
      },
    };

    //increment searchCount
    this.setState({ searchCount: this.state.searchCount + 1 });

    axios
      .request(options)
      .then((response) => {
        this.setState({
          titles: this.state.titles.concat(response.data.ITEMS),
        });
        //remove more button if all titles are displayed
        if (this.state.titles.length === Number(response.data.COUNT)) {
          this.setState({ moreTitles: false });
        } else {
          //display more titles button if count is more than displayed
          Number(response.data.COUNT) > 100
            ? this.setState({ moreTitles: true })
            : this.setState({ moreTitles: false });
        }
      })
      .catch(function (error) {
        this.setState({ errors: "Error: unable to fetch titles" });
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
        <h2 id="daysBackHead">How many days back?</h2>
        <div className="searchArea">
          <input
            className="searchBar"
            type="number"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        {this.state.errors && (
          <p className="displayErrors">{this.state.errors}</p>
        )}
        {this.state.titles[0] && (
          <h1 id="daysDisplay">
            New releases since {this.state.daysBack} days ago
          </h1>
        )}
        <TitleList titles={this.state.titles} />
        {this.state.moreTitles && this.state.titles[0] && (
          <div className="buttonContainer">
            <button className="moreButton" onClick={this.moreTitles}>
              more
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;