# Property Management App 🏡

This is a recruitment task for the company **CoverTree**.
This app helps you manage property with a slick UI and powerful backend, integrated with weather data.

## Technologies

**Backend**:

- Node.js
- Apollo Server
- GraphQL
- Mongoose (MongoDB)
- WeatherStack API
- TypeScript

  **Frontend**:

- React
- TypeScript
- Apollo Client
- Material-UI
- Leaflet (Maps)

## Installation

**Clone the repository**:

Clone the repository:

```bash
git clone https://github.com/ewelinalazur/property-management-app.git
```

**Backend Setup:**

Navigate to the backend folder:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

**Frontend Setup:**

Navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

## 🚀 Running the application

To run the **backend**:

```bash
cd backend
npm start
```

To run the **frontend**:

```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000. 🖥️

## 🔑 Environment Variables

Below are the required environment variables to run the application:

`WEATHERSTACK_API_KEY`: Your WeatherStack API key.
`MONGODB_URI`: The URI for your MongoDB database.
`PORT`: The port number for the backend (default is 4000).
Create a .env file in the backend folder and add the following variables:

```bash
WEATHERSTACK_API_KEY=your-api-key-here
MONGODB_URI=your-mongodb-uri-here
PORT=4000
```

## 🖥️ GraphQL API

The application uses GraphQL API. Here are some sample queries and mutations you can use:

**Query** properties

```bash
query {
  properties {
    _id
    city
    street
    state
    zipCode
    weatherData {
      temperature
      weather_descriptions
    }
    lat
    long
  }
}
```

**Mutation** createProperty

```bash
mutation {
  createProperty(city: "New York", street: "5th Avenue", state: "NY", zipCode: "10001") {
    _id
    city
    street
    state
    zipCode
  }
}
```
