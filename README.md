# Country Information API

This project provides an API to retrieve information about countries, such as population data, flags, and neighboring countries, using external APIs (Nager API and CountriesNow API).

## Features

- **Available Countries**: Retrieves a list of available countries.
- **Country Information**: Retrieves detailed information about a country, including:
  - Population data
  - Flag data
  - Neighboring countries

## Installation

Follow these steps to set up the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/country-information-api.git
cd country-information-api
npm install

npm run start
The API will be available at: http://localhost:3000

.env:
PORT=8000
BASE_URL_COUNTRY_NOW_API=https://api.countriesnow.space/v0.1
BASE_URL_NAGER_API = 'https://date.nager.at/api/v3'
```

## Endpoints

- **/available**
- Method: **GET**
- Description: Retrieves a list of available countries from the Nager API.
- Response:
```
{
  success: A boolean indicating if the request was successful.
  data: An array of available countries.
}
```

- **/:countryCode**
- Method: **GET**
  - Parameters: **countryCode** (A 3-letter uppercase country code (e.g., "USA", "BRA")).
- Description: Retrieves detailed information about a country using its 3-letter  ISO3 code. Information includes:
  - Neighboring countries (borders)
  - Population data
  - Flag image
- Response:
  success: A boolean indicating if the request was successful.
  data: An object containing the country's information, including borders, population, and flag.

Example request for country information
**GET** /countries/USA
```
{
"success": true,
"data": {
  "countryName": "United States of America",
  "borders": ["Canada", "Mexico"],
  "population": "331002651",
  "flag": "https://flagcdn.com/us.svg"
  }
}
```


# Services
**CountriesNowService**
This service interacts with the CountriesNow API to fetch population and flag data for countries.

**NagerApiService**
This service interacts with the Nager API to fetch population and flag data for countries.

**CountryService**
This service consolidates data from both Nager API and CountriesNow API to provide detailed country information, including population, flag, and borders.

**CountryController**
This controller exposes the API endpoints to fetch available countries and information about a specific country.

**Error Handling**
The API uses HttpException to handle errors. If an error occurs, the response will contain:
```
{
"success": false,
"message": "Failed to fetch country info"
}
```

# Dependencies
- NestJS: Framework for building scalable and efficient Node.js applications.
- Axios: Promise-based HTTP client for the browser and Node.js.
- ConfigService: Configuration management.

## License
This project is licensed under the MIT License.
