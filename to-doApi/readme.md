` URL designs`

## Tasks

    # Create task

    POST /tasks/createTask => Example: POST /tasks/createTask
    Response status code: 200 OK | 400 BAD REQUEST
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
    or
    {
        "error": true,
        "message": "Task already exists",
        "status": 400
    }

    # Update task

    PUT /tasks/updateTask => Example: PUT /tasks/updateTask
    Response status code: 200 OK | 404 NOT FOUND
    Recives: 
        {
        "title": "string",
        "completed": boolean,
        "description": "string",
        "newDescription": "string",
        "username": "string"
        }
    
    Success response schema:
    {
        "status": 200,
        "message": "Task succesfully updated"
    }

    Error response schema:
    {
        "error": true,
        "message": "Cant update that task",
        "status": 400
    }
    or
    {
        "error": true,
        "message": "Task doesnt exists",
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