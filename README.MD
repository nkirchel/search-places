**process.env['GOOGLE_MAP_API_TOKEN']** (.env)

This is where the API key is stored for Google Maps API. This allows us to supply the key in a way that does not expose its visibility. In the .gitignore we ignore this file to avoid it being exposed in git source control. When hosted on a server it will use that server's runtime environment variables (due to nature of proccess.env) which means we would set this variable in the cloud's command line interface (CLI). 



#### getInputProps

This function will return the props that you can spread over the `<input />` element. You can optionally call the function with an object to pass other props to the input.



#### getSuggestionItemProps

This function will return the props that you can spread over each suggestion item in your autocomplete dropdown. You MUST call it with `suggestion` object as an argument, and optionally pass an object to pass other props to the element.

#### loading

This is a boolean flag indicating whether or not the request is pending, or has completed.



#### suggestions

This is an array of suggestion objects each containing all the data from Google Maps API and other metadata.

An example of a suggestion object:

```
{
  active: false,
  description: "San Francisco, CA, USA",
  formattedSuggestion: { mainText: "San Francisco", secondaryText: "CA, USA" },
  id: "1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a",
  index: 0,
  matchedSubstrings: [ {length: 8, offset: 0} ],
  placeId: "ChIJIQBpAG2ahYAR_6128GcTUEo",
  terms: [
    { offset: 0, value: "San Francisco" },
    { offset: 15, value: "CA" },
    { offset: 19, value: "USA" }
  ],
  types: ["locality", "political", "geocode"]
}
```