import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { NotificationApi } from '../../../websockets/notifications';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';
import { getOwnerFromContext } from '../../../utils';
import { DataPointValue } from '@kleeen/types';

export class ApiPcpMember extends RESTDataSource {
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

  // Add PcpMember
  async addEntity(entity: { [key: string]: DataPointValue }, parent?: { id: string; entity: string }) {
    const owner = getOwnerFromContext(this.context);
    try {
      const object = {
        medicare: entity?.medicareAccepted?.displayValue ? 1 : 0,
        dr_last_name: entity?.lastName?.displayValue,
        dr_first_name: entity?.firstName?.displayValue,
        dr_title: entity?.title?.displayValue,
        dr_email: entity?.email?.displayValue,
        dr_phone: entity?.cellularNumber?.displayValue,
        dr_work_number: entity?.workNumber?.displayValue,
        office_days: entity?.officeDays?.displayValue,
        office_hours: entity?.officeHours?.displayValue,
        commercial_insurance: entity?.insurancePlansAccepted?.displayValue,
        basic_fee: Number(entity?.basicFee?.displayValue),
        specialist_fee: Number(entity?.specialistFee?.displayValue),
      };

      const response = await this.post('pcp', object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Doctor was added successfully.`,
        success: true,
        title: 'Doctor added.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred adding the doctor.`,
        success: false,
        title: 'Doctor was not added.',
      });
    }
  }

  // Delete PcpMember
  async deleteEntity(id: string) {
    return KapiCrud.delete('pcpMember', id);

    // Sample HTTP DELETE request.
    // return this.delete(`pcpMember/${id}`);
  }

  // List PcpMember
  async listEntity(params: any) {
    return KapiCrud.list('pcpMember', params);

    // Sample HTTP GET request.
    // return this.get('pcpMember', params);
  }

  // Get PcpMember
  async getEntity(id: string) {
    const owner = getOwnerFromContext(this.context);
    try {
      const response = await this.get(`pcp/${id}`);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Doctor found.`,
        success: true,
        title: 'Info of Doctor was found.',
      });

      return {
        medicareAccepted: response.medicare ? '1' : '0',
        lastName: response.dr_last_name,
        firstName: response.dr_first_name,
        title: response.dr_title,
        email: response.dr_email,
        cellularNumber: response.dr_phone,
        workNumber: response.dr_work_number,
        officeDays: response.office_days.split(','),
        officeHours: response.office_hours,
        insurancePlansAccepted: response.commercial_insurance,
        basicFee: response.basic_fee,
        specialistFee: response.specialist_fee,
      };
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Please complete the info to add the doctor.`,
        success: true,
        title: 'Doctor was not found.',
      });
    }
  }

  // Update PcpMember
  async updateEntity(entity) {
    const owner = getOwnerFromContext(this.context);
    try {
      const object = {
        medicare: entity?.medicareAccepted ? 1 : 0,
        dr_last_name: entity?.lastName,
        dr_first_name: entity?.firstName,
        dr_title: entity?.title,
        dr_email: entity?.email,
        dr_phone: entity?.cellularNumber,
        dr_work_number: entity?.workNumber,
        office_days: entity?.officeDays,
        office_hours: entity?.officeHours,
        commercial_insurance: entity?.insurancePlansAccepted,
        basic_fee: Number(entity?.basicFee),
        specialist_fee: Number(entity?.specialistFee),
      };

      const response = await this.post(`pcp/${entity?.cellularNumber}`, object);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `Doctor was edited successfully.`,
        success: true,
        title: 'Doctor edited.',
      });

      return response;
    } catch (error) {
      console.error(error);

      NotificationApi.notifyUser(owner, {
        actions: [],
        message: `An error ocurred edited the doctor.`,
        success: false,
        title: 'Doctor was not edited.',
      });
    }
  }

  // Auto complete for PcpMember
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('pcpMember');
    // TODO: @guaria generate missing attributes
    return results.map((obj) => ({ ...obj.pcpMember }));
  }

  // Dial Phone action for PcpMember
  async customAction_dialPhone(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }

  // Send Invoice Copy action for PcpMember
  async customAction_sendInvoiceCopy(args: CustomActionArgs): Promise<DispatchCustomActionResults> {
    return dispatchCustomAction(args);
  }
}
