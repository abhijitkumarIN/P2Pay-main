import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiOfficeHours extends RESTDataSource {
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

  // Add OfficeHours
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('officeHours', entity);

    // Sample HTTP POST request.
    // return this.post('officeHours', entity);
  }

  // Delete OfficeHours
  async deleteEntity(id: string) {
    return KapiCrud.delete('officeHours', id);

    // Sample HTTP DELETE request.
    // return this.delete(`officeHours/${id}`);
  }

  // List OfficeHours
  async listEntity(params: any) {
    return KapiCrud.list('officeHours', params);

    // Sample HTTP GET request.
    // return this.get('officeHours', params);
  }

  // Get OfficeHours
  async getEntity(id: string) {
    return KapiCrud.get('officeHours', id);

    // Sample HTTP GET request.
    // return this.get(`officeHours/${id}`);
  }

  // Update OfficeHours
  async updateEntity(entity) {
    return KapiCrud.update('officeHours', entity);

    // Sample HTTP PATCH request.
    // return this.patch(officeHours, entity);
  }

  // Auto complete for OfficeHours
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('officeHours');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.officeHours }));
  }
}
