<script>
    let {name, colour, rMin, rMax, selected=false} = $props();
		let fontColour = rMin < 151 ? "#444444" : "#FFFFFF"

		let cc = selected ? "#ffffff" : colour;
</script>


<div class="chip" style="--colour: {cc}">
	<p style="color: {fontColour}"> {name}</p>
	<p style="color: {fontColour}"> {rMin}{rMax ? "-" +rMax : "+"}</p>
</div>


<style>

	.chip {
			background-color: var(--colour);
			padding-left: 0.75em;
      padding-right: 0.75em;
      display: inline-flex;
			gap: 10px;

			border-radius: 10px;
      justify-content: space-between;
      /*align-content: center;*/
      align-items: center;
      width: 120px;
      height: 50px;
      border: 3px solid transparent;
      p {
          text-align: center;
          /*text-wrap : balance;*/
          font-size: 11px;
          color: var(fontColour);

      }

	}

    .chip:hover {
        border-color: color-mix(in srgb, var(--colour) 70%, black);
				background-color: color-mix(in srgb, var(--colour) 80%, white)
    }

		/* add styling for selection */

</style>
