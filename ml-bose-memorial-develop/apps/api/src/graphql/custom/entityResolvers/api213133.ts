import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiEligiblePcp extends RESTDataSource {
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

  // Add EligiblePcp
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('eligiblePcp', entity);

    // Sample HTTP POST request.
    // return this.post('eligiblePcp', entity);
  }

  // Delete EligiblePcp
  async deleteEntity(id: string) {
    return KapiCrud.delete('eligiblePcp', id);

    // Sample HTTP DELETE request.
    // return this.delete(`eligiblePcp/${id}`);
  }

  // List EligiblePcp
  async listEntity(params: any) {
    return KapiCrud.list('eligiblePcp', params);

    // Sample HTTP GET request.
    // return this.get('eligiblePcp', params);
  }

  // Get EligiblePcp
  async getEntity(id: string) {
    return KapiCrud.get('eligiblePcp', id);

    // Sample HTTP GET request.
    // return this.get(`eligiblePcp/${id}`);
  }

  // Update EligiblePcp
  async updateEntity(entity) {
    return KapiCrud.update('eligiblePcp', entity);

    // Sample HTTP PATCH request.
    // return this.patch(eligiblePcp, entity);
  }

  // Auto complete for EligiblePcp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('eligiblePcp');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.eligiblePcp }));
  }

  // Add to My List action for EligiblePcp
  async customAction_addToMyList(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Request A Visit action for EligiblePcp
  async customAction_requestAVisit(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
