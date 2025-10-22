// All possible fields
export interface Item{
	city: string;
	country: string;
	mainPollutant: string;
	pm25: number;
	state: string;
	stationName: string;
	timestamp: Date;
	usAqi: number;
	low : number;
	high : number;
	// possibly null
	Ozone: number;
	NO2: number;
	SO2: number;
	CO: number;
	pm10: number;
	visible: boolean;
}


export interface Pollutant {
	name: string,
	id : string,
	show: boolean,
	title : string,
	display : boolean,
	color : string
}