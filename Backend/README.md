To get the server working, check the requirements.txt file to check the required packages you need to install.

**Setting Up the Database**
Make sure you have postgresql installed already if you don't, visit https://www.postgresql.org/download/ to download postgresql
open your services settings to start the postgresql server
Open the PgAdmin application and set it up
Alternatively, watch this playlist(https://youtube.com/playlist?list=PLwvrYc43l1MxAEOI_KwGe8l42uJxMoKeS) to check how to setup postgresql from terminal

**Creating your database and connecting to it**
Open you pgAdmin app
create a new database called 'signmein' or create a database and give it your own name but make sure you've changed the name of the database to your preferred name in your settings.py file
make a connection to your database (watch this video https://youtu.be/bE9h6aAky4s to understand how to do that)

**Migrating your database model to the database**
Make your models available for migrations by entering 'py manage.py makemigration users' in the terminal
Migrate all your database models to the database by entering 'py manage.py migrate' in the terminal
Start the server by entering "py manage.py runserver" in the terminal

**API EndPoints**
1. organization/signup/ - This endpoint is used for registering new organization
The required fields for this endpoint are
a. name - name of the organization
b. email - email of the organization
c. number_of_workers - number of workers working in the organization
d. company_address - the company's address
e. password - organization password
f. confirm_password - confirm organization password
The response for this endpoint is 
response = {
    'email', 
    'is_organization' - (returns true if user is an organization and false if user is not an organization)
  }

2. organization/signin - This endpoint is used to login the organizations
The required fields for this endpoint are
a. email - organization email
b. password - organization password 
The response for this endpoint is 
response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': access token,
                'refresh': refresh token,
                'authenticatedUser': {
                    'email': organization email,
                }
            }

3. organization/dashboard - This endpoint is used to get the current user
 responce = {
    'email', 
    'is_organization' - (returns true if user is an organization and false if user is not an organization)
  }
