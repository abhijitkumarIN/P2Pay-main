import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiInvoiceNumber extends RESTDataSource {
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

  // Add InvoiceNumber
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('invoiceNumber', entity);

    // Sample HTTP POST request.
    // return this.post('invoiceNumber', entity);
  }

  // Delete InvoiceNumber
  async deleteEntity(id: string) {
    return KapiCrud.delete('invoiceNumber', id);

    // Sample HTTP DELETE request.
    // return this.delete(`invoiceNumber/${id}`);
  }

  // List InvoiceNumber
  async listEntity(params: any) {
    return KapiCrud.list('invoiceNumber', params);

    // Sample HTTP GET request.
    // return this.get('invoiceNumber', params);
  }

  // Get InvoiceNumber
  async getEntity(id: string) {
    return KapiCrud.get('invoiceNumber', id);

    // Sample HTTP GET request.
    // return this.get(`invoiceNumber/${id}`);
  }

  // Update InvoiceNumber
  async updateEntity(entity) {
    return KapiCrud.update('invoiceNumber', entity);

    // Sample HTTP PATCH request.
    // return this.patch(invoiceNumber, entity);
  }

  // Auto complete for InvoiceNumber
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('invoiceNumber');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.invoiceNumber }));
  }
}
