import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiBusinessName extends RESTDataSource {
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

  // Add BusinessName
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('businessName', entity);

    // Sample HTTP POST request.
    // return this.post('businessName', entity);
  }

  // Delete BusinessName
  async deleteEntity(id: string) {
    return KapiCrud.delete('businessName', id);

    // Sample HTTP DELETE request.
    // return this.delete(`businessName/${id}`);
  }

  // List BusinessName
  async listEntity(params: any) {
    return KapiCrud.list('businessName', params);

    // Sample HTTP GET request.
    // return this.get('businessName', params);
  }

  // Get BusinessName
  async getEntity(id: string) {
    return KapiCrud.get('businessName', id);

    // Sample HTTP GET request.
    // return this.get(`businessName/${id}`);
  }

  // Update BusinessName
  async updateEntity(entity) {
    return KapiCrud.update('businessName', entity);

    // Sample HTTP PATCH request.
    // return this.patch(businessName, entity);
  }

  // Auto complete for BusinessName
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('businessName');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.businessName }));
  }
}
