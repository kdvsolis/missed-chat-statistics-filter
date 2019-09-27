Missed Chat Statistics Filter
========================

# Description
For filtering missed chats with 'start' and 'end' date as GET parameters

# Setup
1. Install NodeJS.
2. Pull this repo in any location on your computer.
3. Open terminal pointing to this code directory then do npm install.
4. Make a copy of config.json.example to config.json on the same directory level.
5. Run it with `node index.js`

# Usage
Go to browser then try http://localhost:8000/get_missed_chats?start=start-date&end=end-date
   Where:
     start = is start date with format 'YYYY-MM-DDTHH:mm:SS.ss'. Index 0 of query response by default
     end = is end date with format 'YYYY-MM-DDTHH:mm:SS.ss'. Last index of query response by default