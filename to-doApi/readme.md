` URL designs`

## Tasks

    # Create tasks

    POST /tasks/createTask => Example: POST /tasks/createTask
    Response status code: 200 OK | 400 NOT FOUND
    Recives:
        {
        "title": "string",
        "completed": boolean,
        "description": "string",
        "username": "string"
        }

    Success response schema:
    {
        "status": 200,
        "message": "Task added"
    }
    
    Error response schema:
    {
        "error": true,
        "message": "List doesnt exists",
        "status": 404
    }

## Lists

    # Get username lists

    Get /toDo/getUserLists?username=value => Example: GET /toDo/getUserLists?username=lucascurtoo2

    Success response schema:
    {
    "status": 200,
    "data": [
        {
            "user": {
                "username": "lucascurtoo2"
            },
            "_id": "6375a6093829945e55e01031",
            "title": "My List",
            "todo": [],
            "__v": 0
        }
        ...
        ]
    }

    Error response schema:
    {
        "error": true,
        "message": "User doesnt exists",
        "status": 404
    }