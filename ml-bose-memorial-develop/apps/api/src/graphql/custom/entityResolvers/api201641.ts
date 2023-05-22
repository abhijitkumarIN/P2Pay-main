import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiTransactionDonationAmount extends RESTDataSource {
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

  // Add TransactionDonationAmount
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('transactionDonationAmount', entity);

    // Sample HTTP POST request.
    // return this.post('transactionDonationAmount', entity);
  }

  // Delete TransactionDonationAmount
  async deleteEntity(id: string) {
    return KapiCrud.delete('transactionDonationAmount', id);

    // Sample HTTP DELETE request.
    // return this.delete(`transactionDonationAmount/${id}`);
  }

  // List TransactionDonationAmount
  async listEntity(params: any) {
    return KapiCrud.list('transactionDonationAmount', params);

    // Sample HTTP GET request.
    // return this.get('transactionDonationAmount', params);
  }

  // Get TransactionDonationAmount
  async getEntity(id: string) {
    return KapiCrud.get('transactionDonationAmount', id);

    // Sample HTTP GET request.
    // return this.get(`transactionDonationAmount/${id}`);
  }

  // Update TransactionDonationAmount
  async updateEntity(entity) {
    return KapiCrud.update('transactionDonationAmount', entity);

    // Sample HTTP PATCH request.
    // return this.patch(transactionDonationAmount, entity);
  }

  // Auto complete for TransactionDonationAmount
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('transactionDonationAmount');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.transactionDonationAmount }));
  }
}
