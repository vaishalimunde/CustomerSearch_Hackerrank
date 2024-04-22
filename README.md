# Customer Search

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: v14 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/b2qR2LBEEzn0nGlffDwxYg/customer-search.gif)

## Functionality Requirements

The component must have the following functionalities:

- The component receives a prop `customers`, which is an array of objects, where each object is of `Customer` type which has below interface:

```
  interface Customer {
    name: string;
    gender: string;
    location: string;
    income: string;
    age: string;
    id: number;
  }
```

- The component renders the following:
  - One text input field where the user can type the `search` string.
  - The list of searched customers in tabular format inside the table body `<tbody data-test-id="searched-customers"></tbody>`. Each searched customer is rendered as an individual row in the table (in the order they are given in props).

- Initially, the input is empty. Whenever the input is empty, all the customers passed in the props must be rendered in the list.

- As soon as the `search` string is typed in the input, search for customer records that contains the search term in any field. For example, if the search term is "Phil", then records with the name "Philip Anderson" and the location "Philadelphia" should be displayed in the results. The searched list should preserve the order customers are given in props.

- If the search string has no searched customers, then do not render the table but instead render `<div data-test-id="no-result">No Results Found</div>`. Please note that this element must be rendered only when the result is empty and table is not rendered. Therefore, this div must not be rendered initially on component mount.

- Please note that tests do not test for case-insensitive scenario.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The search input must have the data-test-id attribute `app-input`.
- The table `<tbody>` must have the data-test-id attribute `searched-customers`.
- The `No Results Found` div must have the data-test-id attribute `no-result`.

Please note that the component has the above data-test-id attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.

## Project Specifications

**Read-only Files**
- src/app/customerSearch/customerSearch.component.spec.ts
- src/app/app.component.spec.ts

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
