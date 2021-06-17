import React from "react";
import "./TitleList.css";
import Title from "../Title/Title";

class TitleList extends React.Component {
  render() {
    const titles = this.props.titles.map((title) => {
      return (
        <Title
          title={title.title}
          image={title.image}
          synopsis={title.synopsis}
          rating={title.rating}
          type={title.type}
          released={title.released}
          runtime={title.runtime}
          largeImage={title.largeimage}
          imdbid={title.imdbid}
          key={title.imdbid + title.title}
        />
      );
    });

    return <div className="titleListWrapper">{titles}</div>;
  }
}

export default TitleList;
