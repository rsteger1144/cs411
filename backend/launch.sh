#cd to directory of Flask app
cd backend/api/

#For powershell
$env:FLASK_APP = "app:create_app('default')"

#For Linux system
#export FLASK_APP="app:create_app('default')"

#Spotify API
$env:SPOTIPY_CLIENT_ID='b98ff6008c5140e89bc9c9cddb10a79d'
$env:SPOTIPY_CLIENT_SECRET='87d812604c4f4cda965d933bb87f2f23'

flask run