import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiBusinessPhone extends RESTDataSource {
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

  // Add BusinessPhone
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('businessPhone', entity);

    // Sample HTTP POST request.
    // return this.post('businessPhone', entity);
  }

  // Delete BusinessPhone
  async deleteEntity(id: string) {
    return KapiCrud.delete('businessPhone', id);

    // Sample HTTP DELETE request.
    // return this.delete(`businessPhone/${id}`);
  }

  // List BusinessPhone
  async listEntity(params: any) {
    return KapiCrud.list('businessPhone', params);

    // Sample HTTP GET request.
    // return this.get('businessPhone', params);
  }

  // Get BusinessPhone
  async getEntity(id: string) {
    return KapiCrud.get('businessPhone', id);

    // Sample HTTP GET request.
    // return this.get(`businessPhone/${id}`);
  }

  // Update BusinessPhone
  async updateEntity(entity) {
    return KapiCrud.update('businessPhone', entity);

    // Sample HTTP PATCH request.
    // return this.patch(businessPhone, entity);
  }

  // Auto complete for BusinessPhone
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('businessPhone');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.businessPhone }));
  }
}
