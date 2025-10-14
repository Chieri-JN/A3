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
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BAvalon%5D_daily-avg.csv'],
	glassport_high_street:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BGlassport%20High%20Street%5D_daily-avg.csv'],
	lawrenceville:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLawrenceville%5D_daily-avg.csv'],
	liberty_sahs:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLiberty%20(SAHS)%5D_daily-avg.csv'],
	manchester:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BManchester%5D_daily-avg.csv'],
	north_braddock:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BNorth%20Braddock%5D_daily-avg.csv'],
	parkway_east_near_road:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BParkway%20East%20(Near%20Road)%5D_daily-avg.csv'],
	usa_pennsylvania_pittsburgh:
		['https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BUSA-Pennsylvania-Pittsburgh%5D_daily-avg.csv'],

	// Combine all the csv
	all : [
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BAvalon%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BGlassport%20High%20Street%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLawrenceville%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BLiberty%20(SAHS)%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BManchester%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BNorth%20Braddock%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BParkway%20East%20(Near%20Road)%5D_daily-avg.csv',
		'https://dig.cmu.edu/datavis-fall-2025/assignments/data/%5BUSA-Pennsylvania-Pittsburgh%5D_daily-avg.csv',
	]
};

export const stations = [
	{
		name : 'Avalon' ,
		id : "avalon"
	},
	{
		name :"Glassport High Street",
		id : "glassport_high_street"
	},
	{
		name :"North Braddock",
		id : 'north_braddock'
	},
	{
		name :"Lawrenceville",
		id :  "lawrenceville"
	},
	{
		name :"Parkway East",
		id : "parkway_east_near_road"
	},
	{
		name :"Manchester",
		id : "manchester"
	},
	{
		name :"Liberty (SAHS)" ,
		id : "liberty_sahs"
	},
	{
		name : "USA Pennsylvania Pittsburgh",
		id : "usa_pennsylvania_pittsburgh"
	},
	{
		name : "All stations",
		id : "all"
	}
];
