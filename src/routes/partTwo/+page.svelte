<script>
	import AQIChart from '$lib/AQIChart.svelte';
	import * as d3 from 'd3';
	import { colours, datasets, stations } from '$lib/constants';
	import Chip from '$lib/Chip.svelte';
</script>


<!--{#await data}-->
<!--	<p>loading data...</p>-->

<!--{:then data}-->
<!--	<div  style="padding-bottom: 100px">-->
<!--&lt;!&ndash;		<AQIChart {data} url={datasets[selectedDataset]} showRawData={showRawData}/>&ndash;&gt;-->
<!--	</div>-->
<!--{:catch error}-->
<!--	&lt;!&ndash; promise was rejected &ndash;&gt;-->
<!--	<p>Something went wrong: {error.message}</p>-->
<!--{/await}-->

<h2>
Part Two : Interactive Data Visualization
</h2>
<di>


</di>