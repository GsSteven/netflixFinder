import React from 'react';
import './ExpandedTitle.css';
import { motion } from "framer-motion";
import star from './../../images/starIcon.png';

class ExpandedTitle extends React.Component {

    cleanSynopsis() {
        let description = this.props.synopsis;
        const hasApos = description.indexOf('&#39;') !== -1;
        const hasQuote = description.indexOf('&quot;') !== -1;
        if (hasApos) description = description.replaceAll('&#39;', "'");
        if (hasQuote) description = description.replaceAll('&quot;', '"');
        return description;
    }

    render() {
        const hasRating = this.props.rating && Number(this.props.rating) ? true : false;

        return (
            <motion.div
                className="expandedTitleWrapper"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: .4, type: "tween" }}
            >
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
                <p className="expandedSynopsis">{this.cleanSynopsis()}</p>
                <br />
                <h3 className="expandedImdb">Imdb page <a className="imdbLink" href={`https://www.imdb.com/title/${this.props.imdbid}`} target="_blank" rel="noreferrer">here</a></h3>
            </motion.div>
        );
    }
};

export default ExpandedTitle;