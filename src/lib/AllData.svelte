<script lang="ts">
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';
	import BrushChart from '$lib/BrushChart.svelte';
	import AQIChart from '$lib/AQIChart.svelte';
	import { colours } from '$lib/constants';
	import Chip from '$lib/Chip.svelte';
	import SelectionChart from '$lib/SelectionChart.svelte';

	let { data } : {data : Item[]} = $props();
	let showRawData = $state(false);

	// console.log(data)
</script>



<!--<div>-->
<!--	<MapChart/>-->
<!--</div>-->
<div>
	<div class="legend">
		US AQI:
		{#each colours as c}
				<span style="padding: 5px">
					<Chip name={c.name} colour={c.color} rMax={c.max} rMin={c.min}/>
				</span>
		{/each}
	</div>
	<div style="padding-bottom: 0.1em">
		<label for="ShowRawData">
			Show Raw Data
			<input type="checkbox" id="ShowRawData" bind:checked={showRawData}>
		</label>
	</div>

	<div>
		<SelectionChart data={data} stationName="all Stations"   showRawData={showRawData}/>
	</div>

<!--	<div style="padding-top: 5em">-->
<!--		<BrushChart data={data} stationName="all Stations"   showRawData={showRawData}/>-->
<!--	</div>-->
</div>



<!--<pre>-->
<!--{JSON.stringify(data[0], null, 2)}-->
<!--</pre>-->

<style>
    .legend{
        align-items: center;
        display: inline-flex;
    }
</style>