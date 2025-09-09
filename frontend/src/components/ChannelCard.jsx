import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

import "../styles/Card/ChannelCard.css";

const ChannelCard = ({ video }) => {

    return (
        <article className="ChannelCard">
            <Link to={`/video/${video.videoId}`}> <img src={video.thumbnailUrl} /> </Link>
            <h4> {video.title} </h4>
            <p> {video.views} Views • { formatDistanceToNowStrict(new Date(video.uploadDate)) } ago </p> 
        </article>
    );

};

export default ChannelCard;

