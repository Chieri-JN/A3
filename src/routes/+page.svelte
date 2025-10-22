<script lang="ts">
	import AQIChart from '$lib/AQIChart.svelte';
	import * as d3 from 'd3';
	import { colours, datasets, stations } from '$lib/constants';
	import Chip from '$lib/Chip.svelte';

	let showRawData = $state(false);

	let selectedDataset: keyof typeof datasets = $state('lawrenceville');

	const data = $derived.by(async () =>
	{
		if (selectedDataset === "all") {
			const combinedData = datasets["all"].url.map(dataSet => {
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
			return d3.csv(datasets[selectedDataset].url[0], (d: any) => ({
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

	stations.sort((a, b) => a.name.localeCompare(b.name));

</script>

{#await data}
	<!-- promise is pending -->
	<p>loading data...</p>
{:then data}
	<!-- promise was fulfilled or not a Promise -->
	<h1>Part One: AQI Chart for { selectedDataset==="all" ? "All Stations" : data[0].stationName ?? data[0].city}</h1>
	<div>
		<label class="region-selector">
			<select class="region-selector" bind:value={selectedDataset}>
				<option value = "all">--No region Selected (show all) --</option>
				{#each stations as s}
					<option value ={s.id}>
						{s.name}
						({ data.length})
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

	<div  style="padding-bottom: 100px">
		<AQIChart {data} url={datasets[selectedDataset]} showRawData={showRawData}/>
	</div>

	<div class="legend">
		US AQI:
		{#each colours as c}
				<span style="padding: 5px">
					<Chip name={c.name} colour={c.color} rMax={c.max} rMin={c.min}/>
				</span>
			{/each}
	</div>
	
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}


<style>
	.region-selector{
		align-self: center;
	}

	.legend{
			align-items: center;
			display: inline-flex;
	}

</style>
