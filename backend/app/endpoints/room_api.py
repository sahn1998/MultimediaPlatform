from flask import jsonify, request, make_response
from flask_restful import Resource, reqparse
from flask_restful_swagger import swagger
from werkzeug.exceptions import BadRequest
from typing import List
from app import db
from app.database.room import Room
from app.endpoints.utils import create_400_error, create_404_error, create_500_error

class RoomListApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=True, location="json")
        self.reqparse.add_argument("video_id", type=str, required=False, default="", location="json")
        super(RoomListApi, self).__init__()

    @swagger.operation(
        notes="Returned all rooms",
        # responseClass=List[Room.__name__],
        parameters=[],
        responseMessages=[
            {
                "code": 200,
                "message": "Got all of the rooms"
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self):
        try:
            return jsonify(self.__get_all_rooms())
        except:
            return create_500_error()
    def __get_all_rooms(self):
        return [room.to_json() for room in Room.query.all()]

    @swagger.operation(
        notes="Creates a new room",
        # responseClass=Room.__name__,
        parameters=[
            {
                "name": "name",
                "description": "Name of the room to add",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            }, {
                "name": "video_id",
                "description": "ID of the video to use in the room",
                "required": False,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Created the new room successfully"
            }, {
                "code": 400,
                "message": "Bad request",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def post(self):
        try:
            args = self.reqparse.parse_args()
            return jsonify(self.__create_room(args["name"], args["video_id"]))
        except BadRequest:
            return create_400_error()
        except:
            return create_500_error()
    def __create_room(self, room_name, video_id):
        room = Room(name=room_name, video_id=video_id)
        db.session.add(room)
        db.session.commit()
        return room.to_json()

class RoomApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=True, location="json")
        self.reqparse.add_argument("video_id", type=str, required=True, location="json")
        super(RoomApi, self).__init__()

    @swagger.operation(
        notes="Returns the specific room",
        # responseClass=Room.__name__,
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Returned the room"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self, room_id):
        try:
            return jsonify(self.__get_room(room_id))
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __get_room(self, room_id):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")
        return room.to_json()

    @swagger.operation(
        notes="Updates the specific room",
        # responseClass=Room.__name__,
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to update",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
            {
                "name": "name",
                "description": "Name to update room with",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
            {
                "name": "video_id",
                "description": "ID of video to update room with",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Updated the room"
            }, {
                "code": 400,
                "message": "Bad request",
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def put(self, room_id):
        try:
            return self.__update_room(room_id, self.reqparse.parse_args())
        except (AttributeError, BadRequest):
            return create_400_error()
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __update_room(self, room_id, args):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")
        for k, v in args.items():
            setattr(room, k, v)
        db.session.commit()
        return room.to_json()

    @swagger.operation(
        notes="Deletes the specific room",
        parameters=[
            {
                "name": "room_id",
                "description": "ID of the room to delete",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Deleted the room"
            }, {
                "code": 404,
                "message": "Resource not found",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def delete(self, room_id):
        try:
            self.__delete_room(room_id)
            return jsonify(success=True)
        except LookupError:
            return create_404_error()
        except:
            return create_500_error()
    def __delete_room(self, room_id):
        room = Room.query.get(room_id)
        if room is None:
            raise LookupError("Room not found")
        db.session.delete(room)
        db.session.commit()
        return
