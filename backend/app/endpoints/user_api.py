from flask import jsonify, request
from flask_restful import Resource, reqparse, abort
from flask_restful_swagger import swagger
from typing import List
from app import db
from app.database.user import User
from app.database.room_user import RoomUser


class UserListApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        super(UserListApi, self).__init__()

    @swagger.operation(
        notes="Returns all users",
        parameters=[],
        responseMessages=[
            {
                "code": 200,
                "message": "Got all of the users",
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self):
        try:
            return jsonify(self.__get_all_users())
        except:
            abort(500)
    def __get_all_users(self):
        return [user.to_json() for user in User.query.all()]


    @swagger.operation(
        notes="Creates a new user",
        parameters=[
            {
                "name": "name",
                "description": "Name of the user to add",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Created the new user successfully"
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def post(self):
        try:
            args = self.reqparse.parse_args()
            return jsonify(self.__create_user(args["name"]))
        except:
            abort(500)
    def __create_user(self, user_name):
        user = User(name=user_name)
        db.session.add(user)
        db.session.commit()
        return user.to_json()


class UserApi(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("name", type=str, required=False, default="", location="json")
        super(UserApi, self).__init__()

    @swagger.operation(
        notes="Returns the specific user",
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to get",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Returned the user"
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def get(self, user_id):
        try:
            return jsonify(self.__get_user(user_id))
        except:
            abort(500)
    def __get_user(self, user_id):
        return User.query.get(user_id).to_json()


    @swagger.operation(
        notes="Updates the specific user",
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to update",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
            {
                "name": "name",
                "description": "Name to update user with",
                "required": True,
                "allowMultiple": False,
                "dataType": "string",
                "paramType": "body"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Updated the user"
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def put(self, user_id):
        try:
            return jsonify(self.__update_user(user_id, self.reqparse.parse_args()))
        except:
            abort(500)
    def __update_user(self, user_id, args):
        user = User.query.get(user_id)
        for k, v in args.items():
            if v is not None:
                setattr(user, k, v)
        db.session.commit()
        return user.to_json()

    @swagger.operation(
        notes="Deletes the specific user",
        parameters=[
            {
                "name": "user_id",
                "description": "ID of the user to delete",
                "required": True,
                "allowMultiple": False,
                "dataType": "int",
                "paramType": "path"
            },
        ],
        responseMessages=[
            {
                "code": 200,
                "message": "Deleted the user"
            }, {
                "code": 500,
                "message": "Internal server error",
            }
        ]
    )
    def delete(self, user_id):
        try:
            self.__delete_user(user_id)
            return jsonify(success=True)
        except:
            abort(500)
    def __delete_user(self, user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return