import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiCellPhone extends RESTDataSource {
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

  // Add CellPhone
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('cellPhone', entity);

    // Sample HTTP POST request.
    // return this.post('cellPhone', entity);
  }

  // Delete CellPhone
  async deleteEntity(id: string) {
    return KapiCrud.delete('cellPhone', id);

    // Sample HTTP DELETE request.
    // return this.delete(`cellPhone/${id}`);
  }

  // List CellPhone
  async listEntity(params: any) {
    return KapiCrud.list('cellPhone', params);

    // Sample HTTP GET request.
    // return this.get('cellPhone', params);
  }

  // Get CellPhone
  async getEntity(id: string) {
    return KapiCrud.get('cellPhone', id);

    // Sample HTTP GET request.
    // return this.get(`cellPhone/${id}`);
  }

  // Update CellPhone
  async updateEntity(entity) {
    return KapiCrud.update('cellPhone', entity);

    // Sample HTTP PATCH request.
    // return this.patch(cellPhone, entity);
  }

  // Auto complete for CellPhone
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('cellPhone');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.cellPhone }));
  }
}
