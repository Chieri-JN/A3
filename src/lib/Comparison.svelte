<script lang="ts">
	import BrushChart from '$lib/BrushChart.svelte';
	import * as d3 from 'd3';
	import { colours, datasets, stations } from '$lib/constants';
	import type {Item} from '$lib/types';
	import MapChart from '$lib/MapChart.svelte';


	let {data1, data2, nameOne="FirstName", nameTwo="SecondName"} : {data1: Item[], data2:Item[], nameOne:string, nameTwo: string} = $props()

</script>


<h2>Comparing stations {nameOne} and {nameTwo}</h2>
<div>
	<MapChart />
</div>
<div>
			<span>
				<BrushChart data={data1} stationName="Chart 1"/>
				<BrushChart data={data2} stationName="Chart 2"/>
			</span>

</div>

<pre>
{JSON.stringify(data1[0], null, 2)}
</pre>

<pre>
{JSON.stringify(data2[0], null, 2)}
</pre>