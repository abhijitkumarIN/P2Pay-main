import { gql } from 'apollo-server-express';

export const entitySchema = gql`
  input AutoCompleteByEntityInput {
    entity: String!
    offset: Int
    totalCount: Int
    limit: Int
  }

  input AddEntityParent {
    id: String!
    entity: String
  }

  input AddEntityInput {
    entity: JSON
    parent: AddEntityParent
  }

  input ListEntityInput {
    entity: JSON
  }

  type AutoCompleteOptionShape {
    displayValue: String!
    value: String
    id: String
  }

  type AutoCompleteResponse {
    data: [AutoCompleteOptionShape]
    errorMessage: String
  }

  extend type Query {
    # PcpMail
    add13433(input: AddEntityInput): GenericEntity
    list13433(input: ListEntityInput): GenericEntity
    get13433(id: String): GenericEntity
    delete13433(id: String): GenericEntity
    update13433(entity: JSON): GenericEntity
    autoComplete13433(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PrimaryCareLastName
    add59127(input: AddEntityInput): GenericEntity
    list59127(input: ListEntityInput): GenericEntity
    get59127(id: String): GenericEntity
    delete59127(id: String): GenericEntity
    update59127(entity: JSON): GenericEntity
    autoComplete59127(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Timestamp
    add200996(input: AddEntityInput): GenericEntity
    list200996(input: ListEntityInput): GenericEntity
    get200996(id: String): GenericEntity
    delete200996(id: String): GenericEntity
    update200996(entity: JSON): GenericEntity
    autoComplete200996(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MemberName
    add200998(input: AddEntityInput): GenericEntity
    list200998(input: ListEntityInput): GenericEntity
    get200998(id: String): GenericEntity
    delete200998(id: String): GenericEntity
    update200998(entity: JSON): GenericEntity
    autoComplete200998(input: AutoCompleteByEntityInput): AutoCompleteResponse
    dialPhone200998(input: CustomActionArgs): GenericEntity
    sendInvoiceCopy200998(input: CustomActionArgs): GenericEntity

    # BusinessPhone
    add201583(input: AddEntityInput): GenericEntity
    list201583(input: ListEntityInput): GenericEntity
    get201583(id: String): GenericEntity
    delete201583(id: String): GenericEntity
    update201583(entity: JSON): GenericEntity
    autoComplete201583(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Gender
    add201584(input: AddEntityInput): GenericEntity
    list201584(input: ListEntityInput): GenericEntity
    get201584(id: String): GenericEntity
    delete201584(id: String): GenericEntity
    update201584(entity: JSON): GenericEntity
    autoComplete201584(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PrimaryCareId
    add201585(input: AddEntityInput): GenericEntity
    list201585(input: ListEntityInput): GenericEntity
    get201585(id: String): GenericEntity
    delete201585(id: String): GenericEntity
    update201585(entity: JSON): GenericEntity
    autoComplete201585(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # CellPhone
    add201586(input: AddEntityInput): GenericEntity
    list201586(input: ListEntityInput): GenericEntity
    get201586(id: String): GenericEntity
    delete201586(id: String): GenericEntity
    update201586(entity: JSON): GenericEntity
    autoComplete201586(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # AptNo
    add201587(input: AddEntityInput): GenericEntity
    list201587(input: ListEntityInput): GenericEntity
    get201587(id: String): GenericEntity
    delete201587(id: String): GenericEntity
    update201587(entity: JSON): GenericEntity
    autoComplete201587(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MemberId
    add201588(input: AddEntityInput): GenericEntity
    list201588(input: ListEntityInput): GenericEntity
    get201588(id: String): GenericEntity
    delete201588(id: String): GenericEntity
    update201588(entity: JSON): GenericEntity
    autoComplete201588(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Address
    add201589(input: AddEntityInput): GenericEntity
    list201589(input: ListEntityInput): GenericEntity
    get201589(id: String): GenericEntity
    delete201589(id: String): GenericEntity
    update201589(entity: JSON): GenericEntity
    autoComplete201589(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # ZipCode
    add201590(input: AddEntityInput): GenericEntity
    list201590(input: ListEntityInput): GenericEntity
    get201590(id: String): GenericEntity
    delete201590(id: String): GenericEntity
    update201590(entity: JSON): GenericEntity
    autoComplete201590(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Dob
    add201591(input: AddEntityInput): GenericEntity
    list201591(input: ListEntityInput): GenericEntity
    get201591(id: String): GenericEntity
    delete201591(id: String): GenericEntity
    update201591(entity: JSON): GenericEntity
    autoComplete201591(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # BalanceDue
    add201592(input: AddEntityInput): GenericEntity
    list201592(input: ListEntityInput): GenericEntity
    get201592(id: String): GenericEntity
    delete201592(id: String): GenericEntity
    update201592(entity: JSON): GenericEntity
    autoComplete201592(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PrimaryCareName
    add201593(input: AddEntityInput): GenericEntity
    list201593(input: ListEntityInput): GenericEntity
    get201593(id: String): GenericEntity
    delete201593(id: String): GenericEntity
    update201593(entity: JSON): GenericEntity
    autoComplete201593(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Title
    add201594(input: AddEntityInput): GenericEntity
    list201594(input: ListEntityInput): GenericEntity
    get201594(id: String): GenericEntity
    delete201594(id: String): GenericEntity
    update201594(entity: JSON): GenericEntity
    autoComplete201594(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Telephone
    add201595(input: AddEntityInput): GenericEntity
    list201595(input: ListEntityInput): GenericEntity
    get201595(id: String): GenericEntity
    delete201595(id: String): GenericEntity
    update201595(entity: JSON): GenericEntity
    autoComplete201595(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PcpzipCode
    add201596(input: AddEntityInput): GenericEntity
    list201596(input: ListEntityInput): GenericEntity
    get201596(id: String): GenericEntity
    delete201596(id: String): GenericEntity
    update201596(entity: JSON): GenericEntity
    autoComplete201596(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PcpStreetAddress
    add201597(input: AddEntityInput): GenericEntity
    list201597(input: ListEntityInput): GenericEntity
    get201597(id: String): GenericEntity
    delete201597(id: String): GenericEntity
    update201597(entity: JSON): GenericEntity
    autoComplete201597(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PcpSuite
    add201598(input: AddEntityInput): GenericEntity
    list201598(input: ListEntityInput): GenericEntity
    get201598(id: String): GenericEntity
    delete201598(id: String): GenericEntity
    update201598(entity: JSON): GenericEntity
    autoComplete201598(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Npi
    add201599(input: AddEntityInput): GenericEntity
    list201599(input: ListEntityInput): GenericEntity
    get201599(id: String): GenericEntity
    delete201599(id: String): GenericEntity
    update201599(entity: JSON): GenericEntity
    autoComplete201599(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # OfficeHours
    add201600(input: AddEntityInput): GenericEntity
    list201600(input: ListEntityInput): GenericEntity
    get201600(id: String): GenericEntity
    delete201600(id: String): GenericEntity
    update201600(entity: JSON): GenericEntity
    autoComplete201600(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # BasicFee
    add201601(input: AddEntityInput): GenericEntity
    list201601(input: ListEntityInput): GenericEntity
    get201601(id: String): GenericEntity
    delete201601(id: String): GenericEntity
    update201601(entity: JSON): GenericEntity
    autoComplete201601(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # SpecialistFee
    add201602(input: AddEntityInput): GenericEntity
    list201602(input: ListEntityInput): GenericEntity
    get201602(id: String): GenericEntity
    delete201602(id: String): GenericEntity
    update201602(entity: JSON): GenericEntity
    autoComplete201602(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # Medicare
    add201603(input: AddEntityInput): GenericEntity
    list201603(input: ListEntityInput): GenericEntity
    get201603(id: String): GenericEntity
    delete201603(id: String): GenericEntity
    update201603(entity: JSON): GenericEntity
    autoComplete201603(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # CommercialInsurance
    add201605(input: AddEntityInput): GenericEntity
    list201605(input: ListEntityInput): GenericEntity
    get201605(id: String): GenericEntity
    delete201605(id: String): GenericEntity
    update201605(entity: JSON): GenericEntity
    autoComplete201605(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # P2P
    add201606(input: AddEntityInput): GenericEntity
    list201606(input: ListEntityInput): GenericEntity
    get201606(id: String): GenericEntity
    delete201606(id: String): GenericEntity
    update201606(entity: JSON): GenericEntity
    autoComplete201606(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # RegistrationDate
    add201607(input: AddEntityInput): GenericEntity
    list201607(input: ListEntityInput): GenericEntity
    get201607(id: String): GenericEntity
    delete201607(id: String): GenericEntity
    update201607(entity: JSON): GenericEntity
    autoComplete201607(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorId
    add201608(input: AddEntityInput): GenericEntity
    list201608(input: ListEntityInput): GenericEntity
    get201608(id: String): GenericEntity
    delete201608(id: String): GenericEntity
    update201608(entity: JSON): GenericEntity
    autoComplete201608(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PreferredMember
    add201618(input: AddEntityInput): GenericEntity
    list201618(input: ListEntityInput): GenericEntity
    get201618(id: String): GenericEntity
    delete201618(id: String): GenericEntity
    update201618(entity: JSON): GenericEntity
    autoComplete201618(input: AutoCompleteByEntityInput): AutoCompleteResponse
    dialPhone201618(input: CustomActionArgs): GenericEntity
    sendInvoiceCopy201618(input: CustomActionArgs): GenericEntity

    # BusinessName
    add201619(input: AddEntityInput): GenericEntity
    list201619(input: ListEntityInput): GenericEntity
    get201619(id: String): GenericEntity
    delete201619(id: String): GenericEntity
    update201619(entity: JSON): GenericEntity
    autoComplete201619(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorPhoneNumber
    add201620(input: AddEntityInput): GenericEntity
    list201620(input: ListEntityInput): GenericEntity
    get201620(id: String): GenericEntity
    delete201620(id: String): GenericEntity
    update201620(entity: JSON): GenericEntity
    autoComplete201620(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MaxPerTransaction
    add201621(input: AddEntityInput): GenericEntity
    list201621(input: ListEntityInput): GenericEntity
    get201621(id: String): GenericEntity
    delete201621(id: String): GenericEntity
    update201621(entity: JSON): GenericEntity
    autoComplete201621(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorName
    add201622(input: AddEntityInput): GenericEntity
    list201622(input: ListEntityInput): GenericEntity
    get201622(id: String): GenericEntity
    delete201622(id: String): GenericEntity
    update201622(entity: JSON): GenericEntity
    autoComplete201622(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PaidMembers
    add201623(input: AddEntityInput): GenericEntity
    list201623(input: ListEntityInput): GenericEntity
    get201623(id: String): GenericEntity
    delete201623(id: String): GenericEntity
    update201623(entity: JSON): GenericEntity
    autoComplete201623(input: AutoCompleteByEntityInput): AutoCompleteResponse
    dialPhone201623(input: CustomActionArgs): GenericEntity
    sendInvoiceCopy201623(input: CustomActionArgs): GenericEntity

    # DonorBusiness
    add201624(input: AddEntityInput): GenericEntity
    list201624(input: ListEntityInput): GenericEntity
    get201624(id: String): GenericEntity
    delete201624(id: String): GenericEntity
    update201624(entity: JSON): GenericEntity
    autoComplete201624(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorStreetAddress
    add201625(input: AddEntityInput): GenericEntity
    list201625(input: ListEntityInput): GenericEntity
    get201625(id: String): GenericEntity
    delete201625(id: String): GenericEntity
    update201625(entity: JSON): GenericEntity
    autoComplete201625(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorSuite
    add201626(input: AddEntityInput): GenericEntity
    list201626(input: ListEntityInput): GenericEntity
    get201626(id: String): GenericEntity
    delete201626(id: String): GenericEntity
    update201626(entity: JSON): GenericEntity
    autoComplete201626(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MinPerTransaction
    add201627(input: AddEntityInput): GenericEntity
    list201627(input: ListEntityInput): GenericEntity
    get201627(id: String): GenericEntity
    delete201627(id: String): GenericEntity
    update201627(entity: JSON): GenericEntity
    autoComplete201627(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorCurrentBalance
    add201628(input: AddEntityInput): GenericEntity
    list201628(input: ListEntityInput): GenericEntity
    get201628(id: String): GenericEntity
    delete201628(id: String): GenericEntity
    update201628(entity: JSON): GenericEntity
    autoComplete201628(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorZip
    add201629(input: AddEntityInput): GenericEntity
    list201629(input: ListEntityInput): GenericEntity
    get201629(id: String): GenericEntity
    delete201629(id: String): GenericEntity
    update201629(entity: JSON): GenericEntity
    autoComplete201629(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorFax
    add201630(input: AddEntityInput): GenericEntity
    list201630(input: ListEntityInput): GenericEntity
    get201630(id: String): GenericEntity
    delete201630(id: String): GenericEntity
    update201630(entity: JSON): GenericEntity
    autoComplete201630(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorSpentYtd
    add201631(input: AddEntityInput): GenericEntity
    list201631(input: ListEntityInput): GenericEntity
    get201631(id: String): GenericEntity
    delete201631(id: String): GenericEntity
    update201631(entity: JSON): GenericEntity
    autoComplete201631(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # DonorCommitment
    add201632(input: AddEntityInput): GenericEntity
    list201632(input: ListEntityInput): GenericEntity
    get201632(id: String): GenericEntity
    delete201632(id: String): GenericEntity
    update201632(entity: JSON): GenericEntity
    autoComplete201632(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionId
    add201633(input: AddEntityInput): GenericEntity
    list201633(input: ListEntityInput): GenericEntity
    get201633(id: String): GenericEntity
    delete201633(id: String): GenericEntity
    update201633(entity: JSON): GenericEntity
    autoComplete201633(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MemberAmountPaid
    add201634(input: AddEntityInput): GenericEntity
    list201634(input: ListEntityInput): GenericEntity
    get201634(id: String): GenericEntity
    delete201634(id: String): GenericEntity
    update201634(entity: JSON): GenericEntity
    autoComplete201634(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionMember
    add201635(input: AddEntityInput): GenericEntity
    list201635(input: ListEntityInput): GenericEntity
    get201635(id: String): GenericEntity
    delete201635(id: String): GenericEntity
    update201635(entity: JSON): GenericEntity
    autoComplete201635(input: AutoCompleteByEntityInput): AutoCompleteResponse
    dialPhone201635(input: CustomActionArgs): GenericEntity
    sendInvoiceCopy201635(input: CustomActionArgs): GenericEntity

    # TransactionDonor
    add201636(input: AddEntityInput): GenericEntity
    list201636(input: ListEntityInput): GenericEntity
    get201636(id: String): GenericEntity
    delete201636(id: String): GenericEntity
    update201636(entity: JSON): GenericEntity
    autoComplete201636(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # InvoiceId
    add201637(input: AddEntityInput): GenericEntity
    list201637(input: ListEntityInput): GenericEntity
    get201637(id: String): GenericEntity
    delete201637(id: String): GenericEntity
    update201637(entity: JSON): GenericEntity
    autoComplete201637(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionDate
    add201638(input: AddEntityInput): GenericEntity
    list201638(input: ListEntityInput): GenericEntity
    get201638(id: String): GenericEntity
    delete201638(id: String): GenericEntity
    update201638(entity: JSON): GenericEntity
    autoComplete201638(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionAmount
    add201639(input: AddEntityInput): GenericEntity
    list201639(input: ListEntityInput): GenericEntity
    get201639(id: String): GenericEntity
    delete201639(id: String): GenericEntity
    update201639(entity: JSON): GenericEntity
    autoComplete201639(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionPcp
    add201640(input: AddEntityInput): GenericEntity
    list201640(input: ListEntityInput): GenericEntity
    get201640(id: String): GenericEntity
    delete201640(id: String): GenericEntity
    update201640(entity: JSON): GenericEntity
    autoComplete201640(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TransactionDonationAmount
    add201641(input: AddEntityInput): GenericEntity
    list201641(input: ListEntityInput): GenericEntity
    get201641(id: String): GenericEntity
    delete201641(id: String): GenericEntity
    update201641(entity: JSON): GenericEntity
    autoComplete201641(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MemberPaidAmount
    add201642(input: AddEntityInput): GenericEntity
    list201642(input: ListEntityInput): GenericEntity
    get201642(id: String): GenericEntity
    delete201642(id: String): GenericEntity
    update201642(entity: JSON): GenericEntity
    autoComplete201642(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # InvoiceAmount
    add201643(input: AddEntityInput): GenericEntity
    list201643(input: ListEntityInput): GenericEntity
    get201643(id: String): GenericEntity
    delete201643(id: String): GenericEntity
    update201643(entity: JSON): GenericEntity
    autoComplete201643(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # TotalDonorPayments
    add201644(input: AddEntityInput): GenericEntity
    list201644(input: ListEntityInput): GenericEntity
    get201644(id: String): GenericEntity
    delete201644(id: String): GenericEntity
    update201644(entity: JSON): GenericEntity
    autoComplete201644(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # InvoiceNumber
    add201736(input: AddEntityInput): GenericEntity
    list201736(input: ListEntityInput): GenericEntity
    get201736(id: String): GenericEntity
    delete201736(id: String): GenericEntity
    update201736(entity: JSON): GenericEntity
    autoComplete201736(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MembersPcp
    add202046(input: AddEntityInput): GenericEntity
    list202046(input: ListEntityInput): GenericEntity
    get202046(id: String): GenericEntity
    delete202046(id: String): GenericEntity
    update202046(entity: JSON): GenericEntity
    autoComplete202046(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # MembersTransactions
    add202047(input: AddEntityInput): GenericEntity
    list202047(input: ListEntityInput): GenericEntity
    get202047(id: String): GenericEntity
    delete202047(id: String): GenericEntity
    update202047(entity: JSON): GenericEntity
    autoComplete202047(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PatientsPcp
    add206779(input: AddEntityInput): GenericEntity
    list206779(input: ListEntityInput): GenericEntity
    get206779(id: String): GenericEntity
    delete206779(id: String): GenericEntity
    update206779(entity: JSON): GenericEntity
    autoComplete206779(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # PcpMember
    add206780(input: AddEntityInput): GenericEntity
    list206780(input: ListEntityInput): GenericEntity
    get206780(id: String): GenericEntity
    delete206780(id: String): GenericEntity
    update206780(entity: JSON): GenericEntity
    autoComplete206780(input: AutoCompleteByEntityInput): AutoCompleteResponse
    dialPhone206780(input: CustomActionArgs): GenericEntity
    sendInvoiceCopy206780(input: CustomActionArgs): GenericEntity

    # EligiblePcp
    add213133(input: AddEntityInput): GenericEntity
    list213133(input: ListEntityInput): GenericEntity
    get213133(id: String): GenericEntity
    delete213133(id: String): GenericEntity
    update213133(entity: JSON): GenericEntity
    autoComplete213133(input: AutoCompleteByEntityInput): AutoCompleteResponse
    addToMyList213133(input: CustomActionArgs): GenericEntity
    requestAVisit213133(input: CustomActionArgs): GenericEntity

    # HcapScore
    add213333(input: AddEntityInput): GenericEntity
    list213333(input: ListEntityInput): GenericEntity
    get213333(id: String): GenericEntity
    delete213333(id: String): GenericEntity
    update213333(entity: JSON): GenericEntity
    autoComplete213333(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # UploadFile
    add213334(input: AddEntityInput): GenericEntity
    list213334(input: ListEntityInput): GenericEntity
    get213334(id: String): GenericEntity
    delete213334(id: String): GenericEntity
    update213334(entity: JSON): GenericEntity
    autoComplete213334(input: AutoCompleteByEntityInput): AutoCompleteResponse

    # UploadedBy
    add213335(input: AddEntityInput): GenericEntity
    list213335(input: ListEntityInput): GenericEntity
    get213335(id: String): GenericEntity
    delete213335(id: String): GenericEntity
    update213335(entity: JSON): GenericEntity
    autoComplete213335(input: AutoCompleteByEntityInput): AutoCompleteResponse
  }
`;
