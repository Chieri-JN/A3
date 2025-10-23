<script lang="ts">
	import BrushChart from '$lib/BrushChart.svelte';
	import * as d3 from 'd3';

	import { colours, datasets, stations } from '$lib/constants';
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';

	let rMin = $state(-1);
	let rMax = $state(-1);
	// let dMin = $state(new Date(2000));
	// let dMax = $state(new Date(2500));
	let dMin = $state(2000);
	let dMax = $state(2500);

	let showRawData = $state(true);

	let Ozone= $state({ name: 'Ozone', id: "Ozone", show: true , title: 'Ozone', display: false, color: "#0066ff"})
	let pm10 = $state({ name: 'PM10', id: "pm10", show: true, title: 'PM10', display: false, color: "#ff0011"})
	let pm25 = $state({ name: 'PM2.5', id: "pm25", show: true, title: 'PM2.5', display: false , color: "#990099"})
	let CO2  = $state({ name: 'C02', id: "CO2", show: true, title: 'Carbon Dioxide', display: false, color: "#0000cc" })
	let SO2  = $state({ name: 'SO2', id: "SO2", show: true, title: 'Sulfur Dioxide', display: false , color: "#ffcc00"})
	let NO2  = $state({ name: 'NO2', id: "NO2", show: true, title: 'Nitrogen Dioxide', display: false, color: "#248f24" })
	let pollutants = ([
		Ozone,
		pm10,
		pm25,
		CO2,
		SO2,
		NO2
	])

	console.log("POLLUTANTS: ",pollutants)


	let {data1, data2, nameOne="FirstName", nameTwo="SecondName"} : {data1: Item[], data2:Item[], nameOne:string, nameTwo: string} = $props()
	data1.pop()
	data2.pop()
	console.log("Data1: " ,data1)

	data1.forEach( d => {
		pollutants.forEach(p => {
			if (d.mainPollutant === p.name) {
				p.display=true;
			}
			})
	})

	data2.forEach( d => {
		pollutants.forEach(p => {
			if (d.mainPollutant === p.name) {
				p.display=true;
			}
		})
	})

</script>


<span class="charts">
<!--	FLIP BETWEEN MAP AND CHARTS-->

	<div>
		<span class="mpLabel">
			<h3>Main Pollutants</h3>
<!--		<div>-->
			<label for="ShowRawData">
				Show Raw Data
				<input type="checkbox" id="ShowRawData" bind:checked={showRawData}>
			</label>
<!--		</div>-->

		</span>
					<div>
							{#each pollutants.filter(pol => pol.display) as p}
								<span class = "p-selector">

									<input id={p.id} type="checkbox" bind:checked={p.show} name=""/>
									<label for ={p.id}>
											{p.title}
									</label>
									<div class = "cell" style="background-color: {p.color}"></div>
								</span>
							{/each}

					</div>
		<span class="charts">
					<div class="chart">
						<BrushChart
							data={data1}
							stationName={nameOne}
							showRawData={showRawData}
							selectionRange={[rMax, rMax, dMin, dMax]}
							showPollutants={pollutants}
							isAllData={false}
							isBrushing={true}
						/>
					</div>
					<div class="chart">
						<BrushChart
							data={data2}
							stationName={nameTwo}
							showRawData={showRawData}
							selectionRange={[rMin,rMax]}
							showPollutants={pollutants}
							isAllData={false}
							isBrushing={true}
						/>
					</div>
				</span>
	</div>
</span>

<div>
	<MapChart selectedStations={[nameOne,nameTwo]} 	data1={data1} data2={data2}/>
</div>


<!--<pre>-->
<!--{JSON.stringify(data1[0], null, 2)}-->
<!--</pre>-->

<!--<pre>-->
<!--{JSON.stringify(data2[0], null, 2)}-->
<!--</pre>-->

<style>
	.charts {
      /*padding-left: 0.75em;*/
      padding-right: 0.75em;
      display: inline-flex;
      /*gap: 10px;*/
      border-radius: 10px;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      /*width: 120px;*/
      /*height: 50px;*/
	}
	.chart {
			/*padding-right: 5em;*/
			/*padding-left: 1em;*/
			/*padding-bottom: 5em;*/
	}

	.cell {
			width: 20px;
			height: 20px;
      border-radius: 10px;
	}

	.p-selector{
      padding-left: 0.75em;
      padding-right: 0.75em;
      display: inline-flex;
      gap: 10px;

	}

	.mpLabel {
      display: inline-flex;
      align-content: center;
      align-items: center;
			label {
					padding-left: 1em;
			}
	}

</style>