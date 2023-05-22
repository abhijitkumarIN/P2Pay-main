# Kleeen Infusion

You can infuse your end-product as app into your angular, react or vuejs web app and it is created to use it like a NPM Package.

# Build infusion package

The first step is running the command in the root of the end-product to build the infusion package using:

```
npm run build:infusion
```

This command will create a production-ready code and the package needed to import it like a NPM package in your web app.

## Using Kleeen Infusion package

Once the infusion build is ready, it can be published to NPM or used locally using a local instalation. Here you can find more information about [downloading and installing NPM packages](https://docs.npmjs.com/downloading-and-installing-packages-locally)
Infusion package will look like this:

```
{
  "name": "@Kleeen/authoring-tool",
  "version": "1.0.0",
  "description": "End Product Infusion app",
  "main": "index.js",
  "files": [
    "sw.js",
    "main.*.esm.js",
    "polyfills.*.esm.js",
    "vendor.*.esm.js",
    "runtime.*.js",
    "*.ico",
    "*.css",
    "*esm.js.LICENSE.txt",
    "assets"
  ]
}
```

Kleeen Infusion will use your company and product name to create your package name.
Once Infusion package is already installed. It can be imported in your `Main.ts` or `index.ts` or any entry-point for your web app like this:

```
import '@kleeen/authoring-tool';
```

## Kleeen Infusion CSS and assets

Kleeen infusion package will include the CSS and assets for the end-product.

It depends the module bundler and tools your web apps is being built with but here you can find some examples.

### CSS

Using `React` CSS is needed to import it directly from `node_modules` like this:

```
import '@kleeen/authoring-tool/styles.#hashid.css';
```

Using `Angular-cli` it is needed to add it directly from `node_modules` to the build file `angular.json` like this:

```
"styles": [
  "./node_modules/@kleeen/authoring-tool/styles.#hashid.css",
  "src/styles.scss"
],
```

### Libraries

These libraries are subset of components that the main app will need to successfully integrate the infusion app.
If there is a change in the auth elements and/or infusion custom elements and there are no changes in you end product. There is a script to run just the libraries building and it takes less time to build.

```
npm run build:infusion:libs
```

These libraries MUST follow an import order to work properly. They must be placed in this order:

```
import '@kleeen/infusion';
import '@kleeen/auth';
import '@your-company/infusion-end-product';
```

The first one must be the core library followed by the authentication library.

#### Infusion core

Now, the main end product and the custom infusion elements are being built separately to improve building time. In order to have the KS custom elements for infusion, it must be added the `@kleeen/infusion` library in the package.json, this should indicate the path where the `dist/libs/infusion` is located.
This should look something like `"@kleeen/infusion": "file: ../dist/libs/infusion"`,

This script will register the custom element you will need to integrate your workflow, login, etc to you main app.
Once Infusion core package is already installed. It can be imported in your `Main.ts` or `index.ts` or any entry-point for your web app like this:

```
import '@kleeen/infusion';
```

#### Auth

Add the `@kleeen/auth` library in the package.json, this should indicate the path where the `dist/libs/auth` is located.
This should look something like `"@kleeen/auth": "file: ../dist/libs/auth"`,

Inside the class, in which are the interactions of the session.
The `Integrations.AuthenticationHandler` library must be extended, which will have the processes to start session, close it, etc.

For React we must create a class like this:

```
import {
  ConfirmSignUpOptions,
  ForgotPasswordOptions,
  ForgotPasswordSubmitOptions,
  ISignUpResult,
  IUser,
  IUserSession,
  Integrations,
  ResendSignUpOptions,
  SignInOptions,
  SignOutOptions,
  SignUpOptions,
} from "@kleeen/auth";

import { Auth } from "@aws-amplify/auth";

export class AuthCognitoReact extends Integrations.AuthenticationHandler {

  /**
   * Get current authenticated user
   * @param {CurrentUserOptions} - options for getting the current user
   * @return - A promise resolves to current authenticated user if success
   */
  async currentAuthenticatedUser(): Promise<IUser | undefined> {
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (!user) return;
      const {
        signInUserSession: {
          accessToken: { payload },
        },
      } = user;
      const cognitoGroups = payload ? payload["cognito:groups"] || [] : [];
      const [defaultRole = null] = cognitoGroups;
      const userWithRoles = {
        ...user,
        getUsername: () => user.email,
        role: defaultRole,
        roles: cognitoGroups,
      } as IUser;

      return userWithRoles;
    } catch (error) {
      return;
    }
  }

  /**
   * Get current user's session
   * @return - A promise resolves to session object if success
   */
  async currentSession(): Promise<IUserSession> {
    return await Auth.currentSession();
  }

  /**
   * A function that takes a new context object and update it if needed
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  setContext(context: Record<string, any>): Record<string, any> {
    return context;
  }

  async signIn(options: SignInOptions): Promise<IUser> {
    const { password, username } = options;
    try{
      const user = await Auth.signIn(username, password);
      await Auth.verifiedContact(user);
      return user;
    }catch(error){
      return {
        getUsername: () => "",
        username: "",
        email: "",
        role: "",
        roles: [],
      }
    }
  }

  async signOut(options?: SignOutOptions): Promise<unknown> {
    return await Auth.signOut(options);
  }

  async challenge(): Promise<void> {
    return;
  }

  /**
   * Forbid the current request.
   */
  async forbid(): Promise<void> {
    return;
  }

  async signedIn(user: IUser): Promise<IUser> {
    return user;
  }

  /**
   * Sign up with username, password and other attributes like phone, email
   * @param {SignUpOptions} options - The user attributes used for sign in
   * @return - A promise resolves callback data if success
   */
  async signUp(options: SignUpOptions): Promise<ISignUpResult | undefined> {
    return {} as ISignUpResult;
  }

  /**
   * Send the verification code to confirm sign up
   * @param {ConfirmSignUpOptions} options - The username and verification code to be confirmed
   * @return - A promise resolves callback data if success
   */
  async confirmSignUp(options: ConfirmSignUpOptions): Promise<IUser> {
    return {} as IUser;
  }

  /**
   * Resend the verification code
   * @param {ResendSignUpOptions} options - The username to be confirmed
   * @return - A promise resolves code delivery details if successful
   */
  async resendSignUp(options: ResendSignUpOptions): Promise<unknown> {
    return;
  }

  /**
   * Initiate a forgot password request
   * @param {ForgotPasswordOptions} options - the username to change password
   * @return - A promise resolves if success
   */
  async forgotPassword(options: ForgotPasswordOptions): Promise<unknown> {
    return;
  }

  /**
   * Confirm a new password using a confirmation Code
   * @param {ForgotPasswordSubmitOptions} options - The username, confirmation code and the new password
   * @return - A promise that resolves if success
   */
  async forgotPasswordSubmit(
    options: ForgotPasswordSubmitOptions
  ): Promise<void> {}
}
```

Then, we have to initialize the authentication handler and configure the KSAuth on login. Here you can find an example:

```
import { IUser, KSAuth } from "@kleeen/auth";
import { useEffect, useState } from "react";

import { AuthCognitoReact } from "../../../class";

export function LoginCognito({
  username,
  password,
  setLogger,
}: {
  username: string;
  password: string;
  setLogger: (e: any, f?:boolean) => void;
}) {
  const [authUser, setAuthUser] = useState<IUser>();

  const authenticationHandler = new AuthCognitoReact();
  KSAuth.configure({ authenticationHandler });

  useEffect(() => {
    const setCurrentUser = async () => {
      const currentAuthenticatedUser = await authenticationHandler.currentAuthenticatedUser();
      setAuthUser(currentAuthenticatedUser);
      setLogger({session: 'cognito', user: currentAuthenticatedUser, authenticationHandler});
    };
    setTimeout(setCurrentUser, 1000);
  }, []);

  const login = async () => {
    if (!authenticationHandler) return;

    setLogger({session: 'cognito - validating user'}, true);

    const options = { username, password };
    const user = await authenticationHandler.signIn(options);

    setAuthUser(user);
    setLogger({session: 'cognito', user, authenticationHandler});
  };

  const logout = async () => {
    if (!authenticationHandler) return;
    await authenticationHandler.signOut();

    const user = await authenticationHandler.currentAuthenticatedUser();
    setAuthUser(user);
    setLogger({session: 'cognito', user, authenticationHandler});
  };

  return (
    <div className="App">
      <button onClick={login}>Login Cognito</button>
      <button onClick={logout} disabled={Boolean(!authUser?.username)}>
        Logout Cognito
      </button>
      { Boolean(authUser?.username) && <ks-workflow route="/home"></ks-workflow> }

    </div>
  );
}
```

For Angular it is similar. Here you can find an example using firebase.

```
import { Integrations } from "@kleeen/auth";

export class AuthAngular extends Integrations.AuthenticationHandler {
```

Where the session validations are performed within a module, include the initialization of `KsAuth.configure`.

```
import { KSAuth } from "@kleeen/auth";

constructor(angularFireAuth: AngularFireAuth) {
  const authenticationHandler = new AuthAngular(angularFireAuth);
  KSAuth.configure({ authenticationHandler });
}
```

Here you can find a repo with a more-detailed app: [Kleeen auth repo example](https://github.com/KLEEEN-SOFTWARE/infusion-demo-react)

### Assets

Using `create-react-app` assests should be added to `webpack.config.js` file like this:

```
plugins: [
  new TransferWebpackPlugin([
    { from: 'node_modules/@kleeen/authoring-tool/assets', to: path.join(__dirname, '/public/assets') }
  ]),
...
```

Using `Angular-cli` assests should be added to `angular.js` file like this:

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@kleeen/authoring-tool/assets",
    "output": "./assets/"
  }
],
...
```
