<script lang="ts">
	// https://github.com/topojson/us-atlas
	// https://github.com/d3/d3-geo
	// https://observablehq.com/@mbostock/u-s-state-map
	// TODO: https://observablehq.com/@d3/u-s-map
	// TODO: https://observablehq.com/@jeantimex/us-state-county-map

	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa, geoAlbers, geoMercator  } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import {stations} from '$lib/constants';
	import * as d3 from 'd3';

	let { selectedStations=["All stations"] } : {selectedStations : string[]} = $props()
	console.log("Selected Stations:", selectedStations);

	const cleanedStations = stations.filter(s => s.id!=="all");


	let svgElem : SVGElement;
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


		svg.append("g")
			.selectAll("circle")
			.data(cleanedStations)
			.join("circle")
			.attr("cx", (d) => projection([d.long, d.lat])[0])
			.attr("cy", (d) => projection([d.long, d.lat])[1])
			.attr("r", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? 10 : 5)
			.attr("fill", d => (selectedStations.find(s => d.name===s) || selectedStations[0]==="All stations") ? "red" : "black" );
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
</div>

<style>
		.map {
				align-items: center;
		}
</style>