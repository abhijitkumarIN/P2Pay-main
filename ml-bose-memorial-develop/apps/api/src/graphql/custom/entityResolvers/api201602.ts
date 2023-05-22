import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiSpecialistFee extends RESTDataSource {
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

  // Add SpecialistFee
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('specialistFee', entity);

    // Sample HTTP POST request.
    // return this.post('specialistFee', entity);
  }

  // Delete SpecialistFee
  async deleteEntity(id: string) {
    return KapiCrud.delete('specialistFee', id);

    // Sample HTTP DELETE request.
    // return this.delete(`specialistFee/${id}`);
  }

  // List SpecialistFee
  async listEntity(params: any) {
    return KapiCrud.list('specialistFee', params);

    // Sample HTTP GET request.
    // return this.get('specialistFee', params);
  }

  // Get SpecialistFee
  async getEntity(id: string) {
    return KapiCrud.get('specialistFee', id);

    // Sample HTTP GET request.
    // return this.get(`specialistFee/${id}`);
  }

  // Update SpecialistFee
  async updateEntity(entity) {
    return KapiCrud.update('specialistFee', entity);

    // Sample HTTP PATCH request.
    // return this.patch(specialistFee, entity);
  }

  // Auto complete for SpecialistFee
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('specialistFee');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.specialistFee }));
  }
}
