import React from 'react';
import './Title.css';
//import jquery from 'jquery';

import star from './../../images/starIcon.png';
import movie from './../../images/movieIcon.png';
import series from './../../images/tvIcon.png';

class Title extends React.Component {


    render() {

        return (
            <div className="titleWrapper">
                <h1 className="mainTitle">{this.props.title}</h1>
                <h3 className="releaseYear">{this.props.released}</h3>
                <img className="thumbImage" src={this.props.image} alt="movie poster" />
                <h3 className="runtime">{this.props.runtime}</h3>
                <img id="titleType" src={this.props.type === "movie" ? movie : series} alt="typeIcon" />
                <br />
                {this.props.rating &&
                    <h2 className="rating"><img id="starRating" src={star} alt="star" />{this.props.rating}/10</h2>
                }
            </div>
        );
    }
};

export default Title;