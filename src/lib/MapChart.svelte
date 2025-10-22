<script lang="ts">
	// based off of these examples:
	/**
	 * https://observablehq.com/@john-guerra/how-to-add-a-tooltip-in-d3
	 * https://svelte.dev/playground/33d086ab38fb42c48c39bd5f191fb890?version=5.41.0
	 */

	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa, geoAlbers, geoMercator  } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import {stations} from '$lib/constants';
	import * as d3 from 'd3';
	import type {Item} from '$lib/types'

	let { selectedStations=["All stations"], data1, data2 } : {selectedStations : string[], data1:Item[], data2:Item[]} = $props()
	console.log("Selected Stations:", selectedStations);



	const cleanedStations = stations.filter(s => s.id!=="all");
	let LAT = $state(0);
	let LONG = $state(0);

	let svgElem : SVGElement;
	let tooltipElem: HTMLDivElement;

	const width = 500;
	const height = 400;
	function drawMap(us) {
		const counties = topojson.feature(us, us.objects.counties).features;
		const county =  counties.find(d => d.properties.name === "Allegheny");
		console.log("County:", county);
		let projection = geoMercator().center([-79.95, 40.44])
			.scale(28500)
			.translate([width / 2, height / 2]);

		let path =  geoPath().projection(projection)

		let svg = d3.select(svgElem)
			.attr("width", width)
			.attr("height", height);
		svg.selectAll("*").remove();

		svg.append("path")
			.datum(county)
			.attr("d", d => path(d))
			.attr("stroke", "black")
			.attr("stroke-width", "5")
			.attr("fill", "none");

		let mouseenter = function (event, d) {
			const [mx, my] = d3.pointer(event);
			LAT	= d.lat.toPrecision(4);
			LONG = d.long.toPrecision(4);
			const textT = `Station: ${d.name} \n LONG:${d.long} \nLAT : ${d.lat}`;
			// language=HTML
			// const tooltipText = `
			//   <strong>Station:</strong> ${d.name}
			//   <br>
			//   <strong>LONG:</strong> ${d.long}
			//   <br>
			//   <strong>LAT :</strong> ${d.lat}`;

			tooltipElem.innerHTML =
				`<strong>Station:</strong>  ${d.name}
			  <br>
			  <strong>LONG:</strong> ${d.long}
			  <br>
			  <strong>LAT :</strong> ${d.lat}`;

			// tooltipElem.style.top = event.offsetX
			// tooltipElem.style.left = event.offsetY

			// tooltip
				// .attr("transform", `translate(${mx+20}, ${my-100})`)
				// .selectAll("tooltip")
				// .data(tooltipText.split("\n"))
				// .join("tspan")
				// .attr("dy", "1em")
				// .attr("x", "0px")
				// // .style("top", `${my}px`)
				// // .style("left", `${mx}px`)
				// .html(tooltipText);

			// tooltip
			// 	.attr("transform", `translate(${mx+20}, ${my-100})`)
			// 	.selectAll("tspan")
			// 	.data(textT.split("\n"))
			// 	.join("tspan")
			// 	.attr("dy", "1em")
			// 	.attr("x", "0px")
			// 	.style("background-color", "white")
			// 	.text((text) => text )
			// 	.html(`<strong>${d.name}</strong><br>Longitude: ${d.long}<br>Latitude: ${d.lat}`)
		}

		const g = svg
			.append("g")
			.attr("transform", `translate(${0}, ${0})`);

		const gPoints = g.append("g").attr("class", "gPoints");

		// Let's create a tooltip SVG text element
		const tooltip = g
			.append("text")
			.attr("class", "tooltip")
			.attr("fill", "black")
			.style("pointer-events", "none");

		gPoints
			.selectAll("circle")
			.data(cleanedStations)
			.attr("id", "stationPoint")
			.join("circle")
			.attr("cx", (d) => projection([d.long, d.lat])[0])
			.attr("cy", (d) => projection([d.long, d.lat])[1])
			.attr("r", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? 10 : 5)
			.attr("fill", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "red" : "black" )
			.on("mouseenter", mouseenter)
			.on("mouseout", () => {tooltip.text("");})
			.on("mouseover", (event, d) => {event.target.style.fill=((selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "#b30000" : "#5b73a4")})
			.on("mouseleave", (event, d) => {event.target.style.fill= ((selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "red" : "black")});
	}

	$effect(() => {
		if (svgElem) {
			const svg = d3.select(svgElem);
			svg.selectAll('circle').remove();
			svg.selectAll("rect").remove();
			async () => {
				const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
					.then(d => d.json())
				console.log({ us })
				drawMap(us)
			}
		}else {
			return;
		}
	});

	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
			.then(d => d.json())
			console.log({ us })
			drawMap(us)
	});

</script>
<p>Hover over points to see details</p>
<div class="map">
	<div class="tooltip" bind:this={tooltipElem}></div>
	<svg bind:this={svgElem} width="400" height="400"  >
	</svg>
</div>


<style>
		.map {
				align-items: center;
		}



		.tooltip {
        font: sans-serif 12pt;
        background: #eeeeeeee;
        pointer-events: none;
        border-radius: 4px;
				border-width: 4px;
				border-color: #5577bb;
        max-width: fit-content;
        padding: 5px;
        /*position: absolute;*/
        top: 0px;
        left: 0px;
        z-index: 1

		}
</style>