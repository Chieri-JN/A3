<script lang="ts">
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';
	import BrushChart from '$lib/BrushChart.svelte';
	import AQIChart from '$lib/AQIChart.svelte';

	let { data } : {data : Item[]} = $props();
	let showRawData = $state(false);

	// console.log(data)
</script>



<!--<div>-->
<!--	<MapChart/>-->
<!--</div>-->
<div>
	<div style="padding-bottom: 1em">
		<label for="ShowRawData">
			Show Raw Data
			<input type="checkbox" id="ShowRawData" bind:checked={showRawData}>
		</label>
	</div>
	<div>
		<BrushChart data={data} stationName="all Stations" isAllData={true}  showRawData={showRawData}/>
	</div>
</div>


<!--<pre>-->
<!--{JSON.stringify(data[0], null, 2)}-->
<!--</pre>-->