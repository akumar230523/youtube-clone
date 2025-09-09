import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

import api from "../services/api";

import "../styles/Card/HomeCard.css";

const HomeCard = ({ video }) => {

    const [channelAvatar, setChannelAvatar] = useState(null);

    // Fetch channel avatar url by video's channelId.
    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await api.get(`/channels/${video.channelId}`);
                setChannelAvatar(response.data?.channelAvatarURL);
            }
            catch (error) {
                // Silently ignore the errors
            }
        };
        fetchChannel();
    }, [video]);

    return (
        <article className="HomeCard">
            <Link to={`/video/${video.videoId}`}> <img src={video.thumbnailUrl} /> </Link>
            <div className="hc-info1">
                <img src={channelAvatar} />
                <div className="hc-info2">
                    <h4> {video.title} </h4>
                    <Link to={`/channel/${video.channelId}`}> <h3> {video.channelId} </h3> </Link>
                    <p> {video.views} Views • { formatDistanceToNowStrict(new Date(video.uploadDate)) } ago </p> 
                </div>
            </div>
        </article>
    );

};

export default HomeCard;

