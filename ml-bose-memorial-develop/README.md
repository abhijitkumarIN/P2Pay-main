<p align="center">
  <img
    alt="Kleeen Logo"
    height="100"
    src="https://staging4.kleeen.software/wp-content/uploads/2019/05/cropped-ks-favicon-1.png"
    width="100"
  >
</p>
<h1 align="center">
  Kleeen Software / Template
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
  <summary><b>🧰  1. Prerequisites</b></summary>

You need to have a basic understanding of **`JavaScript`**, **`Node.js`**, and **`NPM`** to continue.

##### 1.1 _Install Node Version Manager_

We recommend to use [NVM](https://github.com/nvm-sh/nvm).

```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

Check GitHub repository to verify any change in [the installation process](https://github.com/nvm-sh/nvm#install--update-script).

##### 1.2 _Setup your .nvmrc file_

This project has a `.nvmrc` file containing the node version number supported and tested. [Check the repository to configure your terminal](https://github.com/nvm-sh/nvm#nvmrc).

Calling `nvm use` automatically in a directory with a `.nvmrc` file. If it finds it, it will switch to that version; if not, it will use the default version.

##### 1.3 _Install Node_

```sh
  nvm install <NODE_VERSION_ON_NVMRC_FILE>
  nvm use <NODE_VERSION_ON_NVMRC_FILE>
```

</details>

<details>
  <summary><b>🧭  2. Understand your workspace</b></summary>
  Run:

```sh
  npm run dep-graph
```

to see a diagram of the dependencies of your projects.

</details>

<details>
  <summary><b>⏳ 3. Setup</b></summary>

##### 3.1 _Install packages_

```sh
  npm install | bash
```

</details>

<details>
  <summary><b>🏎  4. Run project</b></summary>

You can run this **template** using the following commands in a different console.

To run both **_frontend_** and **_backend_**:

```sh
  npm run start
```

**Client only**

```sh
  npm run start:client
```

**API only**

```sh
  npm run start:api
```

</details>

<details>
  <summary><b>🚜  5. Build</b></summary>

##### 5.1 _Build_

```sh
  nx build cloud
```

to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

</details>

<details>
  <summary><b>🚀  6. Deploy</b></summary>

##### 6.1 _Deploy with Serverless Framework_

```sh
  npm install -g serverless@<CHECK_VERSION_AT_buildspec.yml_FILE>
```

</details>

<details>
  <summary><b>🧪  7. Testing</b></summary>

##### 7.1 _Unit tests_

```sh
  nx test cloud
```

to execute the unit tests via [Jest](https://jestjs.io).

```sh
  npm run affected:test
```

to execute the unit tests affected by a change.

##### 7.2 _E2E (end-to-end) tests_

By default, [Nx](https://nx.dev/react/cli/e2e) uses [Cypress](https://www.cypress.io) to run E2E tests.

Start Cypress with

```sh
  nx e2e {appName}-e2e --watch
```

to execute the end-to-end tests in Interactive Watch Mode.

Run e2e tests for the applications affected by changes.

```sh
  npm run affected:e2e
```

Run the respective .spec
Change files in your app, Cypress should re-run its tests.

</details>

<details>
  <summary><b>🔐  8. Authentication</b></summary>

##### 8.1 _How to add custom integrations_

**Kleeen Software** provides the option to extend the default _authentication_ or implements new ones.

To support custom workflows, **_`@kleeen/auth library`_** exposes a set of types and interfaces.

```javascript
import { Integrations, KSAuth } from '@kleeen/auth';
KSAuth.configure({
  authenticationHandler: new Integrations.CognitoAuthenticationHandler(),
});
```

##### 8.2 _IAuthenticationHandler base definition_

**_IAuthenticationHandler_** interface is the blueprint to implement different workflows.

Here is an example of a custom implementation:

```javascript
import 'firebase/auth';
import firebase from 'firebase/app';
import { Integrations } from '@kleeen/auth';

/* Your web app's Firebase configuration */
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export class FirebaseAuthenticationHandler extends Integrations.AuthenticationHandler {
  constructor(config: typeof firebaseConfig = firebaseConfig) {
    super();
    /* Initialize Firebase */
    firebase.initializeApp(firebaseConfig);
  }

  /* Sign in a register user using username and password */
  async signIn(options: SignInOptions): Promise<IUser> {
    const { password, username } = options;
    const response = await firebase.auth().signInWithEmailAndPassword(username, password);
    return {
      ...response,
      email: response?.user?.email,
      getUsername: () => response?.user?.displayName,
      role: null, // Set here the default for the current user
      roles: [], // set here the list of roles assigned for the current user
    };
  }

  /**
   A function that takes a new context object and update it if needed
  @param {Record<string, any>} context is an existing context
  @return {Record<string, any>} with an updated context
  **/

  setContext(context: Record<string, any>): Record<string, any> {
    return {
      ...context,
      headers: {
        ...context.headers,
        MY_CUSTOM_HEADER: 'GOING HERE',
      },
    };
  }
}
```

##### 8.3 _Update the authentication handler_

Following is the example of configuring the **_KSAuth_** class to use the custom implementation.

```javascript
import { FirebaseAuthenticationHandler } from './google-firebase';
import firebaseConfiguration from './custom-implementations/firebase.json';

KSAuth.configure({
  authenticationHandler: new FirebaseAuthenticationHandler(firebaseConfiguration),
});
```

##### 8.4 _Running unit tests_

Run

```sh
  nx test auth
```

to execute the unit tests via [Jest](https://jestjs.io).

##### 8.5 _Login Role and UI Access Manager Integration_

To connect a login to the FE app, it's needed to implement an AuthenticationHandler like `libs/auth/src/lib/integrations/aws-cognito/aws-cognito.ts`, that is the one used in our own prototypes.

When implementing this 'authenticator,' the currentAuthenticatedUser function needs to return a shape like `{ ...anyUserInfoNeeded, role: 'ADMIN' }`, role its required, but if it's not provided, the access-control did not interfere with anything.

##### NOTES

- the role values depend on what the **_`apps/cloud/src/app/settings/role-access-keys.json`_** have on the permissions and can be any string.
- The **_role-access-keys.json_** is created for our generated UI proposes grouping each page into **_NAVIGATION_** key and next each page have **_WIDGETS_**, **_VIEWS_** and can have more specific components also can be extended but to also reflect access on the UI, the **_AccessControl_** component is needed.
- the UI implementation follows the rules and uses the **_access-manager_** module from the **_ks-ui-react_**.

</details>

<details>
  <summary><b>🎫  9. Onboarding integration</b></summary>

##### 9.1 _Relate paths_

onboarding settings = `apps/cloud/src/app/modules/generated/components/on-boarding/on-boarding.settings.ts`

##### 9.2 _How onboarding decides when to show_

The condition used to decide if the onBoarding shows is a combination between the onboarding settings (because the feature itself can be off) and the onboarding preferences redux state, the path in the redux state used for getting if the **`onBoarding`** should show is **`endUserPreference`**.**`onBoardingPreferences.showOnBoarding`**. That **`onBoardingPreferences`** is one of the props receive in the component below and can be manipulated with the response of the query **`getOnboardingPreferences`** (needs to be implemented in custom API).

##### 9.2 _Queries called by onboarding_

**`getOnboardingPreferences`**: is called at the start of **`onboarding`**, it filled the **`onBoardingPreferences`** state with the response so can be used to inject data to this custom component or disable the onboarding for certain users or cases.

**`setOnBoardingPreference`**: is call with the action **`preferencesActions.setOnBoardingPreference`** and it can be used to store some data related to **`onBoarding`** or set info related to user like turn off next **`onboarding`** for the same user.

##### 9.2 _PreferencesActions actions injected_

With the action **`preferencesActions.setOnBoardingPreference`** you can change the **`onBoardingPreferences`** state and it also calls a **`BE`** query **`setOnBoardingPreference`** (needs to be implemented in custom API) to save preferences for the **`onboarding`** (for example setting the flag in real **`BE`** to false so the user does not get the onboarding a second time).

##### 9.2 _Implemented in custom API_

Some of the queries that the **`onboarding`** throws does not have a **`BE`** query the catch it, all the firm and shape is defined on the **`FE`** but it needs to be added to the custom **`API schema`** and resolvers y order to getting it on the **`GraphQL`** middleware.

example on `apps/api/src/graphql/custom/operations/custom-schema.ts`

```javascript
export const customSchema = gql`
  extend type Query {
    getOnboardingPreferences: OnboardingPreferences
    setOnboardingPreferences(input: PreferencesInput): OnboardingPreferences
  }
`;
```

on `apps/api/src/graphql/custom/operations/custom-resolvers.ts`

```javascript
export const customResolvers: IResolvers = {
  Query: {
    getOnboardingPreferences: () => ({ showOnBoarding: true }),
    setOnboardingPreferences: (input) => ({ success: true }),
  },
};
```

Please refer to the official documentation about how to add your custom schema.

For more information please visit [Apollo GraphQL Documentation](https://www.apollographql.com/docs/apollo-server/schema/schema/)

All in these files can change except the shape and name of the export component.

</details>

<details>
  <summary><b>🛃  10. Custom provider integration</b></summary>

##### 10.1 _Create a new custom provider_

As End-Developers, it is quite common that you need to share some data, and that data needs to be accessible by many components at different nesting levels inside your application. Also, you might need to integrate third party tools which should be enabled at application level, and not at workflow level.

In the path `apps/cloud/src/app/modules/custom/providers/` you can add any custom global provider you need, for example you can use a higher order component pattern to wrap the whole application with your custom global provider; In this case, let's integrate a third-party tool like Intercom, using the react-use-intercom module:

Add a new file called **`intercom-provider.ts`**, then add the following higher order component:

```javascript
import { IntercomProvider } from 'react-use-intercom';
import { environment } from '../../../../environments/environment';

const intercomAppId = 'your-intercom-app-id';

interface IntercomProviderProps {
  children: JSX.Element; // This represents the whole application
}

// This is the way to wrap the whole application with your Custom Global Provider
export function CustomIntercomProvider({ children }: IntercomProviderProps) {
  return <IntercomProvider appId={intercomAppId}>{children}</IntercomProvider>;
}
```

##### 10.2 _Add our new custom provider_

For those reasons, Kleeen provides an easy way to add Custom Global Providers to your application, so you can fulfill those requirements, and more simply going to `apps/cloud/src/app/modules/custom/providers/index.ts` file, there you have this custom barrel:

```javascript
export const CustomProviders = [];
```

Import and add the new Custom Global Provider that we just did to the Custom Providers catalog:

```javascript
import { CustomIntercomProvider } from './intercom-provider';

export const CustomProviders = [CustomIntercomProvider];
```

</details>

<details>
  <summary><b>🛃  11. Initialize third party libraries</b></summary>

##### 11.1 _Add third party libraries to initialize_

As End-Developers, it is common that you need to call or initialize third-party libraries on top of the react chain.

In the path `apps/cloud/src/app/modules/custom/third-parties/third-party-initialize.ts` you can add any function or hook to the **`thirdPartyInitialize`** array, so we can initialize Intercom as a custom third party as it is in the example below:

```javascript
import { useIntercom } from 'react-use-intercom';

export const thirdPartyInitialize = [useIntercom];
```

</details>

<details>
  <summary><b>🔗  12. Quick Links</b></summary>

##### 12.1 _Links to the project files_

As End-Developers, it is common that you need to have direct links to important source files so that you don't have to hunt for those files.

You can find your project files:

- [API List](apps/api/src/graphql/generated/dataSources/index.ts)
- [Custom Widgets and Actions](apps/cloud/src/app/modules/custom)
- [Entities List](libs/common/utils/src/entity/entity-map.ts)
- [Entity Resolvers](apps/api/src/graphql/custom/entityResolvers)
- [Filter Resolver](apps/api/src/graphql/custom/filtersResolver)
- [Format Check Resolver](apps/api/src/graphql/custom/formatCheckResolver)
- [Role Access](apps/cloud/src/app/settings/role-access-keys.custom.json)
- [State Management](libs/react/state-management/src/modules/custom)
- [Widget API](apps/api/src/graphql/generated/dataSources/widgetApi.ts)
- [Widget Resolvers](apps/api/src/graphql/custom/widgetResolvers)
- [Workflows](apps/cloud/src/app/modules/generated)

##### 12.2 _Links to documentation files_

- [Kleeen Infusion](libs/infusion/KLEEEN%20INFUSION.md)
</details>

<details>
  <summary><b>🏁  13. Quick Start</b></summary>

##### 13.1 _Running the project_

<p>
As an End Developer you may need to have a quick start guide on how to run the Kleeen Project, please follow the next steps:
</p>
The first step is to have the latest version of dependencies run:

```sh
  npm install
```

After the dependencies have been installed it is needed to have the Backend and the Frontend running in separate terminals

**Client only**

```sh
  npm run start:client
```

In the [package.json](package.json) file you can specify the port the Front End is going to run for this script, by adding the option `--port=<PORT_NUMBER>` for example `--port=4201`.

**API only**

API will run by default in port 3000

```sh
  npm run start:api
```

If needed you can also have the Backend and Frontend running in the same terminal

**Backend and Frontend**

```sh
  npm run start
```

In your browser go to localhost:4200 (or your default port number)
`Congratulations!`
<br>
At this point your Kleeen project should be up and running.

</details>

</details>

<details>
  <summary><b>🗺️  14. System Architecture </b></summary>

Inside these folders are both the visualization code and the api code. The structures where the elements of both the front-end and the back-end are located are presented below.

### 14.1 _Back-End_

##### 14.1.1 _Filters_

Here are the jsons with the construction of the filter references for each of the views.

##### 14.1.2 _Graphql Custom_

Here is the logic of the requests to the back-end. Inside this folder there are several folders, which have the request scripts.

##### 14.1.3 _Graphql Generated_

Here are the queries and mapping of the api to which they are going to be consumed.

### 14.2 _Front-End_

##### 14.2.1 _Modules Kleeen-managed_

Inside here is part of the research interaction.
This code is static and is not modified by the user, it is part of the kleeen implementation.

##### 14.2.2 _Modules Custom_

Here are the code generation for custom views. These are divided by folders which have the name of your workflow.
Inside each of the folders there are files of type js. Which have unique names. In order to know which custom each file corresponds to, you must visit the "Generated" files and within this folder there must be a workflow with the same name. In there, there is a settings file and look for the document called 'widgets.ts', in there look for the custom widget whose code you want to change. When it is found, see the name and later look for it inside the custom folder and inside the folder with the same name in the workflow.
In this section a standard code is created, which must be manipulated by the developer, to include their own code.

##### 14.2.3 _Modules Generated_

Here all the views that a user can access are generated.
For each of the views a folder is generated with the name of the workflow, which is the name of the url to which we are going to access.
Inside each folder there is a file index.jsx, which has auto-generated code and there is also a folder with the name of settings which can have different files. These files internally have a configuration json which tells our end-product what to display.

##### 14.2.4 _Settings_

In this part of the code there are global settings, such as the 'translate', which is auto-generated and has the texts to be displayed depending on the selected language. Also the roles or accesses that a group of users can have.

</details>

<p align="center">
  <small>
    Made with ❤️  by Kleeen Software 2022
  </small>
</p>
