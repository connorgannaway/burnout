### RaceMob
Project for CS340 Fall 2023

### Project Name: 
RaceMob
### Project Description: 
A mobile app that aggregates info from different motorsport competitions. Basically a carbon copy of the Fotmob app for soccer but for racing.
### Group Members & GitHub ID's:
- Nicholas Lindsey - nryanl
- Aaron King - aaronpig9
- Cody Allen - calle102
- Caleb Kornegay - CalebKornegay
- Connor Gannaway - connorgannaway
- Peyton Davis - peytonad
- Andrew Lindstrom - aglindstrom

### Group Size
 This group is full.

## Project Documentation

#### Requirements
- A computer running MacOS, Windows, or Linux.
- A smartphone running iOS or Android for running the app using Expo Go.

### Installation Steps (Frontend)
1. **Install Node.js and npm**: Download and install Node.js (which includes npm) from [https://nodejs.org/en/](https://nodejs.org/en/). If you are on Linux, you can install the nodejs and npm as packages.
If you encounter any issues, make sure you have Python, NodeJS and jdk8 installed in your system if not, install them.

2. **Install React Native CLI**: Open a terminal and run `npm install -g react-native-cli`.

3. **Clone the GitHub Repository**:
   - Use `git clone https://github.com/utk-cs340-fall23/RaceMob.git` to clone the repository to your machine.

4. **Navigate to the Project Directory**: 
   - After cloning, navigate to this directory: `RaceMob/app/frontend/burnout`.

5. **Install Dependencies**: Run `npm install` to install all the required dependencies listed in the `package.json` file. You may need to install yarn, which you can do by running `npm install yarn`.

6. **Expo Go Installation**:
   - For iOS: Download the “Expo Go” app from the Apple App Store.
   - For Android: Download the “Expo Go” app from the Google Play Store.

7. **Start the React Native Server**: Run `npx expo start` in the project directory. This will start the Metro Bundler.

#### Running the App on Your Phone
1. **Make Sure Your Phone and Computer Are On The Same Network**: This is necessary for the Expo Go app to access the React Native server running on your computer.

2. **Open Expo Go on Your Smartphone**: Once opened, you will see an option to scan a QR code. If on iPhone, open the camera app instead.

3. **Scan the QR Code with Expo Go**:
   - A QR code will appear in the terminal or command prompt where you started the React Native server.
   - Scan this QR code using the Expo Go app.

4. **Open the Project in Expo Go**:
   - After scanning, the app should start building on your phone. 

5. **View the App**: Once the build is complete, the app should automatically open on your phone. If not, you should be able to manually open it from a list of apps on Expo Go's home page.

#### Important Notice
To run and use the app, this is all that is needed to be done. The app is configured to use our current staging API hosted at `https://pitwall.connorgannaway.net`.  If there are issues with the app loading, check the [Network Status](https://status.connorgannaway.net). To run your own backend server, follow the instructions below.

### Installation Steps (Backend)
1. **Install Python**: Install Python >= 3.10 from https://www.python.org.
2. **Create a virtual environment**:
   - Navigate to `RaceMob/app/backend`.
   - Run the command `python -m venv venv`. This will create a virtual envirionment using Python's venv package called venv.
   - Activate this virtual environment by running `.\venv\Scripts\activate` on Windows or `. venv/bin/activate` on Linux.
3. **Install Packages**: To install necessary backend packages, run `pip install -r requirements.txt`.
4. **Setup Database**: This step is NOT NECESSARY if you are using the included sqlite3 file. For ease of use, we've included the development database to help mitigate errors in importing data.
   - Run `python manage.py migrate`. This will create the database and tables.
   - Import data from `Racemob/app/backend/csv`. The preferred tool for this is [DataGrip](https://www.jetbrains.com/datagrip/)
5. **Run the Backend Server**: Run the server using `python manage.py runserver`

### API Endpoints
The following endpoints are accessible when running your local backend server or at the [Staging API](https://pitwall.connorgannaway.net/version).

A note: Endpoints are returned as html, with styling for viewing on the web. adding the query parameter `?format=json` to any endpoint will cause it to return the raw json response. This is what is used in the application.

- `verson/`: Returns API version information.
- `v1/messages/`: Returns any enabled application messages, run with `?all=true` to return all messages
- `v1/messages/<pk>/`: Returns a specific message
- `v1/races/nearest/`: Returns a list of previous, ongoing, and upcoming race ids based off the current date. Takes an optional date parameter
- `v1/races/<pk>/`: Returns all details about a race.
- `v1/races/<pk>/brief/`: Returns brief information about a race.
- `v1/drivers/`: Returns a list of all drivers.
- `v1/drivers/<pk>/`: Returns information about a driver and their past performances
- `v1/teams/`: Returns a list of teams in the current season. Takes an optional year parameter.
- `v1/teams/<pk>/`: Returns information about a specific team and their previous performances.
- `v1/leagues/`: Returns a list of all leagues.
- `v1/leagues/<pk>/`: Returns information about the races and standings in a league's current season. Takes an optional year parameter.