#cd to directory of Flask app
cd backend/api/

#For powershell
$env:FLASK_APP = "app:create_app('default')"

#For Linux system
#export FLASK_APP="app:create_app('default')"

flask run