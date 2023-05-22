import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { getOwnerFromContext } from 'apps/api/src/utils';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';
import { v4 as uuid } from 'uuid';
import { DataPointValue } from '@kleeen/types';
import { NotificationApi } from 'apps/api/src/websockets/notifications';
// KAPI - Integration

export class ApiPatientsPcp extends RESTDataSource {
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

  // Add PatientsPcp
  async addEntity(entity: { [key: string]: DataPointValue }, parent?: { id: string; entity: string }) {
    const owner = getOwnerFromContext(this.context);
    const id = uuid();
    try {
      const object = {
        apt_no: entity?.apartmentNumber?.displayValue,
        balance_due: Number(entity?.balanceDue?.displayValue),
        business_phone: Number(entity?.businessPhoneNumber?.displayValue),
        cellphone_no: Number(entity?.cellularNumber?.displayValue),
        dob: entity?.birthday?.displayValue,
        first_name: entity?.firstName?.displayValue,
        gender: entity?.gender?.displayValue,
        last_name: entity?.lastName?.displayValue,
        member_id: id,
        pcp_id: Number(entity?.pcpId?.displayValue),
        registration_date: entity?.registrationDate?.displayValue,
        street_address: entity?.streetAddress?.displayValue,
        zip_code: Number(entity?.zipCode?.displayValue),
      };

      const response = await this.post('member_data', object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Patient was added successfully.`,
        success: true,
        title: 'Patient added.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred adding the Patient.`,
        success: false,
        title: 'Patient was not added.',
      });
    }
  }

  // Delete PatientsPcp
  async deleteEntity(id: string) {
    return KapiCrud.delete('patientsPcp', id);

    // Sample HTTP DELETE request.
    // return this.delete(`patientsPcp/${id}`);
  }

  // List PatientsPcp
  async listEntity(params: any) {
    return KapiCrud.list('patientsPcp', params);

    // Sample HTTP GET request.
    // return this.get('patientsPcp', params);
  }

  // Get PatientsPcp
  async getEntity(id: string) {
    const owner = getOwnerFromContext(this.context);
    try {
      const response = await this.get(`member_data/${id}`);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Patient found.`,
        success: true,
        title: 'Info of Patient was found.',
      });

      return {
        apartmentNumber: response.apt_no,
        balanceDue: response.balance_due,
        businessPhoneNumber: response.business_phone.toString(),
        cellularNumber: response.cellphone_no,
        birthday: response.dob,
        firstName: response.first_name,
        gender: response.gender,
        lastName: response.last_name,
        pcpId: response.pcp_id,
        registrationDate: response.registration_date,
        streetAddress: response.street_address,
        zipCode: response.zip_code,
      };
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Please complete the info to add the patient.`,
        success: true,
        title: 'Patient was not found.',
      });
    }
  }

  // Update PatientsPcp
  async updateEntity(entity) {
    const owner = getOwnerFromContext(this.context);
    try {
      const object = {
        last_name: entity?.lastName,
        first_name: entity?.firstName,
        dob: entity?.birthday,
        gender: entity?.gender,
        zip_code: entity?.zipCode,
        apt_no: entity?.apartmentNumber,
        cellphone_no: entity?.cellularNumber,
        business_phone: entity?.businessPhoneNumber,
        pcp_id: entity?.pcpId,
        registration_date: entity?.registrationDate,
        balance_due: Number(entity?.balanceDue),
        street_address: entity?.streetAddress,
      };

      const response = await this.post(`member_data/${entity?.cellularNumber}`, object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Patient was edited successfully.`,
        success: true,
        title: 'Patient edited.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred edited the Patient.`,
        success: false,
        title: 'Patient was not edited.',
      });
    }
  }

  // Auto complete for PatientsPcp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('patientsPcp');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.patientsPcp }));
  }
}
