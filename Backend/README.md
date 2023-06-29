To get the server working, check the requirements.txt file to check the required packages you need to install.

# Setting Up the Database
Make sure you have postgresql installed already if you don't, visit https://www.postgresql.org/download/ to download postgresql
* open your services settings to start the postgresql server
* Open the PgAdmin application and set it up
* Alternatively, watch this playlist(https://youtube.com/playlist?list=PLwvrYc43l1MxAEOI_KwGe8l42uJxMoKeS) to check how to setup postgresql from terminal

# Creating your database and connecting to it
* Open you pgAdmin app
* create a new database called 'signmein' or create a database and give it your own name but make sure you've changed the name of the database to your preferred  * name in your settings.py file
* make a connection to your database (watch this video https://youtu.be/bE9h6aAky4s to understand how to do that)

# Migrating your database model to the database
* Make your models available for migrations by entering 'py manage.py makemigration users' in the terminal
* Migrate all your database models to the database by entering 'py manage.py migrate' in the terminal
* Start the server by entering "py manage.py runserver" in the terminal

# API EndPoints
1. organization/signup/ - This endpoint is used for registering new organization
* Method - POST
* The required fields for this endpoint are
* a. name - name of the organization
* b. email - email of the organization
* c. number_of_workers - number of workers working in the organization
* d. company_address - the company's address
* e. password - organization password
* f. confirm_password - confirm organization password
* The response for this endpoint is 
> response = {
    'id',
    'email',
    'username',
    'is_organization' - (returns true if user is an organization and false if user is not an organization)
    'is_worker' - (returns False)
  }

* 2. user/signin - This endpoint is used to login the users
* Method - POST
* The required fields for this endpoint are
* a. email - organization email
* b. password - organization password 
* The response for this endpoint if authentication was successful is 
> response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': access token,
                'refresh': refresh token,
                'authenticatedUser': {
                    'username': organization username(organization name),
                    'email': organization email,
                }
            }

* 3. organization/dashboard - This endpoint is used to get the current organization user
* Method - GET
 > response = {
    'id', 
    'email', 
    'username',
    'is_organization' - (returns true if user is an organization and false if user is not an organization),
    'is_worker'
  }
  
  * 4. add_workers - This endpoint is used to add new workers by the organization
  * Method - POST
  * The required fields for this endpoint are
  * "first_name": worker's first name
  * "last_name": worker's last name
  * "email": worker's email address
  * "gender": worker's gender(can only be male or female)
  * "age": worker's age
  * "house_address": worker's house address 
  * "password": worker's password
  * "confirm_password": confirm worker's password
> response = {
    "user": {
        "id",
        "email",
        "username",
        "is_organization"(false),
        "is_worker"(true)
    }
}

  
* 6. workers/dashboard - this endpoint is used to get current worker and can only be accessed by a registered worker
* Method - GET
> response = {
    'id', 
    'email', 
    'username',
    'is_organization' - (returns False),
    'is_worker'- (returns True)
  }
 * 7. organization/<int:organization_id>/list_workers - this endpoint is used to list all the workers of an organization and can only be accessed by the organization
 * Method - GET
 > response = {
    "id",
    "organization_workers": [
        dictionary of organization_ workers
    ],
    "name",
    "description",
    "number_of_workers",
    "company_address",
    "user" - user_id
    }
    
* 8. organization/<int:user_id>/generate_code - this endpoint is used to generate new QRCode and can only be accessed an authenticated organization
* Method - PUT
> response = {
    "id",
    "UUID"(qr code UUID),
    "organization"(organization id)
}

* 9. scan_code/<int:organization_id> - This endpoint is used to get the QRcode UUID and can only be accessed by an authenticated worker
* Method - GET
> response = {
    "UUID": qrcode uuid"
}

* 10. clock_in - This endpoint is used to clock in the worker and can only be accessed by an authenticated worker
* Method - POST 
* required field/fields for this endpoint is/are
* qrcode_id - QRcode UUID
> response = {
    "id",
    "qrcode_id": QRcode UUID,
    "date": current date,
    "clock_in": current time",
    "clock_out": current time,
    "worker": worker id
}

* 11. clock_out/<int:qrcode_id> - This endpoint is used to clock out worker and can only be accessed by an authenticated worker
* Method - PUT
> response = {
    "id":,
    "qrcode_id": QRcode UUID,
    "date": current date,
    "clock_in": clock_in time,
    "clock_out": clock_out time,
    "worker": worker id
}

* 12. worker/attendance_history - This endpoint is used to get the current worker attendance history 
* Method - GET
> response = {
            No: {
            "date",
            "clock_in",
            "clock_out"
        }(dictionary of worker attendance)
        
* 13. time_record - This endpoint is used to get the attendance history of the organization workers
* Method - GET
> response = {
            'worker's name':[ {worker's attedance history(date, clock_in, clock_out)} ]
            }
* 14. attendance_record - This endpoint is used to get the attendance history of the organization workers
* Method - GET
> response = [
            {
            'name'
            'date'
            'clock_in'
            'clock_out'
            }
            ]

