import React, { useState } from "react";
import { VideoRoomState, sendMessageToServer } from '../../../store/video-room/video-room';
import { connect } from "react-redux";
import { ChatMessageItem } from "./chat-message-item";
import { store } from "../../../store";
import { MessageDetail } from "../../../api/video-room-types";
import { TextField } from "@material-ui/core";
import useStyles from "../../styles";

/**
 * Represents the required properties of the ChatApp.
 */
export interface Prop {
    clientMessage: string;
    clientName: string;
    messageHistory: MessageDetail[];
}

export const ChatApp = (props: Prop) => {
    const classes = useStyles();
    const [msg, setMessage] = useState("");

    // sending message to the server after pressing the button
    const sendMessageClick = (event): void => {
        if ((event.key === 'Enter') && (msg !== "")) {
            store.dispatch(sendMessageToServer(msg))
            setMessage('')
        }
    };

    return(
        <div className={classes.chatApp}>
            <div className="display_message">
                {
                    props.messageHistory && props.messageHistory.length !== 0 &&
                    (() => {
                        return props.messageHistory.map((message) => {
                            return (
                                <ChatMessageItem
                                clientMessage={message.chat_message}
                                clientName={message.chat_username}
                                />
                            )
                        })
                    })()
                }
            </div>
            <TextField 
                type="text" 
                placeholder="Send a message..." 
                variant="outlined"
                className={classes.formControl}
                InputProps={{
                    className: classes.formControl
                }}
                InputLabelProps={{
                    shrink: true
                }}

                value={msg} 
                onChange={event => setMessage(event.target.value)}
                onKeyDown={sendMessageClick}
            />
            <br/>
        </div>
    ) 
}

const mapStateToProps = (state: VideoRoomState) => {
    return {
        clientMessage: state.clientMessage,
        clientName: state.clientName,
        messageHistory: state.messageHistory
    }
}

export const ChatAppR = connect(mapStateToProps)(ChatApp);