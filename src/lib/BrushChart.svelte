<script lang="ts">
	import * as d3 from 'd3';
	import  {onMount}  from 'svelte';
	import {colours} from '$lib/constants.js';
	import type {Item} from './types'

	let {data, stationName="PlaceHolder", isAllData=false,  showRawData=false} : {data : Item[], stationName:string, isAllData:boolean , showRawData: Boolean}  = $props();

	let minYear = data.reduce((z, a) => z < a.timestamp ? z : a.timestamp , data[0].timestamp || new Date());
	let maxYear = data.reduce((z, a) => z > a.timestamp ? z : a.timestamp, data[0].timestamp || new Date());
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

	let remappedDates : Item[] = structuredClone(data).map<Item>(d => {d.timestamp = new Date(d.timestamp.getFullYear(), d.timestamp.getMonth(),15); return d;});
	const allPointsInMonth = new Map();
	remappedDates.forEach(d => {
		const key = d.timestamp.toString()
		const curr : number[] = allPointsInMonth.get(key) ?? [];
		curr.push(d.usAqi);
		allPointsInMonth.set(key, curr)
	})
	remappedDates.forEach(d => {
		const lst : number[] = allPointsInMonth.get(d.timestamp.toString())
		d.usAqi = lst.reduce((z,a) => z+a, 0) / lst.length
		const monthVals = allPointsInMonth.get(d.timestamp.toString())
		d.low = d3.quantile(monthVals, 0.10) ?? maxAQI*0.1;
		d.high = d3.quantile(monthVals, 0.90) ?? maxAQI*.9;
	})
	remappedDates.sort((a,b) =>  a.timestamp.getTime() - b.timestamp.getTime())

	let svgElem: SVGSVGElement;
	function makeGraph() {
		const margin = {top: 5, right: 30, bottom: 30, left: 60},
			width = (isAllData ?  1000 : 700) - margin.left - margin.right,
			height = (isAllData ? 500 : 400) - margin.top - margin.bottom;

		d3.select(svgElem)
			.selectAll("*")
			.remove();

		const svg = d3.select(svgElem)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleTime()
			.domain([minYear,maxYear])
			.range([0, width]);
		svg.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(d3.axisBottom(x).ticks(5));

		const yAxis = d3.scaleLinear()
			.domain([0, maxAQI])
			.range([ height, 0]);
		svg.append("g")
			.call(d3.axisLeft(yAxis)
				.tickValues(d3.ticks(0, maxAQI, 10))
				.tickFormat(d => "")
				.tickSize(-width))
			.attr("stroke", "#ccc")
			.attr("opacity", 0.2);

		// unsure how to remove double tick when the maxAQI is close to a tick line...
		/*
			TODO fix double tick when  maxAQI is close to a tick line...
		 */
		const y = d3.scaleLinear()
			.domain([0, maxAQI])
			.range([ height, 0]);
		svg.append("g")
			.call(d3.axisLeft(y)
				.tickValues(d3.ticks(0, maxAQI, 10))
				.tickFormat(d => d.toString()))

		const band = d3.scaleLinear()
			.domain([0, maxAQI])
			.range([height, 0]);
		svg.append('g')
			.selectAll("rect.aqiColors")
			.data(colours)
			.join("rect")
			.attr("class", "aqiColors")
			.attr("x", 0)
			.attr("y", d => band(d.max ?? maxAQI))
			.attr("width", width)
			.attr("height", d => band(d.min-1 < 0 ? 0 : d.min-1 ) -band(d.max ?? maxAQI))
			.style("fill",  d => getColour(d.min))
			.attr("opacity", 0.5);

		const eightyP = d3.area<Item>()
			.x(d => x(d.timestamp))
			.y0(d => y(d.low))
			.y1(d => y(d.high))

		svg.append("path")
			.datum(remappedDates)
			.attr("fill", "#111111")
			.attr("stroke", "none")
			.attr("stroke-width", 0)
			.attr("d", eightyP)
			.attr("opacity", 0.2);

		const line = d3.line<Item>()
			.x(d => x(d.timestamp))
			.y(d => y(d.usAqi))
		svg.append("path")
			.datum(remappedDates)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("d", line)

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
	// $inspect(data);

</script>
{#if {isAllData}}
	<h2>Brush Chart for {stationName}</h2>
	<svg bind:this={svgElem} width="600" height="320"  >
	</svg>
{:else}
	<div class="content">
		<h2>Brush Chart for {stationName}</h2>
		<svg bind:this={svgElem} width="600" height="320"  >
		</svg>
	</div>
{/if}


<style>

    svg {
        font-family: sans-serif;
        overflow: visible;
        white-space: nowrap;
				padding-bottom: 2em;

    }

		.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .content h2 {
        margin: 0;
        /*text-align: center;*/
        white-space: nowrap;
        padding-left: 90px;
    }

</style>