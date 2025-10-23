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
		color: "#992000",
		maxAqi: 78,
		minAqi: 10,
		wiki : "Avalon is a borough in Allegheny County, Pennsylvania, United States, along the Ohio River 6 miles downstream from Pittsburgh. The population was 4,762 at the 2020 census. It is a residential suburb of the Pittsburgh metropolitan area."
	},
	{
		name :"Glassport High Street",
		id : "glassport_high_street",
		city : "Glassport",
		long: -79.888693,
		lat : 40.326919,
		color: "#ff0066",
		maxAqi: 77,
		minAqi: 7,
		wiki : "Glassport is a borough in Allegheny County, Pennsylvania, United States, approximately 10 miles south of Pittsburgh and the confluence of the Monongahela and Allegheny rivers where they form the Ohio River."
	},
	{
		name :"North Braddock",
		id : 'north_braddock',
		city : "Braddock",
		long: -79.856389,
		lat : 40.405000,
		color: "#990099",
		maxAqi: 86,
		minAqi: 0,
		wiki :"North Braddock is a borough in Allegheny County, Pennsylvania, United States, along the Monongahela River. The 2020 census had the borough population at 4,320. It is a suburb 11 miles east of Pittsburgh"
	},
	{
		name :"Lawrenceville",
		id :  "lawrenceville",
		city : "Pittsburgh",
		long: -79.9609,
		lat : 40.4698,
		color: "#0000cc",
		maxAqi: 161,
		minAqi: 0,
		wiki :"Lawrenceville is one of the largest neighborhood areas in Pittsburgh in the U.S. state of Pennsylvania. It is located northeast of downtown, and like many of the city's riverfront neighborhoods, it has an industrial past."
	},
	{
		name :"Parkway East",
		id : "parkway_east_near_road",
		city : "Pittsburgh",
		//long : -79.8386593,
		long: -79.755056,
		//lat : 40.3956247
		lat : 40.438692,
		color: "#ffcc00",
		maxAqi: 152,
		minAqi: 6,
		wiki :"Interstate 376 (I-376) is a major auxiliary route of the Interstate Highway System in the US state of Pennsylvania, located within the Allegheny Plateau.  Within Allegheny County, the route runs along the majority of the Penn-Lincoln Parkway, known locally as Parkway West and Parkway East"
	},
	{
		name :"Manchester",
		id : "manchester",
		city : "Millvale",
		long:  -79.9784,
		lat : 40.4801,
		color: "#248f24",
		maxAqi: 83,
		minAqi: 5,
		wiki :"Manchester is a neighborhood located in the North Side region of Pittsburgh, Pennsylvania. The neighborhood is represented on Pittsburgh City Council by the District 6. Manchester houses PBF Battalion 1 & 37 Engine, and is covered by PBP Zone 1 and the Bureau of EMS Medic 4."
	},
	{
		name :"Liberty (SAHS)" ,
		id : "liberty_sahs",
		city : "McKeesport",
		long: -79.842663296,
		lat : 40.339665308,
		color: "#ee1111",
		maxAqi: 158,
		minAqi: 2,
		wiki :"Liberty is a borough in Allegheny County, Pennsylvania, United States. The population was 2,355 at the 2020 census. Liberty does not have its own post office. The zip code is 15133, and mail is addressed to the city of McKeesport"
	},

	{
		name : "USA Pennsylvania Pittsburgh",
		id : "usa_pennsylvania_pittsburgh",
		city : "Pittsburgh",
		long : -79.9972, // not quite sure of the accuracy
		lat: 40.4387,
		color: "#1f5fef",
		maxAqi: 133,
		minAqi: 3,
		wiki :"Pittsburgh is a city in western Pennsylvania at the junction of 3 rivers. Its Gilded Age sites, including the Carnegie Museum of Natural History, the Carnegie Museum of Art and the Phipps Conservatory and Botanical Gardens, speak to its history as an early-20th-century industrial capital. In the North Shore neighborhood are the modern Andy Warhol Museum, Heinz Field football stadium and PNC Park baseball stadium."
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
