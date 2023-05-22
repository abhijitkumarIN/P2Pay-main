import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionDonor extends RESTDataSource {
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

  // Add TransactionDonor
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionDonor', entity);

    // Sample HTTP POST request.
    // return this.post('transactionDonor', entity);
  }

  // Delete TransactionDonor
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionDonor', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionDonor/${id}`);
  }

  // List TransactionDonor
  async listEntity(params: any) {
    return KapiCrud.list('transactionDonor', params);

    // Sample HTTP GET request.
    // return this.get('transactionDonor', params);
  }

  // Get TransactionDonor
  async getEntity(id: string) {
    return KapiCrud.get('transactionDonor', id);

    // Sample HTTP GET request.
    // return this.get(`transactionDonor/${id}`);
  }

  // Update TransactionDonor
  async updateEntity(entity) {
    return KapiCrud.update('transactionDonor', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionDonor, entity);
  }

  // Auto complete for TransactionDonor
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionDonor');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionDonor }));
  }
}
