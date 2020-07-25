import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { Grid } from '@material-ui/core'

import { VideoRoomApi } from '../../../api/video-room-api';
import { ActionType } from '../../../store/video-room/actionType';
import { store } from "../../../store";
import { controlVideoTime } from "../../../store/video-room/video-player"
import { Player, Room, User } from '../../../api/video-room-types';
import { ApiContext } from '../..';
import useStyles from '../../styles';
import { PlayButtonR } from './play-button';
import { SearchBarR } from './search-bar';
import { VideoControllerR } from './video-controller'
import { VolumeControllerR } from './volume-controller'
import './video-player.css';

interface Prop {
    sendVideoState: Function;
    currentRoom: Room;
    player: Player;
    user: User;
    seeking: boolean;
}

/**
 * Creates a video player with the following attributes:
 *      Input field for loading videos from an url
 *      Play/Pause button
 *      Video Control
 *      Volume Control
 */
export const VideoPlayer = (props: Prop) => {
    const classes = useStyles();
    const api = useContext<VideoRoomApi>(ApiContext)

    const [reactPlayer, setReactPlayer] = useState(null)
    const [sliderVideoTime, setSliderVideoTime] = useState(0)

    /**
     * Updates the api on what part the video is at; by default, updates every second
     * @param state the state of the video
     */
    const handleProgress = state => {
        if (!props.seeking) {
            api.updateVideoState(
                props.currentRoom.id,
                state.played,
            )
            setSliderVideoTime(state.played)
        }
    }

    const sliderVideoTimeHandler = (newTime) => {
        setSliderVideoTime(newTime)
    }

    const handleOnScreenPlay = () => {
        props.sendVideoState(api, props.currentRoom, "PLAYING")
    }

    const handleOnScreenPause = () => {
        api.getRoom(props.currentRoom.id).then(room => {
            props.sendVideoState(api, props.currentRoom, "PAUSED")
        })
    }
    
    return (
        <div className={classes.videoPlayer}>
            <div>                
                <SearchBarR />
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={setReactPlayer}
                        className='react-player'
                        url={props.player.videoUrl}
                        width='100%'
                        height='100%'
                        controls={false}
                        config={{
                            youtube: {
                                playerVars: { 
                                    rel : 0,
                                    disablekb: 1}
                            }
                        }}
                        playing={props.player?.videoState === "PAUSED" ? false : true}
                        onProgress={handleProgress}
                        volume={props.player.videoVolume}
                        onPlay={handleOnScreenPlay}
                        onPause={handleOnScreenPause}
                    />
                </div>
                <Grid container spacing={2}>
                    <Grid item>
                        <PlayButtonR play={handleOnScreenPlay} pause={handleOnScreenPause} />
                    </Grid>
                    <Grid item xs>
                        <VideoControllerR 
                            sliderVideoTime={sliderVideoTime}
                            updateVideoTime={sliderVideoTimeHandler}
                            reactPlayer={reactPlayer}/>
                    </Grid>
                    <Grid item xs={3}>
                        <VolumeControllerR />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        currentRoom: state.videoRoom.currentRoom,
        player: state.player.player,
        user: state.videoRoom.user,
        seeking: state.player.seeking
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendVideoState: (
            api: VideoRoomApi,
            currentRoom: Room,
            videoState: number
        ) => dispatch ({type: ActionType.SendVideoState, api: api, currentRoom: currentRoom, videoState: videoState})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
