import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiPrimaryCareId extends RESTDataSource {
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

  // Add PrimaryCareId
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('primaryCareId', entity);

    // Sample HTTP POST request.
    // return this.post('primaryCareId', entity);
  }

  // Delete PrimaryCareId
  async deleteEntity(id: string) {
    return KapiCrud.delete('primaryCareId', id);

    // Sample HTTP DELETE request.
    // return this.delete(`primaryCareId/${id}`);
  }

  // List PrimaryCareId
  async listEntity(params: any) {
    return KapiCrud.list('primaryCareId', params);

    // Sample HTTP GET request.
    // return this.get('primaryCareId', params);
  }

  // Get PrimaryCareId
  async getEntity(id: string) {
    return KapiCrud.get('primaryCareId', id);

    // Sample HTTP GET request.
    // return this.get(`primaryCareId/${id}`);
  }

  // Update PrimaryCareId
  async updateEntity(entity) {
    return KapiCrud.update('primaryCareId', entity);

    // Sample HTTP PATCH request.
    // return this.patch(primaryCareId, entity);
  }

  // Auto complete for PrimaryCareId
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('primaryCareId');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.primaryCareId }));
  }
}
