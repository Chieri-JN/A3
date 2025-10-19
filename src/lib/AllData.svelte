<script lang="ts">
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';
	import BrushChart from '$lib/BrushChart.svelte';

	let { data } : {data : Item[]} = $props();

	console.log(data)
</script>



<div>
	<MapChart/>
</div>

<div>
		<BrushChart data={data} stationName="all Stations"/>
</div>

<pre>
{JSON.stringify(data[0], null, 2)}
</pre>