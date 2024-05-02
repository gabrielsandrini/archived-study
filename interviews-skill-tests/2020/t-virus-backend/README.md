# T-Virus Backend

# To run the project:

- Run `yarn` in the project folder to install the dependencies
- Create a Postgres database named "tvirus"
- Run `yarn typeorm migration:run` to run all the migrations
- Run `yarn dev:server` to start the server (The server will start on port 3333)
- Run `yarn test` to run the tests and get code coverage

# Available Endpoints:

## Add survivors to the database

path: POST /api/people.json

body:
{
"name": "John Doe",
"age": 65,
"gender": "M",
"lonlat": "Point(-0000.111 1111.000)",
"Fiji Water": 100,
"Campbell Soup": 101,
"First Aid Pouch": 102,
"AK47": 103
}

response:
{
"name": "John Doe",
"age": 65,
"gender": "M",
"lonlat": "Point(-0000.111 1111.000)",
"fiji_water": 100,
"campbell_soup": 101,
"first_aid_pouch": 102,
"AK47": 103,
"id": "a714f5bd-7f12-4082-90af-51de4c6060b3",
"infected": false,
"created_at": "2020-08-24T01:47:10.732Z",
"updated_at": "2020-08-24T01:47:10.732Z"
}

## Update Survivor

path: PATCH /api/people/{id}

body:
{
"name": "John Doe",
"age": 65,
"gender": "M",
"lonlat": "Point(1 2)"
}

response:
{
"name": "John Doe",
"age": 65,
"gender": "M",
"lonlat": "Point(-0000.111 1111.000)",
"fiji_water": 100,
"campbell_soup": 101,
"first_aid_pouch": 102,
"AK47": 103,
"id": "a714f5bd-7f12-4082-90af-51de4c6060b3",
"infected": false,
"created_at": "2020-08-24T01:47:10.732Z",
"updated_at": "2020-08-24T01:47:10.732Z"
}

## Trade Items

path: POST /api/people/{id}/properties/trade_item.json
// The id above is the survivor id

body:
{
"name": "John Doe", // The Recipient Name
"pick": {
"Fiji Water": 5,
"Campbell Soup": 0,
"First Aid Pouch": 5,
"AK47": 0
},
"payment": {
"Fiji Water": 0,
"Campbell Soup": 6,
"First Aid Pouch": 0,
"AK47": 6
}
}

response:
no body
success = status 200
Not acceptable = status 406

## Register if someone suspects someone else is infected

path: POST /api/people/:id/report_infection.json
// The id above is the survivor id

body:
{
"infected": "04cbb355-7d4a-42b6-adec-11a1ee7e46dd"
}
// The id above is the person UUID with the infection suspect

response:
{
"people_id": "52bcc768-cf96-4e32-bf18-dc9f1f84ef8b",
"infected_id": "04cbb355-7d4a-42b6-adec-11a1ee7e46dd",
"created_at": "2020-08-23T06:22:34.933Z",
"updated_at": "2020-08-23T06:22:34.933Z"
}
