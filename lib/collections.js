//config
Area = new Mongo.Collection("area");
Station = new Mongo.Collection('station');
Pollutant = new Mongo.Collection('pollutant');
MobileVersion = new Mongo.Collection('mobileApp');

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
AirQualityPrepare = new Mongo.Collection('airQuality');
AirQualityRelease = new Mongo.Collection('dataAirQuality');

//warning
Warning = new Mongo.Collection('warning');
Terminal = new Mongo.Collection('terminal');

//feedback
Feedback = new Mongo.Collection('feedback');

//service
Service = new Mongo.Collection('service');

//statistics
Visits = new Mongo.Collection('visits');

//share
Share = new Mongo.Collection('share');

