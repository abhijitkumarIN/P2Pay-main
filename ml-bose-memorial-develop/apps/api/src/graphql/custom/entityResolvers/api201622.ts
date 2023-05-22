import { DataPointValue } from '@kleeen/types';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getOwnerFromContext } from 'apps/api/src/utils';
import { NotificationApi } from 'apps/api/src/websockets/notifications';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

// KAPI - Integration

export class ApiDonorName extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://x8ki-letl-twmt.n7.xano.io/api:_iwYisMQ';
    // You can access the token, data sources,
    // and the current user through 'this.context'.
  }

  willSendRequest(request: RequestOptions) {
    // Uncomment the following line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // Uncomment the following line to set params token.
    // request.params.set('api_key', this.context.token);
  }

  // Add DonorName
  async addEntity(entity: { [key: string]: DataPointValue }, parent?: { id: string; entity: string }) {
    const owner = getOwnerFromContext(this.context);
    try {
      const object = {
        annual_commitment_for_person: entity?.annualCommitmentForPerson?.displayValue,
        annual_commitment: entity?.annualCommitment?.displayValue,
        ask_by_person: entity?.askByPerson?.displayValue,
        business: entity?.business?.displayValue,
        cellular_number: Number(entity?.cellularNumber?.displayValue),
        city: entity?.city?.displayValue,
        country: entity?.country?.displayValue,
        donating_to_person: entity?.medicareAccepted?.displayValue ? 1 : 0,
        email: entity?.email?.displayValue,
        fax_number: Number(entity?.faxNumber?.displayValue),
        first_name: entity?.firstName?.displayValue,
        last_name: entity?.lastName?.displayValue,
        max_per_transaction: Number(entity?.maxPerTransaction?.displayValue),
        min_per_transaction: Number(entity?.minPerTransaction?.displayValue),
        state: entity?.state?.displayValue,
        street_address_2: entity?.streetAddressLine2?.displayValue,
        street_address: entity?.streetAddress?.displayValue,
        zip_code: Number(entity?.zipCode?.displayValue),
      };
      const response = await this.post('donors', object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Donor was added successfully.`,
        success: true,
        title: 'Donor added.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred adding the Donor.`,
        success: false,
        title: 'Donor was not added.',
      });
    }
  }

  // Delete DonorName
  async deleteEntity(id: string) {
    return KapiCrud.delete('donorName', id);

    // Sample HTTP DELETE request.
    // return this.delete(`donorName/${id}`);
  }

  // List DonorName
  async listEntity(params: any) {
    return KapiCrud.list('donorName', params);

    // Sample HTTP GET request.
    // return this.get('donorName', params);
  }

  // Get DonorName
  async getEntity(id: string) {
    const owner = getOwnerFromContext(this.context);
    try {
      const response = await this.get(`donors/${id}`);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Donor found.`,
        success: true,
        title: 'Info of Donor was found.',
      });

      return {
        askByPerson: response.ask_by_person,
        annualCommitmentForPerson: response.annual_commitment_for_person,
        annualCommitment: response.annual_commitment,
        donatingToPerson: response.donating_to_person ? '1' : '0',
        business: response.business,
        cellularNumber: response.cellular_number,
        city: response.city,
        country: response.country,
        medicareAccepted: response.medicareAccepted,
        email: response.email,
        faxNumber: response.fax_number.toString(),
        firstName: response.first_name,
        lastName: response.last_name,
        maxPerTransaction: response.max_per_transaction,
        minPerTransaction: response.min_per_transaction,
        state: response.state,
        streetAddressLine2: response.street_address_2,
        streetAddress: response.street_address,
        zipCode: response.zip_code,
      };
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Please complete the info to add the Donor.`,
        success: true,
        title: 'Donor was not found.',
      });
    }
  }

  // Update DonorName
  async updateEntity(entity) {
    const owner = getOwnerFromContext(this.context);
    try {
      const object = {
        ask_by_person: entity?.askByPerson,
        annual_commitment_for_person: entity?.annualCommitmentForPerson,
        annual_commitment: entity?.annualCommitment,
        donating_to_person: entity?.donatingToPerson ? '1' : '0',
        business: entity?.business,
        cellular_number: entity?.cellularNumber,
        city: entity?.city,
        country: entity?.country,
        email: entity?.email,
        fax_number: entity?.faxNumber,
        first_name: entity?.firstName,
        last_name: entity?.lastName,
        max_per_transaction: entity?.maxPerTransaction,
        min_per_transaction: entity?.minPerTransaction,
        state: entity?.state,
        street_address_2: entity?.streetAddressLine2,
        street_address: entity?.streetAddress,
        zip_code: entity?.zipCode,
      };

      const response = await this.post(`donors/${entity?.cellularNumber}`, object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Donor was edited successfully.`,
        success: true,
        title: 'Donor edited.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred edited the Donor.`,
        success: false,
        title: 'Donor was not edited.',
      });
    }
  }

  // Auto complete for DonorName
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('donorName');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.donorName }));
  }
}
