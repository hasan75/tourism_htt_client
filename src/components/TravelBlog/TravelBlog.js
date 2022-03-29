import React from 'react';
import useStoryBlog from '../../hooks/useStoryBlog';
import SingleStory from '../SingleStory/SingleStory';
import "./TravelBlog.css";

const TravelBlog = () => {
    const [data] = useStoryBlog();
    return (
        <div>
            <h1 className="text-center pt-4" >Traveller's Story</h1>
            <div className="container p-5 d-lg-flex flex-column ">
                <div className="row">
                    {
                        data.map(singledata => <SingleStory key={singledata._id} singledata={singledata}></SingleStory>)
                    }
                </div>

            </div>
            
        </div>
    );
};

export default TravelBlog;