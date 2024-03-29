import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandedTitle from "../ExpandedTitle/ExpandedTitle";
import "./Title.css";

import star from "./../../images/starIcon.png";
import movie from "./../../images/movieIcon.png";
import series from "./../../images/tvIcon.png";

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandTitle: false,
    };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.state.expandTitle
      ? this.setState({ expandTitle: false })
      : this.setState({ expandTitle: true });
  }

  render() {
    const hasRating =
      this.props.rating && Number(this.props.rating) ? true : false;

    return (
      <motion.div
        className="titleWrapper"
        onClick={this.toggleExpand}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
      >
        <h1 className="mainTitle">{this.props.title}</h1>
        <h3 className="releaseYear">{this.props.released}</h3>
        <motion.img
          className="thumbImage"
          src={this.props.image}
          alt="movie poster"
          whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgb(229, 9, 20)" }}
        />
        <br />
        <img
          id="titleType"
          src={this.props.type === "movie" ? movie : series}
          alt="typeIcon"
        />
        <h3 className="runtime">{this.props.runtime}</h3>
        {hasRating && (
          <h2 className="rating">
            <img id="starRating" src={star} alt="star" />
            {this.props.rating}/10
          </h2>
        )}
        <AnimatePresence>
          {this.state.expandTitle && (
            <ExpandedTitle
              title={this.props.title}
              synopsis={this.props.synopsis}
              rating={this.props.rating}
              type={this.props.type}
              released={this.props.released}
              runtime={this.props.runtime}
              largeImage={this.props.largeImage}
              imdbid={this.props.imdbid}
              key={this.props.released + this.props.imdbid}
              toggle={this.toggleExpand}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
}

export default Title;
