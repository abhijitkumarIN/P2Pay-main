<p align="center">
  <img
    alt="Kleeen Logo"
    height="100"
    src="https://staging4.kleeen.software/wp-content/uploads/2019/05/cropped-ks-favicon-1.png"
    width="100"
  >
</p>
<h1 align="center">
  Kleeen Software / API Apollo Graphql Middleware
</h1>

<p align="center">
  <img alt="HTML5" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" />
  <img alt="CSS3" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" />
  <img alt="SASS" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" />
  <img alt="Material UI" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" />
  <img alt="NodeJS" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
  <img alt="Express" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
  <img alt="TypeScript" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img alt="ReactJS" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" />
  <img alt="GraphQL" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain-wordmark.svg" />
  <img alt="Redux" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
  <img alt="NPM" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
  <img alt="Babel" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" />
  <img alt="Git" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg" />
  <img alt="GitHub" width="35" height="25" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
</p>

<details>
  <summary><b>🧰  1. About Apollo Graphql</b></summary>

  The middleware is an Apollo Graphql endpoint. You can learn more about Apollo Server [here](https://www.apollographql.com/docs/apollo-server/).
</details>

<details>
  <summary><b>🧭  2. Overwriting widget resolvers</b></summary>

  In order for you to connect your backend, you can overwrite the resolvers in the following path:

  ```
  ./app/api/src/graphql/custom/widgetResolvers
  ```

  Replace the default return statement ('not implemented') with your code that fetch the corresponding API data.

  You can access the token, data sources, and the current user through the 'context' param.

  e.g.

  ```
  View: Starship Catalogue --- Widget: Manufacturers Model Count
  import { GetWidgetDataResult, DataAggregationArgs, AuthContext } from '../../../types';
  import fetch from 'node-fetch';

  const format = {
    xAxis: {
      categories: [],
      type: 'string',
      key: 'manufacturer',
      aggregations: null,
      dateTime: null,
      examples: [],
      valueLabels: null,
      max: null,
      min: null,
      prefix: null,
      severityBad: null,
      severityGood: null,
      severityLevels: null,
      suffix: null,
      isNumericType: false,
    },
    yAxis: {
      type: 'string',
      key: 'vehicleName',
      aggregations: null,
      dateTime: null,
      examples: [],
      valueLabels: null,
      max: null,
      min: null,
      prefix: null,
      severityBad: null,
      severityGood: null,
      severityLevels: null,
      suffix: null,
      isNumericType: false,
    },
    //   results: [],
    //   crossLinking: [],
  };

  // View: Starship Catalogue --- Widget: Manufacturers Model Count
  // Group by: manufacturer
  // No Aggregation
  // Value: vehicleName
  // Value aggregated by: Total Count
  // Chart type: [WIDGET] DONUT_VARIANT
  export const widget_879d5da4_b09c_4938_91d1_d2172eab8332 = async (
    input: DataAggregationArgs,
    context: AuthContext,
  ): Promise<any | 'not implemented'> => {
    return fetch('https://swapi.dev/api/starships/')
      .then((res) => res.json())
      .then((res) => {
        const results = [];
        res.results.map((result) => {
          const count = res.results.reduce((acc, cur) => (cur.name === result.name ? ++acc : acc), 0);
          format.xAxis.categories.push(result.name);
          results.push(count);
        });

        return { format, results, crossLinking: [] };
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ```

</details>

<details>
  <summary><b>⏳ 3. Use your custom graphql operations</b></summary>

  Kleeen generates all the Graphql operations the UI will need, but there are sometimes a custom query/mutation is required.

  For that, you can write your own custom operations by extending the `custom-resolvers.ts` and `custom-schema.ts` files, both under the `apps/api/src/graphql/custom/operations` folder.
</details>

<details>
  <summary><b>🏎  4. Extended configuration</b></summary>

  You can use some `env` variables to customize the API.
</details>

<details>
  <summary><b>🚜  5. Dev Configuration</b></summary>

  - `DEBUG=ks.*`
    - Logs all the debug messages from kleeen.

  - `LOG_QUERIES`
    - Enable a basic profiling to log the graphql queries and its duration.

  - `PERSIST_FAKE_DB`
    - When using the realistic fake data in a lambda you may want to persist it by enabling this variable. This will highly increase the time for each query.

</details>

<p align="center">
  <small>
    Made with ❤️  by Kleeen Software 2022
  </small>
</p>
