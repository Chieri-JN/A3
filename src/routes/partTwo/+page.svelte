<script lang="ts">
	import * as d3 from 'd3';
	import { colours, datasets, stations } from '$lib/constants';
	import Chip from '$lib/Chip.svelte';
	import MapChart from '$lib/MapChart.svelte';
	import BrushChart from '$lib/BrushChart.svelte';
	import Comparison from '$lib/Comparison.svelte';
	import type { Item } from '$lib/types';
	import AllData from '$lib/AllData.svelte';



	let selectedDataset1: keyof typeof datasets = $state('lawrenceville');
	let selectedDataset2: keyof typeof datasets = $state('avalon');

	let showAllData = $state(false);

	function getNameFromID (ID : string)  {
		for (let i = 0; i < stations.length; i++) {
			if (stations[i].id=== ID) {
				return stations[i].name;
			}
		}
		return "Invalid Station id"
	}

	const data = $derived.by(async () => {
		// show all data
		if (showAllData) {
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
							usAqi: +d['US AQI'],
							// possible pollutants if present
							Ozone: d.Ozone ? +d['Ozone'] : null,
							NO2: d.NO2 ? +d['NO2'] : null,
							SO2: d.SO2 ? +d['SO2'] : null,
							CO: d.CO ? +d['C0'] : null,
							pm10: d.PM10 ? +d['PM10'] : null,
						}
					))
			});
			const loadedData = await Promise.all(combinedData);
			return loadedData.flat();
		} else {

			const d1 = d3.csv(datasets[selectedDataset1].url[0], (d: any) => ({
					city: d.City,
					country: d.Country,
					mainPollutant: d['Main pollutant'],
					pm25: +d['PM2.5'],
					state: d.State,
					stationName: d['Station name'],
					timestamp: new Date(d['Timestamp(UTC)']),
					usAqi: +d['US AQI'],
					// possible pollutants if present
					Ozone: d.Ozone ? +d['Ozone'] : null,
					NO2: d.NO2 ? +d['NO2'] : null,
					SO2: d.SO2 ? +d['SO2'] : null,
					CO: d.CO ? +d['C0'] : null,
					pm10: d.PM10 ? +d['PM10'] : null,
				}
			));

			const d2 =  d3.csv(datasets[selectedDataset2].url[0], (d: any) => ({
					city: d.City,
					country: d.Country,
					mainPollutant: d['Main pollutant'],
					pm25: +d['PM2.5'],
					state: d.State,
					stationName: d['Station name'],
					timestamp: new Date(d['Timestamp(UTC)']),
					usAqi: +d['US AQI'],
					// possible pollutants if present
					Ozone: d.Ozone ? +d['Ozone'] : null,
					NO2: d.NO2 ? +d['NO2'] : null,
					SO2: d.SO2 ? +d['SO2'] : null,
					CO: d.CO ? +d['C0'] : null,
					pm10: d.PM10 ? +d['PM10'] : null,
				}
			));

			return await Promise.all([d1,d2]);
		}
	})


</script>



<h1>
	Part Two : Interactive Data Visualization
</h1>
<div style="padding-bottom: 1em">
	<label class="interaction-selector">
<!--		<select class="interaction-selector" bind:value={showAllData}>-->
<!--			<option value={true}>&#45;&#45;Compare All Stations&#45;&#45;</option>-->
<!--			<option value={false}>&#45;&#45;Compare Two Stations&#45;&#45;</option>-->
<!--		</select>-->

		<input type="radio" bind:group={showAllData} value={true} name="showData">
		Compare All Stations
	</label>
	<label class="interaction-selector">
		<input type="radio" bind:group={showAllData} value={false} checked name="showData">
		Compare Two Stations
	</label>
</div>

{#if showAllData}
	{#await data}
		<p>loading data...</p>
	{:then data}
		<div  style="padding-bottom: 100px">
			<MapChart/>
			<AllData data={data}/>
		</div>
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}

{:else}
	{#await data}
		<p>loading data...</p>
	{:then [data1, data2]}
		<div  style="padding-bottom: 100px">

			<span class= "rs-span">
			<div>
				<span  >
					<label class="region-selector">
						Station 1:
					<select class="temp" bind:value={selectedDataset1}>
						{#each stations.filter(sn => sn.id!=="all" && sn.id!==selectedDataset2.toString()) as s}
							<option class="temp" value ={s.id} >
								{s.name}
							</option>
						{/each}
					</select>
					</label>

					<label class="region-selector">
						Station 2:
					<select  class="temp" bind:value={selectedDataset2}>
						{#each stations.filter(sn => sn.id!=="all" && sn.id!==selectedDataset1.toString()) as s}
							<option class="temp" value ={s.id} >
								{s.name}
							</option>
						{/each}
					</select>
					</label>
				</span>
			</div>
<!--				<MapChart selectedStations={[getNameFromID(selectedDataset1.toString()),getNameFromID(selectedDataset2.toString())]}/>-->


			</span>

			<Comparison
				data1={data1}
				data2={data2}
				nameOne={getNameFromID(selectedDataset1.toString())}
				nameTwo={getNameFromID(selectedDataset2.toString())}
			/>
		</div>
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
{/if}


<style>
	.region-selector {
			/*position: absolute;*/
			padding-right: 1em;
	}

	.temp {
			max-width: fit-content;
			text-align: center;
	}

	.interaction-selector {
	}

	.rs-span {
      padding-left: 0.75em;
      padding-right: 0.75em;
      display: inline-flex;
      gap: 10px;
	}

</style>