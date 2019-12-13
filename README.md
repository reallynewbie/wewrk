# wewrk
## Currently being hosted on http://www.wewrk.ca

## Requirements
Node (currently using 11)

## Install Dependencies
```
npm install
```

## Run Scraper
```
node index.js
```

## Run API
```
node api.js
```

## Back-End Project Structure:

* index.js - Scraper program
* api.js - Hosts the Express API, which has a single endpoint of /search.
* wrkDB.js - MySQL DB Helper functions with all queries.  Used by index.js to insert Job Postings, and api.js to handle the search queries.


## Setup Front-End
```
cd frontend/wewrk
npm install
```

## Run Front-End(Dev Mode)
```
cd frontend/wewrk
npm run serve
```

## Build Front-End (Production)
```
cd frontend/wewrk
npm run build
```
