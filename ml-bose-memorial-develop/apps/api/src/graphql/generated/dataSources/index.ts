import { ApiPcpMail } from '../../custom/entityResolvers/api13433';
import { ApiPrimaryCareLastName } from '../../custom/entityResolvers/api59127';
import { ApiTimestamp } from '../../custom/entityResolvers/api200996';
import { ApiMemberName } from '../../custom/entityResolvers/api200998';
import { ApiBusinessPhone } from '../../custom/entityResolvers/api201583';
import { ApiGender } from '../../custom/entityResolvers/api201584';
import { ApiPrimaryCareId } from '../../custom/entityResolvers/api201585';
import { ApiCellPhone } from '../../custom/entityResolvers/api201586';
import { ApiAptNo } from '../../custom/entityResolvers/api201587';
import { ApiMemberId } from '../../custom/entityResolvers/api201588';
import { ApiAddress } from '../../custom/entityResolvers/api201589';
import { ApiZipCode } from '../../custom/entityResolvers/api201590';
import { ApiDob } from '../../custom/entityResolvers/api201591';
import { ApiBalanceDue } from '../../custom/entityResolvers/api201592';
import { ApiPrimaryCareName } from '../../custom/entityResolvers/api201593';
import { ApiTitle } from '../../custom/entityResolvers/api201594';
import { ApiTelephone } from '../../custom/entityResolvers/api201595';
import { ApiPcpzipCode } from '../../custom/entityResolvers/api201596';
import { ApiPcpStreetAddress } from '../../custom/entityResolvers/api201597';
import { ApiPcpSuite } from '../../custom/entityResolvers/api201598';
import { ApiNpi } from '../../custom/entityResolvers/api201599';
import { ApiOfficeHours } from '../../custom/entityResolvers/api201600';
import { ApiBasicFee } from '../../custom/entityResolvers/api201601';
import { ApiSpecialistFee } from '../../custom/entityResolvers/api201602';
import { ApiMedicare } from '../../custom/entityResolvers/api201603';
import { ApiCommercialInsurance } from '../../custom/entityResolvers/api201605';
import { ApiP2P } from '../../custom/entityResolvers/api201606';
import { ApiRegistrationDate } from '../../custom/entityResolvers/api201607';
import { ApiDonorId } from '../../custom/entityResolvers/api201608';
import { ApiPreferredMember } from '../../custom/entityResolvers/api201618';
import { ApiBusinessName } from '../../custom/entityResolvers/api201619';
import { ApiDonorPhoneNumber } from '../../custom/entityResolvers/api201620';
import { ApiMaxPerTransaction } from '../../custom/entityResolvers/api201621';
import { ApiDonorName } from '../../custom/entityResolvers/api201622';
import { ApiPaidMembers } from '../../custom/entityResolvers/api201623';
import { ApiDonorBusiness } from '../../custom/entityResolvers/api201624';
import { ApiDonorStreetAddress } from '../../custom/entityResolvers/api201625';
import { ApiDonorSuite } from '../../custom/entityResolvers/api201626';
import { ApiMinPerTransaction } from '../../custom/entityResolvers/api201627';
import { ApiDonorCurrentBalance } from '../../custom/entityResolvers/api201628';
import { ApiDonorZip } from '../../custom/entityResolvers/api201629';
import { ApiDonorFax } from '../../custom/entityResolvers/api201630';
import { ApiDonorSpentYtd } from '../../custom/entityResolvers/api201631';
import { ApiDonorCommitment } from '../../custom/entityResolvers/api201632';
import { ApiTransactionId } from '../../custom/entityResolvers/api201633';
import { ApiMemberAmountPaid } from '../../custom/entityResolvers/api201634';
import { ApiTransactionMember } from '../../custom/entityResolvers/api201635';
import { ApiTransactionDonor } from '../../custom/entityResolvers/api201636';
import { ApiInvoiceId } from '../../custom/entityResolvers/api201637';
import { ApiTransactionDate } from '../../custom/entityResolvers/api201638';
import { ApiTransactionAmount } from '../../custom/entityResolvers/api201639';
import { ApiTransactionPcp } from '../../custom/entityResolvers/api201640';
import { ApiTransactionDonationAmount } from '../../custom/entityResolvers/api201641';
import { ApiMemberPaidAmount } from '../../custom/entityResolvers/api201642';
import { ApiInvoiceAmount } from '../../custom/entityResolvers/api201643';
import { ApiTotalDonorPayments } from '../../custom/entityResolvers/api201644';
import { ApiInvoiceNumber } from '../../custom/entityResolvers/api201736';
import { ApiMembersPcp } from '../../custom/entityResolvers/api202046';
import { ApiMembersTransactions } from '../../custom/entityResolvers/api202047';
import { ApiPatientsPcp } from '../../custom/entityResolvers/api206779';
import { ApiPcpMember } from '../../custom/entityResolvers/api206780';
import { ApiEligiblePcp } from '../../custom/entityResolvers/api213133';
import { ApiHcapScore } from '../../custom/entityResolvers/api213333';
import { ApiUploadFile } from '../../custom/entityResolvers/api213334';
import { ApiUploadedBy } from '../../custom/entityResolvers/api213335';
import { DataSource } from 'apollo-datasource';
import { FiltersApi } from '../../custom/filtersResolver/filtersApi';
import { FiltersFakeApi } from './filtersFakeApi';
import { FormatCheckApi } from '../../custom/formatCheckResolver/formatCheckApi';
import { FormatCheckFakeApi } from './formatCheckFakeApi';
import { WidgetApi } from './widgetApi';
import { WidgetFakeApi } from './widgetFakeApi';

