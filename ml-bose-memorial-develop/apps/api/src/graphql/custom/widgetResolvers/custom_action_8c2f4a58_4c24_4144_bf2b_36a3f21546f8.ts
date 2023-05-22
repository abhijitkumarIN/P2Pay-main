import { DispatchCustomActionResults, CustomActionArgs, AuthContext } from '../../../types';

// Widget Summary
// Widget: Send Invoice Copy
// Thing: memberName
export const custom_action_8c2f4a58_4c24_4144_bf2b_36a3f21546f8 = async (
  input: CustomActionArgs,
  context: AuthContext,
): Promise<DispatchCustomActionResults | 'not implemented'> => {
  // KAPI - Integration

  // In order for you to connect your backend, you can add in here your code
  // that fetch the corresponding API data.

  // You can access the token, data sources, and the current user through the 'context' param.

  // Please replace the default return statement ('not implemented') with the
  // required widget response, e.g.
  // const format = {
  //   xAxis: {
  //     type: 'datetime', // The type of the attribute, usually datetime for x axis.
  //     key: 'yourAttribute',
  //     isNumericType: true, // True or false depending on the type
  //   },
  //   yAxis: {
  //     type: 'string', // String or any other KAPI type, depending on your attribute
  //     key: 'yourAttribute',
  //     isNumericType: false, // True or false depending on the type
  //   },
  // };
  // return fetch('http://put.your.api.here/your-resource') // Fetch is available through npm package node-fetch
  //   .then((http_response) => http_response.json()) // Extracts the JSON body content from the http response.
  //   .then((res) => {
  //     return { format, res };
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return 'not implemented';
  //   });

  return 'not implemented';
};
