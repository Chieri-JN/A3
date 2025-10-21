<script lang="ts">
	import BrushChart from '$lib/BrushChart.svelte';
	import * as d3 from 'd3';
	import { colours, datasets, stations } from '$lib/constants';
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';
	import AQIChart from '$lib/AQIChart.svelte';


	let {data1, data2, nameOne="FirstName", nameTwo="SecondName"} : {data1: Item[], data2:Item[], nameOne:string, nameTwo: string} = $props()
	data1.pop()
	data2.pop()
	console.log("Data1: " ,data1)
</script>


<h2>Comparing stations <em style="color: red">{nameOne}</em> and <em style="color: red">{nameTwo}</em></h2>
<span class="charts">
	<div>
		<MapChart selectedStations={[nameOne,nameTwo]} 	data1={data1} data2={data2}/>
	</div>
	<div>
<!--				<span class="charts">-->
<!--					<div class="chart">-->
<!--						<BrushChart data={data1} stationName={nameOne} showRawData={true} />-->
<!--					</div>-->
<!--					<div class="chart">-->
<!--						<BrushChart data={data2} stationName={nameTwo} showRawData={true}/>-->
<!--					</div>-->
<!--				</span>-->
	</div>
</span>

<!--<div>-->
<!--			<span class="charts">-->

<!--				<div class="chart">-->
<!--					<BrushChart data={data1} stationName={nameOne} showRawData={true} />-->
<!--				</div>-->
<!--				<div class="chart">-->
<!--					<BrushChart data={data2} stationName={nameTwo} showRawData={true}/>-->
<!--				</div>-->
<!--			</span>-->
<!--</div>-->

<!--<pre>-->
<!--{JSON.stringify(data1[0], null, 2)}-->
<!--</pre>-->

<!--<pre>-->
<!--{JSON.stringify(data2[0], null, 2)}-->
<!--</pre>-->

<style>
	.charts {
      padding-left: 0.75em;
      padding-right: 0.75em;
      display: inline-flex;
      gap: 10px;

      border-radius: 10px;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      /*width: 120px;*/
      /*height: 50px;*/
	}
	.chart {
			padding-right: 5em;
			/*padding-left: 1em;*/
			padding-bottom: 5em;
	}
</style>