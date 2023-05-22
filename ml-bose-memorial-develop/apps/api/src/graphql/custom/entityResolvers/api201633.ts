import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionId extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://put.your.api.here/';
    // You can access the token, data sources,
    // and the current user through 'this.context'.
  }

  willSendRequest(request: RequestOptions) {
    // Uncomment the following line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // Uncomment the following line to set params token.
    // request.params.set('api_key', this.context.token);
  }

  // Add TransactionId
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionId', entity);

    // Sample HTTP POST request.
    // return this.post('transactionId', entity);
  }

  // Delete TransactionId
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionId', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionId/${id}`);
  }

  // List TransactionId
  async listEntity(params: any) {
    return KapiCrud.list('transactionId', params);

    // Sample HTTP GET request.
    // return this.get('transactionId', params);
  }

  // Get TransactionId
  async getEntity(id: string) {
    return KapiCrud.get('transactionId', id);

    // Sample HTTP GET request.
    // return this.get(`transactionId/${id}`);
  }

  // Update TransactionId
  async updateEntity(entity) {
    return KapiCrud.update('transactionId', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionId, entity);
  }

  // Auto complete for TransactionId
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionId');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionId }));
  }
}
