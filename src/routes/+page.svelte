<script lang="ts">
	import AQIChart from '$lib/AQIChart.svelte';
	import * as d3 from 'd3';

	const datasets = {
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

	let showRawData = $state(false);

	let selectedDataset: keyof typeof datasets = $state('avalon');

	const data = $derived.by(async () =>
	{
		if (selectedDataset === "all") {
			const combinedData = datasets["all"].map(dataSet => {
					return d3.csv(dataSet, (d: any) =>
						({
								city: d.City,
								country: d.Country,
								mainPollutant: d['Main pollutant'],
								pm25: +d['PM2.5'],
								state: d.State,
								stationName: d['Station name'],
								timestamp: new Date(d['Timestamp(UTC)']),
								usAqi: +d['US AQI']
							}
						))

			});
			const loadedData = await Promise.all(combinedData);
			return loadedData.flat();

		} else {
			return d3.csv(datasets[selectedDataset][0], (d: any) => ({
					city: d.City,
					country: d.Country,
					mainPollutant: d['Main pollutant'],
					pm25: +d['PM2.5'],
					state: d.State,
					stationName: d['Station name'],
					timestamp: new Date(d['Timestamp(UTC)']),
					usAqi: +d['US AQI']
				}
			))
		}
	}
	);

	// const data = $derived.by(() =>
	// 	d3.csv(datasets[selectedDataset], (dt: any[]) => ({
	// 			if (dt.Lenght() == 1) {
	// 				let d = dt[0];
	// 				return {
	// 					city: d.City,
	// 					country: d.Country,
	// 					mainPollutant: d['Main pollutant'],
	// 					pm25: +d['PM2.5'],
	// 					state: d.State,
	// 					stationName: d['Station name'],
	// 					timestamp: new Date(d['Timestamp(UTC)']),
	// 					usAqi: +d['US AQI']
	// 				}
	// 			} else {
	//
	// 			}
	// 		}
	// 	))
	// );


	const stations = [
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
			name : "all",
			id : "all"
		}

	];
	stations.sort((a, b) => a.name.localeCompare(b.name));
</script>

{#await data}
	<!-- promise is pending -->
	<p>loading data...</p>
{:then data}
	<!-- promise was fulfilled or not a Promise -->
	<h2>AQI Chart for {data[0].stationName || data[0].city}</h2>
	<div>
		<label class="region-selector">
			<select class="region-selector" bind:value={selectedDataset}>
				<option value = "all">--No region Selected (show all) --</option>
				{#each stations as s}
					<option value ={s.id}>
						{s.name}
						{ data.length} 
					</option>
				{/each}
			</select>
		</label>
		
		<div>
			<label for="ShowRawData">
				Show Raw Data
				<input type="checkbox" id="ShowRawData" bind:checked={showRawData}>
			</label>
		</div>
		<p>Number of Records { data.length} </p>
	</div>

	<div>
		Visualization here
		<AQIChart {data} url={datasets[selectedDataset]} showRawData={showRawData} />
	</div>
	
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}


<style>
	* {
		font-family: sans-serif;
	}

	.region-selector{
		align-self: center;
	}
</style>
