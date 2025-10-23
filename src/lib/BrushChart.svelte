<script lang="ts">
	import * as d3 from 'd3';
	import  {onMount}  from 'svelte';
	import {colours, allPollutants} from '$lib/constants.js';
	import type {Item, Pollutant} from './types'

	let {
				data,
				stationName="PlaceHolder",
				isAllData=false,
				showRawData=false,
				showPollutants=allPollutants,
				selectionRange=[-1,-1, -1, -1]
		}
		: {data : Item[], stationName:string, isAllData:boolean , showRawData: Boolean, showPollutants:Pollutant[], selectionRange:number[]}  = $props();

	let minYear = data.reduce((z, a) => z < a.timestamp ? z : a.timestamp , data[0].timestamp || new Date());
	let maxYear = data.reduce((z, a) => z > a.timestamp ? z : a.timestamp, data[0].timestamp || new Date());
	let maxAQI = data.reduce((z, a) => z > a.usAqi ? z : a.usAqi, data[0].usAqi);
	console.log("isAllData:", isAllData)
	let getView = (d) => {
		for (let i = 0; i < showPollutants.length ; i++) {
			let p = showPollutants[i];
			if (d.mainPollutant === p.name) {
				d.visible = p.show
				return p.show
			}
		}
		return false
	}

	let remappedDates : Item[] = structuredClone(data).map<Item>(d => {d.timestamp = new Date(d.timestamp.getFullYear(), d.timestamp.getMonth(),15); return d;});
	// remappedDates
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
	let toolElem : HTMLDivElement;

	const margin = {top: 5, right: 5, bottom: 30, left: 60},
		width = (isAllData ?  1000 : 700) - margin.left - margin.right,
		height = (isAllData ? 500 : 350) - margin.top - margin.bottom;

	// Main drawing
	function makeGraph() {
		// filter points out of data.
		let variableRemappedDates = remappedDates.filter(d => getView(d))

		d3.select(svgElem)
			.selectAll("*")
			.remove();

		const svg = d3.select(svgElem)
			.append("svg")
			.attr("width", width)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleTime()
			.domain([minYear,maxYear])
			.range([0, width-(margin.left)]);
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
			.style("fill",  d => d.color)
			.attr("opacity", (isAllData ? 0.5 : 0.25));

		const eightyP = d3.area<Item>()
			.x(d => x(d.timestamp))
			.y0(d => y(d.low))
			.y1(d => y(d.high))

		svg.append("path")
			.datum(variableRemappedDates)
			.attr("fill", "#111111")
			.attr("stroke", "none")
			.attr("stroke-width", 0)
			.attr("d", eightyP)
			.attr("opacity", 0.2);

		const line = d3.line<Item>()
			.x(d => x(d.timestamp))
			.y(d => y(d.usAqi))
		svg.append("path")
			.datum(variableRemappedDates)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2)
			.attr("d", line)

		// show raw data if toggle
		if (showRawData) {

			const tooltip = d3.select("body")
				.append("div")
				.style("opacity", 0)
				.attr("class", "tooltip")
				.style("background-color", "white")
				.style("border", "solid 1px")
				.style("border-radius", "5px")
				.style("padding", "10px")
				.style("position", "absolute");


			function mouseover(event, d) {
				if (isAllData) {
				tooltip.style("opacity", 1)
				}
			}

			function mousemove(event, d) {
				if (isAllData) {
				tooltip
					.html(`<strong>${d.stationName ? "Station" : "City"}: ${d.stationName ?? d.city}</strong>
									<br><em>Main Pollutant :</em> ${d.mainPollutant}
									<br><em>AQI:</em> ${d.usAqi}
									<br><em>Date:</em>${d.timestamp.toLocaleDateString()}` )
					.style("left", event.pageX + 10 + "px")
					.style("top", event.pageY - 20 + "px");
				}
			}

			// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
			function mouseleave(event,d) {
				if (isAllData) {
				tooltip
					.transition()
					.duration(200)
					.style("opacity", 0)
				}
			}


			svg.append('g')
				.selectAll("circle")
				.data(data)
				.join("circle")
				.attr("cx", function (d) { return x(d.timestamp); } )
				.attr("cy", function (d) { return y(d.usAqi); } )
				.attr("r", 2.5)
				.style("visibility", d => (getView(d) ? "visible" : "hidden"))
				.style("fill",  d => (isAllData	? 'black' :(showPollutants.find(p => p.name === d.mainPollutant) ??{color : "black"})).color)
				.on("mouseover", mouseover )
				.on("mouseenter", mousemove )
				.on("mouseleave", mouseleave )

		}
	}



	$effect(() => {
		if (svgElem) {
			const svg = d3.select(svgElem);
			svg.selectAll('circle').remove();
			svg.selectAll("rect").remove();
			svg.selectAll("path").remove();

			makeGraph();
			svg.selectAll("circle")
				.style("visibility", d => (getView(d) ? "visible" : "hidden"));
		}else {
			return;
		}
	});


	onMount(makeGraph);
	// just for debugging; can be removed
	// $inspect(data);

</script>


{#if isAllData}
	<div bind:this={toolElem}>
		<h2>All the Stations</h2>
		<svg bind:this={svgElem} width={"600"} height="400"  >
		</svg>
	</div>
{:else}
	<div class="content">
		<h2>Pollutants for {stationName}</h2>
		<svg bind:this={svgElem} width="650" height="350"  >
		</svg>
	</div>
{/if}


<style>

    svg {
        font-family: sans-serif;
        overflow: visible;
        white-space: nowrap;
				/*padding-bottom: 14em;*/

    }

		.content {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        gap: 0.5rem;
        position: relative;
    }

    .content h2 {
        margin: 0;
        /*text-align: center;*/
        /*white-space: nowrap;*/
        padding-left: 50px;
    }

    .tooltip {
        position: absolute;
        pointer-events: none;
        font-size: 12px;
    }

</style>

