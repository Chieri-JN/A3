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


	const width = 600;
	const height = 400;
	function drawMap(us) {
		const counties = topojson.feature(us, us.objects.counties).features;
		// county = topojson.feature(us, us.objects.counties).features.find(d => d.id === "42003");
		const county =  counties.find(d => d.id === "42003");
		console.log("County:", county);
		// projection.fitSize([600, 400], county[0]);
		// let projection = geoMercator().fitSize([600, 400], county);
		let projection = geoMercator().center([-79.95, 40.44])  // center on Pittsburgh
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
			.attr("fill", "none");

		// let tooltip = d3.select(tooltipElem)
		// let tooltip = d3.select(svgElem)
		// 	.append("div")
		// 	.attr("class", "tooltip")
		// 	.style("opacity", 1)
		// 	.style("background-color", "white")
		// 	.style("border", "solid")
		// 	.style("border-width", "2px")
		// 	.style("border-radius", "5px")
		// 	.style("padding", "5px")
		// 	.text("I'm a circle!");
		//
		let mouseover = function(event, d) {
			tooltip.style("opacity", 1)
			// console.log("OVREOVERO");
				const [mx, my] = d3.pointer(event);
				tooltip
					.attr("x", mx)
					.attr("y", my)
					// .text(`a LONG: ${d.long} | LAT: ${d.lat}`)
					.html(`Station: ${d.name} \n LONG:${d.long} \nLAT : ${d.lat}`)
		}

		let mouseleave = function(event, d) {
			tooltip.style("opacity", 0)
		}

		let mouseenter = function (event, d) {
			const [mx, my] = d3.pointer(event);
			LAT	= d.lat;
			LONG = d.long;
			const textT = `Station: ${d.name} \n LONG:${d.long} \nLAT : ${d.lat}`;
			// language=HTML
			const tooltipText = `
			  <strong>Station:</strong>  ${d.name}
			  <br>
			  <strong>LONG:</strong>: :${d.long}
			  <br>
			  <strong>LAT :</strong>: ${d.lat}`;

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
				//
				// .append("div")
				// .selectAll("tspan")
				// .attr("class", "tooltip")
				// .style("opacity", 1)
				// .style("background-color", "white")
				// .style("border", "solid")
				// .style("border-width", "2px")
				// .style("border-radius", "5px")
				// .style("padding", "5px")
				// .text(textT);

			tooltip
				.attr("transform", `translate(${mx+20}, ${my-100})`)
				.selectAll("tspan")
				.data(textT.split("\n"))
				.join("tspan")
				.attr("dy", "1em")
				.attr("x", "0px")
				.style("background-color", "white")
				.text((text) => text );
		}

		let mousemove = function(event, d) {
			tooltip
				// .html(d.name + "<br>Long:" + "long: " + d.long + "<br>Lat" + "lat: " + d.lat)
				.html(`<strong>${d.name}</strong><br>Longitude: ${d.long}<br>Latitude: ${d.lat}`)
				// .style("left", (event.x)/2 + "px")
				// .style("top", (event.y)/2 - 30 + "px")
				.style("left", event.offsetX + 10 + "px")
				.style("top", event.offsetY + 10 + "px");
			// console.log("MOVE");
			LAT	= d.lat;
			LONG = d.long;
			console.log(d.name, d.long, d.lat);
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
			// .on("mouseover", mouseover)
			.on("mouseenter", mouseenter)
			.on("mouseout", () => {
				tooltip.text("");
			});


		// svg.append("g")
		// 	.selectAll("circle")
		// 	.data(cleanedStations)
		// 	.attr("id", "stationPoint")
		// 	.join("circle")
		// 	.attr("cx", (d) => projection([d.long, d.lat])[0])
		// 	.attr("cy", (d) => projection([d.long, d.lat])[1])
		// 	.attr("r", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? 10 : 5)
		// 	.attr("fill", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "red" : "black" )
		// 	.on("mouseover", mouseover)
		// 	.on("mousemove", mousemove)
		// 	.on("mouseleave", mouseleave);



		// const tooltip = d3.selectAll("#circle")
		// 	.append("div")
		// 	.style("position", "absolute")
		// 	.style("visibility", "hidden")
		// 	.text("I'm a circle!");


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

<div class="map">
	<svg bind:this={svgElem} width="600" height="400"  >
	</svg>
	<div class="tooltip"></div>
</div>
<h1>LAT: {LAT}</h1>
<h1>LONG: {LONG}</h1>

<style>
		.map {
				align-items: center;
		}


    .tooltip {
        font: sans-serif 12pt;
        background: #eeeeeeee;
        pointer-events: none;
        border-radius: 2px;
        padding: 5px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;

    }
</style>