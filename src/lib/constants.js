export let colours = [
	{"name":"Good","min":0,"max":50,"color":"#9cd84e"},
	{"name":"Moderate","min":51,"max":100,"color":"#facf39"},
	{"name":"Unhealthy for Sensitive Groups","min":101,"max":150,"color":"#f99049"},
	{"name":"Unhealthy","min":151,"max":200,"color":"#f65e5f"},
	{"name":"Very Unhealthy","min":201,"max":300,"color":"#a070b6"},
	{"name":"Hazardous","min":301,"color":"#a06a7b"}
];


export 	const datasets = {
	avalon:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BAvalon%5D_daily-avg.csv'],
			file: ['/data/avalon.csv']
		},
	glassport_high_street:
		{ url : ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BGlassport%20High%20Street%5D_daily-avg.csv'],
			file: ['/data/glassport_high_street.csv']
		},
	lawrenceville:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLawrenceville%5D_daily-avg.csv'],
			file: ['/data/lawrenceville.csv']
		},
	liberty_sahs:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLiberty%20(SAHS)%5D_daily-avg.csv'],
			file: ['/data/liberty_sahs.csv']
		},
	manchester:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BManchester%5D_daily-avg.csv'],
			file: ['/data/manchester.csv']
		},
	north_braddock:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BNorth%20Braddock%5D_daily-avg.csv'],
			file: ['/data/north_braddock.csv']
		},
	parkway_east_near_road:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BParkway%20East%20(Near%20Road)%5D_daily-avg.csv'],
			file: ['/data/parkway_east_near_road.csv']
		},
	usa_pennsylvania_pittsburgh:
		{ url: ['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BUSA-Pennsylvania-Pittsburgh%5D_daily-avg.csv'],
			file: ['/data/usa_pennsylvania_pittsburgh.csv']
		},
	// Combine all the csv
	all :
	{
		url : [
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BAvalon%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BGlassport%20High%20Street%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLawrenceville%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLiberty%20(SAHS)%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BManchester%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BNorth%20Braddock%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BParkway%20East%20(Near%20Road)%5D_daily-avg.csv',
			'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BUSA-Pennsylvania-Pittsburgh%5D_daily-avg.csv'
		],
			// not available in comparison view
			file: [
				'/data/avalon.csv',
				'/data/glassport_high_street.csv',
				'/data/lawrenceville.csv',
				'/data/liberty_sahs.csv',
				'/data/manchester.csv',
				'/data/north_braddock.csv',
				'/data/parkway_east_near_road.csv',
				'/data/usa_pennsylvania_pittsburgh.csv'
			]
	}
};

export const stations  = [
	{
		name : 'Avalon' ,
		id : "avalon",
		city : "Avalon",
		long : -80.0675554,
		lat: 40.5009019,
		color: "#992000"
	},
	{
		name :"Glassport High Street",
		id : "glassport_high_street",
		city : "Glassport",
		long: -79.888693,
		lat : 40.326919,
		color: "#ff0066"
	},
	{
		name :"North Braddock",
		id : 'north_braddock',
		city : "Braddock",
		long: -79.856389,
		lat : 40.405000,
		color: "#990099"
	},
	{
		name :"Lawrenceville",
		id :  "lawrenceville",
		city : "Pittsburgh",
		long: -79.9609,
		lat : 40.4698,
		color: "#0000cc"
	},
	{
		name :"Parkway East",
		id : "parkway_east_near_road",
		city : "Pittsburgh",
		//long : -79.8386593,
		long: -79.755056,
		//lat : 40.3956247
		lat : 40.438692,
		color: "#ffcc00"
	},
	{
		name :"Manchester",
		id : "manchester",
		city : "Millvale",
		long:  -79.9784,
		lat : 40.4801,
		color: "#248f24"
	},
	{
		name :"Liberty (SAHS)" ,
		id : "liberty_sahs",
		city : "McKeesport",
		long: -79.842663296,
		lat : 40.339665308,
		color: "#ee1111"
	},

	{
		name : "USA Pennsylvania Pittsburgh",
		id : "usa_pennsylvania_pittsburgh",
		city : "Pittsburgh",
		long : -79.9972, // not quite sure of the accuracy
		lat: 40.4387,
		color: "#1f5fef"
	},
	{
		name : "All stations",
		id : "all",
		city : "",
		long: 0,
		lat : 0
	}
];


let Ozone=({ name: 'Ozone', id: "Ozone", show: true , title: 'Ozone', display: false, color: "#0066ff"})
let pm10 =({ name: 'PM10', id: "pm10", show: true, title: 'PM10', display: false, color: "#ff0066"})
let pm25 =({ name: 'PM2.5', id: "pm25", show: true, title: 'PM2.5', display: false , color: "#990099"})
let CO2  =({ name: 'C02', id: "CO2", show: true, title: 'Carbon Dioxide', display: false, color: "#0000cc" })
let SO2  =({ name: 'SO2', id: "SO2", show: true, title: 'Sulfur Dioxide', display: false , color: "#ffcc00"})
let NO2  =({ name: 'NO2', id: "NO2", show: true, title: 'Nitrogen Dioxide', display: false, color: "#248f24" })
export const allPollutants = ([
	Ozone,
	pm10,
	pm25,
	CO2,
	SO2,
	NO2
])
