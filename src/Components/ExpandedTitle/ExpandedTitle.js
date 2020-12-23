import React from 'react';
import './ExpandedTitle.css';
import star from './../../images/starIcon.png';

class ExpandedTitle extends React.Component {
    render() {
        const hasRating = this.props.rating && Number(this.props.rating) ? true : false;

        return (
            <div className="expandedTitleWrapper">
                <button className="closeExpand" onClick={this.props.toggle}>X</button>
                <br />
                <img className="expandedImage" src={this.props.largeImage} alt="large media" />
                <h1 className="expandedTitle">{this.props.title}</h1>
                <h2 className="expandedRelease">{this.props.released}</h2>
                {hasRating &&
                    <div className="expandedRating">
                        <h2 className="rating"><img id="starRating" src={star} alt="star" />{this.props.rating}/10</h2>
                    </div>
                }
                {this.props.runtime &&
                    <h2 className="expandedRuntime">{this.props.runtime}</h2>
                }
                <h2><u>Description:</u></h2>
                <p className="expandedSynopsis">{this.props.synopsis}</p>
                <br />
                <h3 className="expandedImdb">Imdb page <a href={`https://www.imdb.com/title/${this.props.imdbid}`} target="_blank" rel="noreferrer">here</a></h3>
            </div>
        );
    }
};

export default ExpandedTitle;