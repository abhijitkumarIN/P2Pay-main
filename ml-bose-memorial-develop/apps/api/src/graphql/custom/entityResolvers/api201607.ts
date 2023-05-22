import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiRegistrationDate extends RESTDataSource {
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

  // Add RegistrationDate
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('registrationDate', entity);

    // Sample HTTP POST request.
    // return this.post('registrationDate', entity);
  }

  // Delete RegistrationDate
  async deleteEntity(id: string) {
    return KapiCrud.delete('registrationDate', id);

    // Sample HTTP DELETE request.
    // return this.delete(`registrationDate/${id}`);
  }

  // List RegistrationDate
  async listEntity(params: any) {
    return KapiCrud.list('registrationDate', params);

    // Sample HTTP GET request.
    // return this.get('registrationDate', params);
  }

  // Get RegistrationDate
  async getEntity(id: string) {
    return KapiCrud.get('registrationDate', id);

    // Sample HTTP GET request.
    // return this.get(`registrationDate/${id}`);
  }

  // Update RegistrationDate
  async updateEntity(entity) {
    return KapiCrud.update('registrationDate', entity);

    // Sample HTTP PATCH request.
    // return this.patch(registrationDate, entity);
  }

  // Auto complete for RegistrationDate
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('registrationDate');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.registrationDate }));
  }
}
