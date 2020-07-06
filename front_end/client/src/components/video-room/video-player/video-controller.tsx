import React from 'react'
import { connect } from 'react-redux'
import { Room, Player } from '../../../api/video-room-types';
import { ActionType } from '../../../store/video-room/actionType';


import { Slider } from '@material-ui/core';

interface Prop {
    setSeeking: Function
    sendControl: Function
    currentRoom: Room
    player: Player
    reactPlayer: any
}

const VideoController = (props: Prop) => {
    const getAndSetVideoTime = () => {
        if (props.currentRoom && props.reactPlayer != null) {
            props.reactPlayer.seekTo(props.player.videoTime)
            return props.player.videoTime
        } else {
            return 0
        }
    }

    /**
     * Takes care of video time selection
     * @param event 
     * @param newTime what part of the video to go to, by percentage, where 1 represents the end of the video
     */
    const handleSeekChange = (event, newTime) => {
        props.setSeeking(true)
        props.sendControl(props.currentRoom, newTime)
        props.setSeeking(false)
    }

    /**
     * Formats the slider value that gets displayed
     * @param value the original slider value
     */
    const formatSliderLabel = (value) => {
        if (props.reactPlayer) {
            return Math.trunc(props.reactPlayer.getDuration() * value)
        } else {
            console.log('player not found while formatting slider')
        }
    }

    return (
        <Slider 
            value={getAndSetVideoTime()}
            onChange={handleSeekChange}
            min={0.0}
            max={1.0}
            step={0.0000001}
            aria-labelledby="continous-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={value => <div>{formatSliderLabel(value)} </div>}
        />
    )
}

const mapStateToProps = state => {
    return {
        currentRoom: state.room.currentRoom,
        player: state.player.player
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSeeking: (
            seeking: boolean
        ) => dispatch({type: ActionType.SetSeeking, seeking: seeking}),
        sendControl: (
            currentRoom: Room,
            videoTime: number
        ) => dispatch({type: ActionType.SendPlayPause, currentRoom: currentRoom, videoTime: videoTime})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoController);