import React from 'react';
import heartOutline from '../../assets/images/heart-outline.png';
import heartFill from '../../assets/images/heart-fill.png';
import singleStoryStyles from './SingleStory.module.css';

const SingleStory = (props) => {
  const data = props.singledata;

  return (
    <div className={`${singleStoryStyles.card} card col-lg-6`}>
      <div className='card-header'>
        <div className='profile'>
          <span className='letter'>{data.storyAuthor}</span>
        </div>
        <div className='card-title-group'>
          <h5 className='card-title'>{data.storyBlog.title}</h5>
          <div className='card-date'>{data.storyBlog.date}</div>
        </div>
      </div>

      <img
        className={`${singleStoryStyles.cardImage} card-image`}
        src={data.storyBlog.image}
        alt='Logo'
      />
      <div className='card-text mb-2'>{data.storyBlog.description}</div>
      <div className='card-like-bar d-flex justify-content-center align-items-center'>
        <div className='likeDIv'>
          {data.isLiked ? (
            <img className='card-like-icon' src={heartFill} alt='Logo' />
          ) : (
            <img className='card-like-icon' src={heartOutline} alt='Logo' />
          )}
        </div>

        <div className='like-text ms-2'>
          <b>{data.like}</b> peoples love this.
        </div>
      </div>
    </div>
  );
};

export default SingleStory;
