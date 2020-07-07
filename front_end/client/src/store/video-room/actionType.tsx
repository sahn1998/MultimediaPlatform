export enum ActionType {
    SetVideoRoomUsers="SET_VIDEO_ROOM_USERS",
    AddUserToRoom="ADD_USER_TO_ROOM",
    AddUserToRoomSuccess="ADD_USER_TO_ROOM_SUCCESS",
    AddUserToRoomFail="ADD_USER_TO_ROOM_FAIL",
    GetRooms="GET_ROOMS",
    GetRoomsSuccess="GET_ROOMS_SUCCESS",
    GetRoomsFail="GET_ROOMS_FAIL",
    SendInitialClientMessage = "CLIENT_SENT_A_MESSAGE",
    SendMessageToAllClients = "SERVER_SENDS_A_MESSAGE_TO_ALL_CLIENTS",
    SendUrlToServer = "CLIENT_SENDS_URL_TO_SERVER",
    LoadVideo = "LOAD_VIDEO",
    SendControl = "SEND_CONTROL",
    ControlVideo = "CONTROL_VIDEO",
    SetSeeking = "SET_SEEKING",
    CreateRoomAndAddUserToRoom="CREATE_ROOM_AND_ADD_USER_TO_ROOM", 
    CreateRoomAndAddUserToRoomSuccess="CREATE_ROOM_AND_ADD_USER_TO_ROOM_SUCCESS",
    CreateRoomAndAddUserToRoomFail="CREATE_ROOM_AND_ADD_USER_TO_ROOM_FAIL",
    CreateUserAndAddToRoom="CREATE_USER_AND_ADD_TO_ROOM",
    CreateUserAndAddToRoomSuccess="CREATE_USER_AND_ADD_TO_ROOM_SUCCESS",
    CreateUserAndAddToRoomFail="CREATE_USER_AND_ADD_TO_ROOM_FAIL",
    CreateUser="CREATE_USER",
    CreateUserSuccess="CREATE_USER_SUCCESS",
    CreateUserFail="CREATE_USER_FAIL",
    EditUserName="EDIT_USER_NAME",
    EditUserNameSuccess="EDIT_USER_NAME_SUCCESS",
    EditUserNameFail="EDIT_USER_NAME_FAIL",
    RemoveUser="REMOVE_USER",
    RemoveUserSuccess="REMOVE_USER_SUCCESS",
    RemoveUserFail="REMOVE_USER_FAIL",
    RemoveRoom="REMOVE_ROOM",
    RemoveRoomSuccess="REMOVE_ROOM_SUCCESS",
    RemoveRoomFail="REMOVE_ROOM_FAIL",  
    RemoveUserFromRoom="REMOVE_USER_FROM_ROOM",
    RemoveUserFromRoomSuccess="REMOVE_USER_FROM_ROOM_SUCCESS",
    RemoveUserFromRoomFail="REMOVE_USER_FROM_ROOM_FAIL",
    RemoveUserAfterBrowserClose="REMOVE_USER_AFTER_BROWSER_CLOSE",
    RemoveUserAfterBrowserCloseSuccess="REMOVE_USER_AFTER_BROWSER_CLOSE_SUCESS",
    RemoveUserAfterBrowserCloseFail="REMOVE_USER_AFTER_BROWSER_CLOSE_FAIL",
}