export const dataSources = (): Record<string, DataSource> => ({
  filtersFakeApi: new FiltersFakeApi(),
  filtersApi: new FiltersApi(),
  formatCheckFakeApi: new FormatCheckFakeApi(),
  formatCheckApi: new FormatCheckApi(),
  widgetApi: new WidgetApi(),
  widgetFakeApi: new WidgetFakeApi(),
  api13433: new ApiPcpMail(),
  api59127: new ApiPrimaryCareLastName(),
  api200996: new ApiTimestamp(),
  api200998: new ApiMemberName(),
  api201583: new ApiBusinessPhone(),
  api201584: new ApiGender(),
  api201585: new ApiPrimaryCareId(),
  api201586: new ApiCellPhone(),
  api201587: new ApiAptNo(),
  api201588: new ApiMemberId(),
  api201589: new ApiAddress(),
  api201590: new ApiZipCode(),
  api201591: new ApiDob(),
  api201592: new ApiBalanceDue(),
  api201593: new ApiPrimaryCareName(),
  api201594: new ApiTitle(),
  api201595: new ApiTelephone(),
  api201596: new ApiPcpzipCode(),
  api201597: new ApiPcpStreetAddress(),
  api201598: new ApiPcpSuite(),
  api201599: new ApiNpi(),
  api201600: new ApiOfficeHours(),
  api201601: new ApiBasicFee(),
  api201602: new ApiSpecialistFee(),
  api201603: new ApiMedicare(),
  api201605: new ApiCommercialInsurance(),
  api201606: new ApiP2P(),
  api201607: new ApiRegistrationDate(),
  api201608: new ApiDonorId(),
  api201618: new ApiPreferredMember(),
  api201619: new ApiBusinessName(),
  api201620: new ApiDonorPhoneNumber(),
  api201621: new ApiMaxPerTransaction(),
  api201622: new ApiDonorName(),
  api201623: new ApiPaidMembers(),
  api201624: new ApiDonorBusiness(),
  api201625: new ApiDonorStreetAddress(),
  api201626: new ApiDonorSuite(),
  api201627: new ApiMinPerTransaction(),
  api201628: new ApiDonorCurrentBalance(),
  api201629: new ApiDonorZip(),
  api201630: new ApiDonorFax(),
  api201631: new ApiDonorSpentYtd(),
  api201632: new ApiDonorCommitment(),
  api201633: new ApiTransactionId(),
  api201634: new ApiMemberAmountPaid(),
  api201635: new ApiTransactionMember(),
  api201636: new ApiTransactionDonor(),
  api201637: new ApiInvoiceId(),
  api201638: new ApiTransactionDate(),
  api201639: new ApiTransactionAmount(),
  api201640: new ApiTransactionPcp(),
  api201641: new ApiTransactionDonationAmount(),
  api201642: new ApiMemberPaidAmount(),
  api201643: new ApiInvoiceAmount(),
  api201644: new ApiTotalDonorPayments(),
  api201736: new ApiInvoiceNumber(),
  api202046: new ApiMembersPcp(),
  api202047: new ApiMembersTransactions(),
  api206779: new ApiPatientsPcp(),
  api206780: new ApiPcpMember(),
  api213133: new ApiEligiblePcp(),
  api213333: new ApiHcapScore(),
  api213334: new ApiUploadFile(),
  api213335: new ApiUploadedBy(),
});
