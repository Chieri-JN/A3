<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();

	let pages = [
		{url: '.', title: "Part One"},
		{url: "partTwo", title: "Part Two"}
	];
	let interactionOptions = ["comparison", ""]
	let selectedOption = $state('comparison');


</script>


<nav class=nav-bar>
	<ul>
	  {#each pages as p}
		<li>
		  <a
			href={p.url}
			class:current={page.route.id === p.url}
			target={ p.url.startsWith("http") ? "_blank" : null }
		  >
			{p.title}
		  </a>
		</li>
	  {/each}
	</ul>
</nav>


<style>
	:root {
			--color-accent: oklch(60% 0.15 250);
			--color-main: oklch(95% 5% 287.974);
      font: 100%/1.5 system-ui;
      font-family: sans-serif;
	}


/*.crumb{*/
/*    display: inline-block;*/
/*}*/
.nav-bar {
    display: flex;
    margin-bottom: 0.5em;
    color: inherit;
    margin-inline: auto;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: oklch(80% 3% 200);

    ul {
        list-style-type: none;
        padding-left: 0;
        display: flex;
        width: 100%;
    }

    li {
        display: contents;
        /* display: inline-block; */
    }

    a {
        flex: 1;
        padding: 0.5em;
        text-decoration: none;
        color: inherit;
        text-align: center;
    }

    a:hover {
        border-bottom-width: 0.4em;
        border-bottom-style: solid;
				border-bottom-color: var(--color-accent);
        background-color: oklch(from var(--color-accent) 95% 5% h);
        /*background-color: color-mix(in oklch, var(--color-accent), canvas 85%);*/

    }

    a.current {
        border-bottom-width: 0.4em;
        border-bottom-style: solid;
        border-bottom-color: oklch(0.763 0.129 287.974);
        /*background-color: oklch(95% 5% 287.974);*/
        background-color: color-mix(in oklch, oklch(95% 5% 287.974), canvas 85%);
        /*background-color: color-mix(in oklch, var(--color-main), canvas 85%);*/
        padding-bottom: 0.1em;

    }

    a::after {
        display: inline-block;
        color: black;
        font-size: 80%;
        font-weight: bold;
        padding: 0 3px;
    }
}


</style>

{@render children?.()}
