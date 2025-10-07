<script lang="ts">
	// import { timeStamp } from 'console';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	interface Item {
		city: string;
		country: string;
		mainPollutant: string;
		pm25: number;
		state: string;
		stationName: string;
		timestamp: Date;
		usAqi: number;
	}

	interface dataPoint {
		tp : Date;
		usAqi: number
	}

	// properties this component accepts
	let { data , url, showRawData=false}: { data: Item[] , url : string, showRawData: Boolean} = $props();
	let colours = [
		{"name":"Good","min":0,"max":50,"color":"#9cd84e"},
		{"name":"Moderate","min":51,"max":100,"color":"#facf39"},
		{"name":"Unhealthy for Sensitive Groups","min":101,"max":150,"color":"#f99049"},
		{"name":"Unhealthy","min":151,"max":200,"color":"#f65e5f"},
		{"name":"Very Unhealthy","min":201,"max":300,"color":"#a070b6"},
		{"name":"Hazardous","min":301,"color":"#a06a7b"}
		// {"name":"None Data","min":0,"color":"#bbbbbb"}
	]

	let minYear = data.reduce((z, a) => z < a.timestamp ? z : a.timestamp , data[0].timestamp || new Date());
	let maxYear = data.reduce((z, a) => z > a.timestamp ? z : a.timestamp, data[0].timestamp || new Date());

	// let minAQI = data.reduce((z, a) => z < a.usAqi ? z : a.usAqi , data[0].usAqi);
	let maxAQI = data.reduce((z, a) => z > a.usAqi ? z : a.usAqi, data[0].usAqi);

	function getColour(val : number) {
		if (0 <= val && val <= 50 ) {
			return colours[0].color;
		} else if (51 <= val && val <= 100 ){
			return colours[1].color;
		} else if (101 <= val && val <= 150 ) {
			return colours[2].color;
		} else if (151 <= val && val <= 200 ) {
			return colours[3].color;		
		} else if (201 <= val && val <= 300 ) {
			return colours[4].color;
		} else if (301 <= val ) {
			return colours[5].color;
		} else {
			return colours[6].color;
		}
	}

	let svgElem: SVGSVGElement;
	function makeGraph() {
		const margin = {top: 10, right: 30, bottom: 30, left: 60},
			width = 900 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		const svgG = d3.select(svgElem)
			.selectAll("*")
			.remove();
			
		const svg = d3.select(svgElem)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// X axis
		const x = d3.scaleTime()
			.domain([minYear,maxYear])
			.range([0, width]);
		svg.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(d3.axisBottom(x).ticks(5));

		const y = d3.scaleLinear()
			.domain([0, maxAQI])
			.range([ height, 0]);
		svg.append("g")
			.call(d3.axisLeft(y).tickValues(d3.range(0, maxAQI, 20)));
			

		const band = d3.scaleLinear()
			// .domain(colours.map(d => d.min.toString()))
			.domain([0, maxAQI])
			.range([height, 0]);
			// .range([height, maxAQI])
		svg.append('g')
			.selectAll("rect.aqiColors")
			.data(colours)
			.join("rect")
			.attr("class", "aqiColors")
			.attr("x", 0)
			// .attr("y", 0)
			.attr("y", d => band(d.max || maxAQI))
			.attr("width", width)
			// .attr("height", d => Math.abs((d.max || d.min+50) - d.min) -1)
			.attr("height", d => band(d.min) -band(d.max ?? maxAQI))
			.style("fill",  d => getColour(d.min))
			.attr("opacity", 0.5);


		// show raw data if toggle 
		if (showRawData) {
			svg.append('g')
				.selectAll("dot")
				.data(data)
				.join("circle")
				.attr("cx", function (d) { return x(d.timestamp); } )
				.attr("cy", function (d) { return y(d.usAqi); } )
				.attr("r", 1.5)
				.style("fill",  "#000")
		}
	}

	$effect(() => {
		if (svgElem) {
			const svg = d3.select(svgElem);
			svg.selectAll('circle').remove();
			svg.selectAll("rect").remove();
			makeGraph();
		}else {
			return;
		}
	});


	onMount(makeGraph);
	// just for debugging; can be removed
	$inspect(data);

</script>

<div>
	<svg bind:this={svgElem} width="600" height="320"  >
	</svg>
</div>

<style>
	svg {
		font-family: sans-serif;
		overflow: visible;
		.legend span {
			aspect-ratio: 1 / 1;
			background: var(--color);
		}
	}

	legend span {
		aspect-ratio: 1 / 1;
		background: var(--color);
	}
</style>
