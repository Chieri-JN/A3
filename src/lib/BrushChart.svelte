<script lang="ts">
	import * as d3 from 'd3';
	import  {onMount}  from 'svelte';
	import {colours} from '$lib/constants.js';

	interface Item {
		city: string;
		country: string;
		mainPollutant: string;
		pm25: number;
		state: string;
		stationName: string;
		timestamp: Date;
		usAqi: number;
		low : number;
		high : number;
	}

	let {data, stationName="PlaceHolder"} : {data : Item[], stationName:string }  = $props();

</script>
<div>
	<h2>Brush Chart for {stationName}</h2>
</div>

<style>


</style>