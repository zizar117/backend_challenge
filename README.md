# backend_challenge
Mati

Its needed to have Node and npm installed.
If not then use the following command:

# Adding the NodeSource APT repository for Debian-based distributions repository AND the PGP key for verifying packages
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# Install Node.js from the Debian-based distributions repository
$ sudo apt-get install -y nodejs

#Confirm that Node was successfully installed
node -v

# Updating npm version
sudo npm install npm --global

#For more information please visit: https://nodejs.org/en/download/package-manager/


# Dependencies

The dependencies needed for the application are the following:

nodexpress:   npm install express --save
bcrypt:       npm install bcrypt
body-parser:  npm install body-parser
mongoose:     npm install mongoose
mocha:        npm install --save-dev mocha
chai:         npm install --save-dev chai

# Deployment anr running command
Locate in the project folder then type: node server.js