# audience-encore-csv-parser

A simple way to parse a correctly formatted .tsv file (might add csv later) in order to populate a segment sitting in PubMatic's Audience Encore with audience data.

## Requirements

- Node

## How to

Run

    npm install

to install all dependencies.

Then add tsv file to 'data' directory and update config.fileName in app.js.

Finally, run

    node app.js

to run script.

Any errors should be logged in a new file in the 'logs' directory.
