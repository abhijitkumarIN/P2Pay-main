import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiCommercialInsurance extends RESTDataSource {
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

  // Add CommercialInsurance
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('commercialInsurance', entity);

    // Sample HTTP POST request.
    // return this.post('commercialInsurance', entity);
  }

  // Delete CommercialInsurance
  async deleteEntity(id: string) {
    return KapiCrud.delete('commercialInsurance', id);

    // Sample HTTP DELETE request.
    // return this.delete(`commercialInsurance/${id}`);
  }

  // List CommercialInsurance
  async listEntity(params: any) {
    return KapiCrud.list('commercialInsurance', params);

    // Sample HTTP GET request.
    // return this.get('commercialInsurance', params);
  }

  // Get CommercialInsurance
  async getEntity(id: string) {
    return KapiCrud.get('commercialInsurance', id);

    // Sample HTTP GET request.
    // return this.get(`commercialInsurance/${id}`);
  }

  // Update CommercialInsurance
  async updateEntity(entity) {
    return KapiCrud.update('commercialInsurance', entity);

    // Sample HTTP PATCH request.
    // return this.patch(commercialInsurance, entity);
  }

  // Auto complete for CommercialInsurance
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('commercialInsurance');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.commercialInsurance }));
  }
}
