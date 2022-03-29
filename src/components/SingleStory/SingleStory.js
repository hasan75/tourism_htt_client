import React from 'react';
import heartOutline from "../../images/heart-outline.png";
import heartFill from "../../images/heart-fill.png";

const SingleStory = (props) => {
    const data = props.singledata

    return (
        <div className="card col-lg-6">
            <div className="card-header">
                <div className="profile">
                    <span className="letter">{data.storyAuthor}</span>
                </div>
                <div className="card-title-group">
                    <h5 className="card-title">{data.storyBlog.title}</h5>
                    <div className="card-date">{data.storyBlog.date}</div>
                </div>
            </div>

            <img className="card-image" src={data.storyBlog.image} alt="Logo" />
            <div className="card-text">{data.storyBlog.description}</div>
            <div className="card-like-bar">
                {data.isLiked ? (
                    <img className="card-like-icon" src={heartFill} alt="Logo" />
                ) : (
                    <img className="card-like-icon" src={heartOutline} alt="Logo" />
                )}
                <div className="like-text">
                    <b>{data.like}</b> peoples love this.
                </div>
            </div>

        </div>
    );
};

export default SingleStory;