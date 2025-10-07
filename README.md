# A3: Svelte + D3 interactive 

Link to [deployennt](https://chieri-jn.github.io/A3/)

# Rational for Design Decesions: 

# Description of goals fro second visualization: 

# Overview of development process:

### HOw did you use AI? 
- Mostly for debugging or specific questions. And if the LLM generated code, if possible I would try my best to rewrite it instead of just straight copying and pasting. For example the following prompt:
    - im tyring to format the following const data = $derived.by(() => d3.csv(datasets[selectedDataset], (dt: any[]) => ({ if (dt.Length() == 1) { let d = dt[0]; return { city: d.City, country: d.Country, mainPollutant: d['Main pollutant'], pm25: +d['PM2.5'], state: d.State, stationName: d['Station name'], timestamp: new Date(d['Timestamp(UTC)']), usAqi: +d['US AQI'] } } else { } } )) ); where if all is selceted then all the csv data files should be included in data
- Which yielded this output:
```javascript
const data = $derived.by(async () => {
	// Get the list of URLs based on the selected dataset
	const urls = datasets[selectedDataset];

	// Load all CSV files (one or many)
	const allData = await Promise.all(
		urls.map(async (url) => {
			const rows = await d3.csv(url, (d) => ({
				city: d.City,
				country: d.Country,
				mainPollutant: d["Main pollutant"],
				pm25: +d["PM2.5"],
				state: d.State,
				stationName: d["Station name"],
				timestamp: new Date(d["Timestamp(UTC)"]),
				usAqi: +d["US AQI"]
			}));
			return rows;
		})
	);

	// Flatten the data if multiple datasets were loaded
	return allData.flat();
});
```
And I ended up writing this insprited by it:

```javascript
const data = $derived.by(async () =>
	{
		if (selectedDataset === "all") {
			const combinedData = datasets["all"].map(dataSet => {
					return d3.csv(dataSet, (d: any) =>
						({
								city: d.City,
								country: d.Country,
								mainPollutant: d['Main pollutant'],
								pm25: +d['PM2.5'],
								state: d.State,
								stationName: d['Station name'],
								timestamp: new Date(d['Timestamp(UTC)']),
								usAqi: +d['US AQI']
							}
						))

			});
			const loadedData = await Promise.all(combinedData);
			return loadedData.flat();

		} else {
			return d3.csv(datasets[selectedDataset][0], (d: any) => ({
					city: d.City,
					country: d.Country,
					mainPollutant: d['Main pollutant'],
					pm25: +d['PM2.5'],
					state: d.State,
					stationName: d['Station name'],
					timestamp: new Date(d['Timestamp(UTC)']),
					usAqi: +d['US AQI']
				}
			))
		}
	}
	);
```