//config
Area = new Mongo.Collection("area");
Station = new Mongo.Collection('station');
Pollutant = new Mongo.Collection('pollutant');

//user
UserPublic = new Mongo.Collection('userPublic');

//monitor
PollutantCityDaily = new Mongo.Collection('dataCityDaily');
PollutantCityHourly = new Mongo.Collection('dataCityHourly');
PollutantStationDaily = new Mongo.Collection('dataStationDaily');
PollutantStationHourly = new Mongo.Collection('dataStationHourly');

//forecast
AirQualityForecast = new Mongo.Collection('dataAirForecast');
WeatherForecast = new Mongo.Collection('weather');