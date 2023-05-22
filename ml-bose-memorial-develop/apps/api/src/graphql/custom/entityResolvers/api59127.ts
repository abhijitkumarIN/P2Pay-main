import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPrimaryCareLastName extends RESTDataSource {
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

  // Add PrimaryCareLastName
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('primaryCareLastName', entity);

    // Sample HTTP POST request.
    // return this.post('primaryCareLastName', entity);
  }

  // Delete PrimaryCareLastName
  async deleteEntity(id: string) {
    return KapiCrud.delete('primaryCareLastName', id);

    // Sample HTTP DELETE request.
    // return this.delete(`primaryCareLastName/${id}`);
  }

  // List PrimaryCareLastName
  async listEntity(params: any) {
    return KapiCrud.list('primaryCareLastName', params);

    // Sample HTTP GET request.
    // return this.get('primaryCareLastName', params);
  }

  // Get PrimaryCareLastName
  async getEntity(id: string) {
    return KapiCrud.get('primaryCareLastName', id);

    // Sample HTTP GET request.
    // return this.get(`primaryCareLastName/${id}`);
  }

  // Update PrimaryCareLastName
  async updateEntity(entity) {
    return KapiCrud.update('primaryCareLastName', entity);

    // Sample HTTP PATCH request.
    // return this.patch(primaryCareLastName, entity);
  }

  // Auto complete for PrimaryCareLastName
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('primaryCareLastName');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.primaryCareLastName }));
  }
}
