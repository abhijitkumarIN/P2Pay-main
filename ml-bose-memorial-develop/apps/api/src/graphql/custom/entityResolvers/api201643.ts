import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiInvoiceAmount extends RESTDataSource {
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

  // Add InvoiceAmount
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('invoiceAmount', entity);

    // Sample HTTP POST request.
    // return this.post('invoiceAmount', entity);
  }

  // Delete InvoiceAmount
  async deleteEntity(id: string) {
    return KapiCrud.delete('invoiceAmount', id);

    // Sample HTTP DELETE request.
    // return this.delete(`invoiceAmount/${id}`);
  }

  // List InvoiceAmount
  async listEntity(params: any) {
    return KapiCrud.list('invoiceAmount', params);

    // Sample HTTP GET request.
    // return this.get('invoiceAmount', params);
  }

  // Get InvoiceAmount
  async getEntity(id: string) {
    return KapiCrud.get('invoiceAmount', id);

    // Sample HTTP GET request.
    // return this.get(`invoiceAmount/${id}`);
  }

  // Update InvoiceAmount
  async updateEntity(entity) {
    return KapiCrud.update('invoiceAmount', entity);

    // Sample HTTP PATCH request.
    // return this.patch(invoiceAmount, entity);
  }

  // Auto complete for InvoiceAmount
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('invoiceAmount');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.invoiceAmount }));
  }
}
