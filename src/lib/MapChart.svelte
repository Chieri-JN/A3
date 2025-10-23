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

	let hoverStation = $state("");

	const cleanedStations = stations.filter(s => s.id!=="all");
	let LAT = $state(0);
	let LONG = $state(0);

	let svgElem : SVGElement;
	let tooltipElem: HTMLDivElement ;

	let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

	const width = 500;
	const height = 350;
	function drawMap(us) {
		// tooltipElem.innerHTML = `<strong>Hover over the points <br>to display details</strong> `;

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

		if (!tooltip) {
			tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0)
				.style("background-color", "white")
				.style("border-color", "#5577bb")
				.style("border", "solid")
				.style("border-radius", "5px")
				.style("border-width", "2px")
				.style("padding", "8px")
				.style("position", "absolute")
				.style("pointer-events", "none");
		}

		const g = svg
			.append("g")
			.attr("transform", `translate(${0}, ${0})`);

		// const gPoints = g.append("g").attr("class", "gPoints");
		const gPoints = svg.append("g").attr("class", "gPoints");

		gPoints
			.selectAll("circle")
			.data(cleanedStations)
			.attr("id", "stationPoint")
			.join("circle")
			.attr("cx", (d) => projection([d.long, d.lat])[0])
			.attr("cy", (d) => projection([d.long, d.lat])[1])
			.attr("r", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? 10 : 5)
			.attr("fill", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "red" : "black" )
			.on("mouseover", mouseover )
			.on("mousemove", mousemove )
			.on("mouseleave", mouseleave )


		function mouseover(event, d) {
			tooltip.style("opacity", 1)
				.html(`<strong>${d.name}</strong>
								<br>Lat: ${d.lat}
								<br>Long: ${d.long}`);
			hoverStation = d.name;
		}

		function mousemove(event, d) {
			tooltip
				.style("left", event.pageX + 10 + "px")
				.style("top", event.pageY - 20 + "px");
		}
		function mouseleave(event,d) {
			tooltip
				.transition()
				.duration(200)
				.style("opacity", 0)
		}
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


<div class="map"  bind:this={tooltipElem}>
	<h3>Allegheny County, PA</h3> <em>Hover over the points to display details</em>
	<svg bind:this={svgElem} width="400" height="300"  >
	</svg>
</div>


<style>
		.map {
				padding-top: 0.4em;
				align-items: center;
		}

</style>






