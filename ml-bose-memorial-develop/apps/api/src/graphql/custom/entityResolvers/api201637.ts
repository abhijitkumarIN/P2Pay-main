import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiInvoiceId extends RESTDataSource {
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

  // Add InvoiceId
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('invoiceId', entity);

    // Sample HTTP POST request.
    // return this.post('invoiceId', entity);
  }

  // Delete InvoiceId
  async deleteEntity(id: string) {
    return KapiCrud.delete('invoiceId', id);

    // Sample HTTP DELETE request.
    // return this.delete(`invoiceId/${id}`);
  }

  // List InvoiceId
  async listEntity(params: any) {
    return KapiCrud.list('invoiceId', params);

    // Sample HTTP GET request.
    // return this.get('invoiceId', params);
  }

  // Get InvoiceId
  async getEntity(id: string) {
    return KapiCrud.get('invoiceId', id);

    // Sample HTTP GET request.
    // return this.get(`invoiceId/${id}`);
  }

  // Update InvoiceId
  async updateEntity(entity) {
    return KapiCrud.update('invoiceId', entity);

    // Sample HTTP PATCH request.
    // return this.patch(invoiceId, entity);
  }

  // Auto complete for InvoiceId
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('invoiceId');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.invoiceId }));
  }
}
