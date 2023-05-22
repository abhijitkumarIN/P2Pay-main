# Kleeen Auto Refresh API

You can auto-refresh one or many workflows from KleeenApi using the AutoRefreshApi.

## Using Kleeen Auto Refresh API

The first step to work with the AutoRefreshApi is enabling the refresh data experience in the feature selector for a workflow in the authoring tool. Auto-refresh will reset the refresh countdown of the manual refresh control.

Once the feature is enabled, you will be able to refresh that workflow from KleeenApi using the AutoRefreshApi.

In order to work with it, you have to import the library:

```
import { RefreshApi } from 'apps/api/src/websockets/auto-refresh';
```

You will find two methods in the API. The first one is used to refresh all clients worflow or workflows specified using the `workflows` param. The `workflows` could be a string or an array of strings.

```
refreshWorkflowsAllClients(workflows: string | string[])
```

The second one is used to refresh all clients with an exception. The `userId` params represent the user that will not get notified to auto refresh. This cause could be used to avoid re-rendering when the end-user add a new thing in a workflow and you do not want to reload the worflow twice for that user. The `workflows` could also be a string or an array of strings.

```
refreshWorkflowsAllClientsExcept(userId: string, workflows: string | string[])
```

## Code example

In this case, we are going to see how to auto-refresh a workflow when a new book is added.

```
// Add Book
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);

    const newBook = KapiCrud.add('book', entity);
    RefreshApi.refreshWorkflowsAllClients('bookList');//This is a workflow name that has enabled the refresh experience. It also coud be refreshWorkflowsAllClients(['bookList', 'anotherWorkflowName'])

    //If you want to resfresh all clients except the end-user who performed the action use this
    //RefreshApi.refreshWorkflowsAllClientsExcept(this.context.token, 'bookList');
    return newBookd
  }
```
