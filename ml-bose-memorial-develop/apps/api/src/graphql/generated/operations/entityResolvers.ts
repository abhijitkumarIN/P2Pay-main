import { IResolvers } from 'apollo-server-express';
import { DispatchCustomActionResults } from '../../../types';

export const entityResolvers: IResolvers = {
  Query: {
    // PcpMail Resolvers
    add13433: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api13433.addEntity(input.entity, input.parent),
    }),
    list13433: (_parent, args, { dataSources }) => ({ data: dataSources.api13433.listEntity(args) }),
    get13433: (_parent, { id }, { dataSources }) => ({ data: dataSources.api13433.getEntity(id) }),
    delete13433: (_parent, { id }, { dataSources }) => ({ data: dataSources.api13433.deleteEntity(id) }),
    update13433: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api13433.updateEntity(entity),
    }),
    autoComplete13433: (_parent, params, { dataSources }) => ({
      data: dataSources.api13433.getAutoCompleteValues(params.input),
    }),

    // PrimaryCareLastName Resolvers
    add59127: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api59127.addEntity(input.entity, input.parent),
    }),
    list59127: (_parent, args, { dataSources }) => ({ data: dataSources.api59127.listEntity(args) }),
    get59127: (_parent, { id }, { dataSources }) => ({ data: dataSources.api59127.getEntity(id) }),
    delete59127: (_parent, { id }, { dataSources }) => ({ data: dataSources.api59127.deleteEntity(id) }),
    update59127: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api59127.updateEntity(entity),
    }),
    autoComplete59127: (_parent, params, { dataSources }) => ({
      data: dataSources.api59127.getAutoCompleteValues(params.input),
    }),

    // Timestamp Resolvers
    add200996: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api200996.addEntity(input.entity, input.parent),
    }),
    list200996: (_parent, args, { dataSources }) => ({ data: dataSources.api200996.listEntity(args) }),
    get200996: (_parent, { id }, { dataSources }) => ({ data: dataSources.api200996.getEntity(id) }),
    delete200996: (_parent, { id }, { dataSources }) => ({ data: dataSources.api200996.deleteEntity(id) }),
    update200996: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api200996.updateEntity(entity),
    }),
    autoComplete200996: (_parent, params, { dataSources }) => ({
      data: dataSources.api200996.getAutoCompleteValues(params.input),
    }),

    // MemberName Resolvers
    add200998: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api200998.addEntity(input.entity, input.parent),
    }),
    list200998: (_parent, args, { dataSources }) => ({ data: dataSources.api200998.listEntity(args) }),
    get200998: (_parent, { id }, { dataSources }) => ({ data: dataSources.api200998.getEntity(id) }),
    delete200998: (_parent, { id }, { dataSources }) => ({ data: dataSources.api200998.deleteEntity(id) }),
    update200998: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api200998.updateEntity(entity),
    }),
    autoComplete200998: (_parent, params, { dataSources }) => ({
      data: dataSources.api200998.getAutoCompleteValues(params.input),
    }),
    dialPhone200998: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api200998.customAction_dialPhone(params.input),
    sendInvoiceCopy200998: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api200998.customAction_sendInvoiceCopy(params.input),

    // BusinessPhone Resolvers
    add201583: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201583.addEntity(input.entity, input.parent),
    }),
    list201583: (_parent, args, { dataSources }) => ({ data: dataSources.api201583.listEntity(args) }),
    get201583: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201583.getEntity(id) }),
    delete201583: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201583.deleteEntity(id) }),
    update201583: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201583.updateEntity(entity),
    }),
    autoComplete201583: (_parent, params, { dataSources }) => ({
      data: dataSources.api201583.getAutoCompleteValues(params.input),
    }),

    // Gender Resolvers
    add201584: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201584.addEntity(input.entity, input.parent),
    }),
    list201584: (_parent, args, { dataSources }) => ({ data: dataSources.api201584.listEntity(args) }),
    get201584: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201584.getEntity(id) }),
    delete201584: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201584.deleteEntity(id) }),
    update201584: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201584.updateEntity(entity),
    }),
    autoComplete201584: (_parent, params, { dataSources }) => ({
      data: dataSources.api201584.getAutoCompleteValues(params.input),
    }),

    // PrimaryCareId Resolvers
    add201585: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201585.addEntity(input.entity, input.parent),
    }),
    list201585: (_parent, args, { dataSources }) => ({ data: dataSources.api201585.listEntity(args) }),
    get201585: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201585.getEntity(id) }),
    delete201585: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201585.deleteEntity(id) }),
    update201585: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201585.updateEntity(entity),
    }),
    autoComplete201585: (_parent, params, { dataSources }) => ({
      data: dataSources.api201585.getAutoCompleteValues(params.input),
    }),

    // CellPhone Resolvers
    add201586: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201586.addEntity(input.entity, input.parent),
    }),
    list201586: (_parent, args, { dataSources }) => ({ data: dataSources.api201586.listEntity(args) }),
    get201586: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201586.getEntity(id) }),
    delete201586: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201586.deleteEntity(id) }),
    update201586: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201586.updateEntity(entity),
    }),
    autoComplete201586: (_parent, params, { dataSources }) => ({
      data: dataSources.api201586.getAutoCompleteValues(params.input),
    }),

    // AptNo Resolvers
    add201587: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201587.addEntity(input.entity, input.parent),
    }),
    list201587: (_parent, args, { dataSources }) => ({ data: dataSources.api201587.listEntity(args) }),
    get201587: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201587.getEntity(id) }),
    delete201587: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201587.deleteEntity(id) }),
    update201587: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201587.updateEntity(entity),
    }),
    autoComplete201587: (_parent, params, { dataSources }) => ({
      data: dataSources.api201587.getAutoCompleteValues(params.input),
    }),

    // MemberId Resolvers
    add201588: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201588.addEntity(input.entity, input.parent),
    }),
    list201588: (_parent, args, { dataSources }) => ({ data: dataSources.api201588.listEntity(args) }),
    get201588: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201588.getEntity(id) }),
    delete201588: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201588.deleteEntity(id) }),
    update201588: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201588.updateEntity(entity),
    }),
    autoComplete201588: (_parent, params, { dataSources }) => ({
      data: dataSources.api201588.getAutoCompleteValues(params.input),
    }),

    // Address Resolvers
    add201589: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201589.addEntity(input.entity, input.parent),
    }),
    list201589: (_parent, args, { dataSources }) => ({ data: dataSources.api201589.listEntity(args) }),
    get201589: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201589.getEntity(id) }),
    delete201589: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201589.deleteEntity(id) }),
    update201589: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201589.updateEntity(entity),
    }),
    autoComplete201589: (_parent, params, { dataSources }) => ({
      data: dataSources.api201589.getAutoCompleteValues(params.input),
    }),

    // ZipCode Resolvers
    add201590: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201590.addEntity(input.entity, input.parent),
    }),
    list201590: (_parent, args, { dataSources }) => ({ data: dataSources.api201590.listEntity(args) }),
    get201590: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201590.getEntity(id) }),
    delete201590: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201590.deleteEntity(id) }),
    update201590: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201590.updateEntity(entity),
    }),
    autoComplete201590: (_parent, params, { dataSources }) => ({
      data: dataSources.api201590.getAutoCompleteValues(params.input),
    }),

    // Dob Resolvers
    add201591: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201591.addEntity(input.entity, input.parent),
    }),
    list201591: (_parent, args, { dataSources }) => ({ data: dataSources.api201591.listEntity(args) }),
    get201591: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201591.getEntity(id) }),
    delete201591: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201591.deleteEntity(id) }),
    update201591: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201591.updateEntity(entity),
    }),
    autoComplete201591: (_parent, params, { dataSources }) => ({
      data: dataSources.api201591.getAutoCompleteValues(params.input),
    }),

    // BalanceDue Resolvers
    add201592: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201592.addEntity(input.entity, input.parent),
    }),
    list201592: (_parent, args, { dataSources }) => ({ data: dataSources.api201592.listEntity(args) }),
    get201592: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201592.getEntity(id) }),
    delete201592: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201592.deleteEntity(id) }),
    update201592: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201592.updateEntity(entity),
    }),
    autoComplete201592: (_parent, params, { dataSources }) => ({
      data: dataSources.api201592.getAutoCompleteValues(params.input),
    }),

    // PrimaryCareName Resolvers
    add201593: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201593.addEntity(input.entity, input.parent),
    }),
    list201593: (_parent, args, { dataSources }) => ({ data: dataSources.api201593.listEntity(args) }),
    get201593: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201593.getEntity(id) }),
    delete201593: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201593.deleteEntity(id) }),
    update201593: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201593.updateEntity(entity),
    }),
    autoComplete201593: (_parent, params, { dataSources }) => ({
      data: dataSources.api201593.getAutoCompleteValues(params.input),
    }),

    // Title Resolvers
    add201594: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201594.addEntity(input.entity, input.parent),
    }),
    list201594: (_parent, args, { dataSources }) => ({ data: dataSources.api201594.listEntity(args) }),
    get201594: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201594.getEntity(id) }),
    delete201594: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201594.deleteEntity(id) }),
    update201594: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201594.updateEntity(entity),
    }),
    autoComplete201594: (_parent, params, { dataSources }) => ({
      data: dataSources.api201594.getAutoCompleteValues(params.input),
    }),

    // Telephone Resolvers
    add201595: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201595.addEntity(input.entity, input.parent),
    }),
    list201595: (_parent, args, { dataSources }) => ({ data: dataSources.api201595.listEntity(args) }),
    get201595: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201595.getEntity(id) }),
    delete201595: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201595.deleteEntity(id) }),
    update201595: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201595.updateEntity(entity),
    }),
    autoComplete201595: (_parent, params, { dataSources }) => ({
      data: dataSources.api201595.getAutoCompleteValues(params.input),
    }),

    // PcpzipCode Resolvers
    add201596: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201596.addEntity(input.entity, input.parent),
    }),
    list201596: (_parent, args, { dataSources }) => ({ data: dataSources.api201596.listEntity(args) }),
    get201596: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201596.getEntity(id) }),
    delete201596: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201596.deleteEntity(id) }),
    update201596: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201596.updateEntity(entity),
    }),
    autoComplete201596: (_parent, params, { dataSources }) => ({
      data: dataSources.api201596.getAutoCompleteValues(params.input),
    }),

    // PcpStreetAddress Resolvers
    add201597: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201597.addEntity(input.entity, input.parent),
    }),
    list201597: (_parent, args, { dataSources }) => ({ data: dataSources.api201597.listEntity(args) }),
    get201597: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201597.getEntity(id) }),
    delete201597: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201597.deleteEntity(id) }),
    update201597: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201597.updateEntity(entity),
    }),
    autoComplete201597: (_parent, params, { dataSources }) => ({
      data: dataSources.api201597.getAutoCompleteValues(params.input),
    }),

    // PcpSuite Resolvers
    add201598: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201598.addEntity(input.entity, input.parent),
    }),
    list201598: (_parent, args, { dataSources }) => ({ data: dataSources.api201598.listEntity(args) }),
    get201598: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201598.getEntity(id) }),
    delete201598: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201598.deleteEntity(id) }),
    update201598: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201598.updateEntity(entity),
    }),
    autoComplete201598: (_parent, params, { dataSources }) => ({
      data: dataSources.api201598.getAutoCompleteValues(params.input),
    }),

    // Npi Resolvers
    add201599: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201599.addEntity(input.entity, input.parent),
    }),
    list201599: (_parent, args, { dataSources }) => ({ data: dataSources.api201599.listEntity(args) }),
    get201599: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201599.getEntity(id) }),
    delete201599: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201599.deleteEntity(id) }),
    update201599: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201599.updateEntity(entity),
    }),
    autoComplete201599: (_parent, params, { dataSources }) => ({
      data: dataSources.api201599.getAutoCompleteValues(params.input),
    }),

    // OfficeHours Resolvers
    add201600: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201600.addEntity(input.entity, input.parent),
    }),
    list201600: (_parent, args, { dataSources }) => ({ data: dataSources.api201600.listEntity(args) }),
    get201600: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201600.getEntity(id) }),
    delete201600: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201600.deleteEntity(id) }),
    update201600: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201600.updateEntity(entity),
    }),
    autoComplete201600: (_parent, params, { dataSources }) => ({
      data: dataSources.api201600.getAutoCompleteValues(params.input),
    }),

    // BasicFee Resolvers
    add201601: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201601.addEntity(input.entity, input.parent),
    }),
    list201601: (_parent, args, { dataSources }) => ({ data: dataSources.api201601.listEntity(args) }),
    get201601: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201601.getEntity(id) }),
    delete201601: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201601.deleteEntity(id) }),
    update201601: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201601.updateEntity(entity),
    }),
    autoComplete201601: (_parent, params, { dataSources }) => ({
      data: dataSources.api201601.getAutoCompleteValues(params.input),
    }),

    // SpecialistFee Resolvers
    add201602: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201602.addEntity(input.entity, input.parent),
    }),
    list201602: (_parent, args, { dataSources }) => ({ data: dataSources.api201602.listEntity(args) }),
    get201602: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201602.getEntity(id) }),
    delete201602: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201602.deleteEntity(id) }),
    update201602: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201602.updateEntity(entity),
    }),
    autoComplete201602: (_parent, params, { dataSources }) => ({
      data: dataSources.api201602.getAutoCompleteValues(params.input),
    }),

    // Medicare Resolvers
    add201603: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201603.addEntity(input.entity, input.parent),
    }),
    list201603: (_parent, args, { dataSources }) => ({ data: dataSources.api201603.listEntity(args) }),
    get201603: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201603.getEntity(id) }),
    delete201603: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201603.deleteEntity(id) }),
    update201603: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201603.updateEntity(entity),
    }),
    autoComplete201603: (_parent, params, { dataSources }) => ({
      data: dataSources.api201603.getAutoCompleteValues(params.input),
    }),

    // CommercialInsurance Resolvers
    add201605: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201605.addEntity(input.entity, input.parent),
    }),
    list201605: (_parent, args, { dataSources }) => ({ data: dataSources.api201605.listEntity(args) }),
    get201605: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201605.getEntity(id) }),
    delete201605: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201605.deleteEntity(id) }),
    update201605: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201605.updateEntity(entity),
    }),
    autoComplete201605: (_parent, params, { dataSources }) => ({
      data: dataSources.api201605.getAutoCompleteValues(params.input),
    }),

    // P2P Resolvers
    add201606: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201606.addEntity(input.entity, input.parent),
    }),
    list201606: (_parent, args, { dataSources }) => ({ data: dataSources.api201606.listEntity(args) }),
    get201606: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201606.getEntity(id) }),
    delete201606: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201606.deleteEntity(id) }),
    update201606: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201606.updateEntity(entity),
    }),
    autoComplete201606: (_parent, params, { dataSources }) => ({
      data: dataSources.api201606.getAutoCompleteValues(params.input),
    }),

    // RegistrationDate Resolvers
    add201607: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201607.addEntity(input.entity, input.parent),
    }),
    list201607: (_parent, args, { dataSources }) => ({ data: dataSources.api201607.listEntity(args) }),
    get201607: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201607.getEntity(id) }),
    delete201607: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201607.deleteEntity(id) }),
    update201607: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201607.updateEntity(entity),
    }),
    autoComplete201607: (_parent, params, { dataSources }) => ({
      data: dataSources.api201607.getAutoCompleteValues(params.input),
    }),

    // DonorId Resolvers
    add201608: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201608.addEntity(input.entity, input.parent),
    }),
    list201608: (_parent, args, { dataSources }) => ({ data: dataSources.api201608.listEntity(args) }),
    get201608: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201608.getEntity(id) }),
    delete201608: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201608.deleteEntity(id) }),
    update201608: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201608.updateEntity(entity),
    }),
    autoComplete201608: (_parent, params, { dataSources }) => ({
      data: dataSources.api201608.getAutoCompleteValues(params.input),
    }),

    // PreferredMember Resolvers
    add201618: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201618.addEntity(input.entity, input.parent),
    }),
    list201618: (_parent, args, { dataSources }) => ({ data: dataSources.api201618.listEntity(args) }),
    get201618: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201618.getEntity(id) }),
    delete201618: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201618.deleteEntity(id) }),
    update201618: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201618.updateEntity(entity),
    }),
    autoComplete201618: (_parent, params, { dataSources }) => ({
      data: dataSources.api201618.getAutoCompleteValues(params.input),
    }),
    dialPhone201618: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201618.customAction_dialPhone(params.input),
    sendInvoiceCopy201618: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201618.customAction_sendInvoiceCopy(params.input),

    // BusinessName Resolvers
    add201619: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201619.addEntity(input.entity, input.parent),
    }),
    list201619: (_parent, args, { dataSources }) => ({ data: dataSources.api201619.listEntity(args) }),
    get201619: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201619.getEntity(id) }),
    delete201619: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201619.deleteEntity(id) }),
    update201619: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201619.updateEntity(entity),
    }),
    autoComplete201619: (_parent, params, { dataSources }) => ({
      data: dataSources.api201619.getAutoCompleteValues(params.input),
    }),

    // DonorPhoneNumber Resolvers
    add201620: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201620.addEntity(input.entity, input.parent),
    }),
    list201620: (_parent, args, { dataSources }) => ({ data: dataSources.api201620.listEntity(args) }),
    get201620: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201620.getEntity(id) }),
    delete201620: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201620.deleteEntity(id) }),
    update201620: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201620.updateEntity(entity),
    }),
    autoComplete201620: (_parent, params, { dataSources }) => ({
      data: dataSources.api201620.getAutoCompleteValues(params.input),
    }),

    // MaxPerTransaction Resolvers
    add201621: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201621.addEntity(input.entity, input.parent),
    }),
    list201621: (_parent, args, { dataSources }) => ({ data: dataSources.api201621.listEntity(args) }),
    get201621: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201621.getEntity(id) }),
    delete201621: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201621.deleteEntity(id) }),
    update201621: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201621.updateEntity(entity),
    }),
    autoComplete201621: (_parent, params, { dataSources }) => ({
      data: dataSources.api201621.getAutoCompleteValues(params.input),
    }),

    // DonorName Resolvers
    add201622: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201622.addEntity(input.entity, input.parent),
    }),
    list201622: (_parent, args, { dataSources }) => ({ data: dataSources.api201622.listEntity(args) }),
    get201622: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201622.getEntity(id) }),
    delete201622: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201622.deleteEntity(id) }),
    update201622: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201622.updateEntity(entity),
    }),
    autoComplete201622: (_parent, params, { dataSources }) => ({
      data: dataSources.api201622.getAutoCompleteValues(params.input),
    }),

    // PaidMembers Resolvers
    add201623: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201623.addEntity(input.entity, input.parent),
    }),
    list201623: (_parent, args, { dataSources }) => ({ data: dataSources.api201623.listEntity(args) }),
    get201623: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201623.getEntity(id) }),
    delete201623: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201623.deleteEntity(id) }),
    update201623: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201623.updateEntity(entity),
    }),
    autoComplete201623: (_parent, params, { dataSources }) => ({
      data: dataSources.api201623.getAutoCompleteValues(params.input),
    }),
    dialPhone201623: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201623.customAction_dialPhone(params.input),
    sendInvoiceCopy201623: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201623.customAction_sendInvoiceCopy(params.input),

    // DonorBusiness Resolvers
    add201624: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201624.addEntity(input.entity, input.parent),
    }),
    list201624: (_parent, args, { dataSources }) => ({ data: dataSources.api201624.listEntity(args) }),
    get201624: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201624.getEntity(id) }),
    delete201624: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201624.deleteEntity(id) }),
    update201624: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201624.updateEntity(entity),
    }),
    autoComplete201624: (_parent, params, { dataSources }) => ({
      data: dataSources.api201624.getAutoCompleteValues(params.input),
    }),

    // DonorStreetAddress Resolvers
    add201625: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201625.addEntity(input.entity, input.parent),
    }),
    list201625: (_parent, args, { dataSources }) => ({ data: dataSources.api201625.listEntity(args) }),
    get201625: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201625.getEntity(id) }),
    delete201625: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201625.deleteEntity(id) }),
    update201625: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201625.updateEntity(entity),
    }),
    autoComplete201625: (_parent, params, { dataSources }) => ({
      data: dataSources.api201625.getAutoCompleteValues(params.input),
    }),

    // DonorSuite Resolvers
    add201626: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201626.addEntity(input.entity, input.parent),
    }),
    list201626: (_parent, args, { dataSources }) => ({ data: dataSources.api201626.listEntity(args) }),
    get201626: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201626.getEntity(id) }),
    delete201626: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201626.deleteEntity(id) }),
    update201626: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201626.updateEntity(entity),
    }),
    autoComplete201626: (_parent, params, { dataSources }) => ({
      data: dataSources.api201626.getAutoCompleteValues(params.input),
    }),

    // MinPerTransaction Resolvers
    add201627: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201627.addEntity(input.entity, input.parent),
    }),
    list201627: (_parent, args, { dataSources }) => ({ data: dataSources.api201627.listEntity(args) }),
    get201627: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201627.getEntity(id) }),
    delete201627: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201627.deleteEntity(id) }),
    update201627: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201627.updateEntity(entity),
    }),
    autoComplete201627: (_parent, params, { dataSources }) => ({
      data: dataSources.api201627.getAutoCompleteValues(params.input),
    }),

    // DonorCurrentBalance Resolvers
    add201628: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201628.addEntity(input.entity, input.parent),
    }),
    list201628: (_parent, args, { dataSources }) => ({ data: dataSources.api201628.listEntity(args) }),
    get201628: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201628.getEntity(id) }),
    delete201628: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201628.deleteEntity(id) }),
    update201628: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201628.updateEntity(entity),
    }),
    autoComplete201628: (_parent, params, { dataSources }) => ({
      data: dataSources.api201628.getAutoCompleteValues(params.input),
    }),

    // DonorZip Resolvers
    add201629: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201629.addEntity(input.entity, input.parent),
    }),
    list201629: (_parent, args, { dataSources }) => ({ data: dataSources.api201629.listEntity(args) }),
    get201629: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201629.getEntity(id) }),
    delete201629: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201629.deleteEntity(id) }),
    update201629: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201629.updateEntity(entity),
    }),
    autoComplete201629: (_parent, params, { dataSources }) => ({
      data: dataSources.api201629.getAutoCompleteValues(params.input),
    }),

    // DonorFax Resolvers
    add201630: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201630.addEntity(input.entity, input.parent),
    }),
    list201630: (_parent, args, { dataSources }) => ({ data: dataSources.api201630.listEntity(args) }),
    get201630: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201630.getEntity(id) }),
    delete201630: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201630.deleteEntity(id) }),
    update201630: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201630.updateEntity(entity),
    }),
    autoComplete201630: (_parent, params, { dataSources }) => ({
      data: dataSources.api201630.getAutoCompleteValues(params.input),
    }),

    // DonorSpentYtd Resolvers
    add201631: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201631.addEntity(input.entity, input.parent),
    }),
    list201631: (_parent, args, { dataSources }) => ({ data: dataSources.api201631.listEntity(args) }),
    get201631: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201631.getEntity(id) }),
    delete201631: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201631.deleteEntity(id) }),
    update201631: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201631.updateEntity(entity),
    }),
    autoComplete201631: (_parent, params, { dataSources }) => ({
      data: dataSources.api201631.getAutoCompleteValues(params.input),
    }),

    // DonorCommitment Resolvers
    add201632: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201632.addEntity(input.entity, input.parent),
    }),
    list201632: (_parent, args, { dataSources }) => ({ data: dataSources.api201632.listEntity(args) }),
    get201632: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201632.getEntity(id) }),
    delete201632: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201632.deleteEntity(id) }),
    update201632: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201632.updateEntity(entity),
    }),
    autoComplete201632: (_parent, params, { dataSources }) => ({
      data: dataSources.api201632.getAutoCompleteValues(params.input),
    }),

    // TransactionId Resolvers
    add201633: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201633.addEntity(input.entity, input.parent),
    }),
    list201633: (_parent, args, { dataSources }) => ({ data: dataSources.api201633.listEntity(args) }),
    get201633: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201633.getEntity(id) }),
    delete201633: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201633.deleteEntity(id) }),
    update201633: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201633.updateEntity(entity),
    }),
    autoComplete201633: (_parent, params, { dataSources }) => ({
      data: dataSources.api201633.getAutoCompleteValues(params.input),
    }),

    // MemberAmountPaid Resolvers
    add201634: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201634.addEntity(input.entity, input.parent),
    }),
    list201634: (_parent, args, { dataSources }) => ({ data: dataSources.api201634.listEntity(args) }),
    get201634: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201634.getEntity(id) }),
    delete201634: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201634.deleteEntity(id) }),
    update201634: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201634.updateEntity(entity),
    }),
    autoComplete201634: (_parent, params, { dataSources }) => ({
      data: dataSources.api201634.getAutoCompleteValues(params.input),
    }),

    // TransactionMember Resolvers
    add201635: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201635.addEntity(input.entity, input.parent),
    }),
    list201635: (_parent, args, { dataSources }) => ({ data: dataSources.api201635.listEntity(args) }),
    get201635: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201635.getEntity(id) }),
    delete201635: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201635.deleteEntity(id) }),
    update201635: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201635.updateEntity(entity),
    }),
    autoComplete201635: (_parent, params, { dataSources }) => ({
      data: dataSources.api201635.getAutoCompleteValues(params.input),
    }),
    dialPhone201635: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201635.customAction_dialPhone(params.input),
    sendInvoiceCopy201635: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api201635.customAction_sendInvoiceCopy(params.input),

    // TransactionDonor Resolvers
    add201636: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201636.addEntity(input.entity, input.parent),
    }),
    list201636: (_parent, args, { dataSources }) => ({ data: dataSources.api201636.listEntity(args) }),
    get201636: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201636.getEntity(id) }),
    delete201636: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201636.deleteEntity(id) }),
    update201636: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201636.updateEntity(entity),
    }),
    autoComplete201636: (_parent, params, { dataSources }) => ({
      data: dataSources.api201636.getAutoCompleteValues(params.input),
    }),

    // InvoiceId Resolvers
    add201637: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201637.addEntity(input.entity, input.parent),
    }),
    list201637: (_parent, args, { dataSources }) => ({ data: dataSources.api201637.listEntity(args) }),
    get201637: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201637.getEntity(id) }),
    delete201637: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201637.deleteEntity(id) }),
    update201637: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201637.updateEntity(entity),
    }),
    autoComplete201637: (_parent, params, { dataSources }) => ({
      data: dataSources.api201637.getAutoCompleteValues(params.input),
    }),

    // TransactionDate Resolvers
    add201638: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201638.addEntity(input.entity, input.parent),
    }),
    list201638: (_parent, args, { dataSources }) => ({ data: dataSources.api201638.listEntity(args) }),
    get201638: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201638.getEntity(id) }),
    delete201638: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201638.deleteEntity(id) }),
    update201638: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201638.updateEntity(entity),
    }),
    autoComplete201638: (_parent, params, { dataSources }) => ({
      data: dataSources.api201638.getAutoCompleteValues(params.input),
    }),

    // TransactionAmount Resolvers
    add201639: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201639.addEntity(input.entity, input.parent),
    }),
    list201639: (_parent, args, { dataSources }) => ({ data: dataSources.api201639.listEntity(args) }),
    get201639: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201639.getEntity(id) }),
    delete201639: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201639.deleteEntity(id) }),
    update201639: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201639.updateEntity(entity),
    }),
    autoComplete201639: (_parent, params, { dataSources }) => ({
      data: dataSources.api201639.getAutoCompleteValues(params.input),
    }),

    // TransactionPcp Resolvers
    add201640: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201640.addEntity(input.entity, input.parent),
    }),
    list201640: (_parent, args, { dataSources }) => ({ data: dataSources.api201640.listEntity(args) }),
    get201640: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201640.getEntity(id) }),
    delete201640: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201640.deleteEntity(id) }),
    update201640: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201640.updateEntity(entity),
    }),
    autoComplete201640: (_parent, params, { dataSources }) => ({
      data: dataSources.api201640.getAutoCompleteValues(params.input),
    }),

    // TransactionDonationAmount Resolvers
    add201641: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201641.addEntity(input.entity, input.parent),
    }),
    list201641: (_parent, args, { dataSources }) => ({ data: dataSources.api201641.listEntity(args) }),
    get201641: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201641.getEntity(id) }),
    delete201641: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201641.deleteEntity(id) }),
    update201641: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201641.updateEntity(entity),
    }),
    autoComplete201641: (_parent, params, { dataSources }) => ({
      data: dataSources.api201641.getAutoCompleteValues(params.input),
    }),

    // MemberPaidAmount Resolvers
    add201642: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201642.addEntity(input.entity, input.parent),
    }),
    list201642: (_parent, args, { dataSources }) => ({ data: dataSources.api201642.listEntity(args) }),
    get201642: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201642.getEntity(id) }),
    delete201642: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201642.deleteEntity(id) }),
    update201642: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201642.updateEntity(entity),
    }),
    autoComplete201642: (_parent, params, { dataSources }) => ({
      data: dataSources.api201642.getAutoCompleteValues(params.input),
    }),

    // InvoiceAmount Resolvers
    add201643: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201643.addEntity(input.entity, input.parent),
    }),
    list201643: (_parent, args, { dataSources }) => ({ data: dataSources.api201643.listEntity(args) }),
    get201643: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201643.getEntity(id) }),
    delete201643: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201643.deleteEntity(id) }),
    update201643: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201643.updateEntity(entity),
    }),
    autoComplete201643: (_parent, params, { dataSources }) => ({
      data: dataSources.api201643.getAutoCompleteValues(params.input),
    }),

    // TotalDonorPayments Resolvers
    add201644: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201644.addEntity(input.entity, input.parent),
    }),
    list201644: (_parent, args, { dataSources }) => ({ data: dataSources.api201644.listEntity(args) }),
    get201644: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201644.getEntity(id) }),
    delete201644: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201644.deleteEntity(id) }),
    update201644: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201644.updateEntity(entity),
    }),
    autoComplete201644: (_parent, params, { dataSources }) => ({
      data: dataSources.api201644.getAutoCompleteValues(params.input),
    }),

    // InvoiceNumber Resolvers
    add201736: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api201736.addEntity(input.entity, input.parent),
    }),
    list201736: (_parent, args, { dataSources }) => ({ data: dataSources.api201736.listEntity(args) }),
    get201736: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201736.getEntity(id) }),
    delete201736: (_parent, { id }, { dataSources }) => ({ data: dataSources.api201736.deleteEntity(id) }),
    update201736: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api201736.updateEntity(entity),
    }),
    autoComplete201736: (_parent, params, { dataSources }) => ({
      data: dataSources.api201736.getAutoCompleteValues(params.input),
    }),

    // MembersPcp Resolvers
    add202046: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api202046.addEntity(input.entity, input.parent),
    }),
    list202046: (_parent, args, { dataSources }) => ({ data: dataSources.api202046.listEntity(args) }),
    get202046: (_parent, { id }, { dataSources }) => ({ data: dataSources.api202046.getEntity(id) }),
    delete202046: (_parent, { id }, { dataSources }) => ({ data: dataSources.api202046.deleteEntity(id) }),
    update202046: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api202046.updateEntity(entity),
    }),
    autoComplete202046: (_parent, params, { dataSources }) => ({
      data: dataSources.api202046.getAutoCompleteValues(params.input),
    }),

    // MembersTransactions Resolvers
    add202047: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api202047.addEntity(input.entity, input.parent),
    }),
    list202047: (_parent, args, { dataSources }) => ({ data: dataSources.api202047.listEntity(args) }),
    get202047: (_parent, { id }, { dataSources }) => ({ data: dataSources.api202047.getEntity(id) }),
    delete202047: (_parent, { id }, { dataSources }) => ({ data: dataSources.api202047.deleteEntity(id) }),
    update202047: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api202047.updateEntity(entity),
    }),
    autoComplete202047: (_parent, params, { dataSources }) => ({
      data: dataSources.api202047.getAutoCompleteValues(params.input),
    }),

    // PatientsPcp Resolvers
    add206779: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api206779.addEntity(input.entity, input.parent),
    }),
    list206779: (_parent, args, { dataSources }) => ({ data: dataSources.api206779.listEntity(args) }),
    get206779: (_parent, { id }, { dataSources }) => ({ data: dataSources.api206779.getEntity(id) }),
    delete206779: (_parent, { id }, { dataSources }) => ({ data: dataSources.api206779.deleteEntity(id) }),
    update206779: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api206779.updateEntity(entity),
    }),
    autoComplete206779: (_parent, params, { dataSources }) => ({
      data: dataSources.api206779.getAutoCompleteValues(params.input),
    }),

    // PcpMember Resolvers
    add206780: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api206780.addEntity(input.entity, input.parent),
    }),
    list206780: (_parent, args, { dataSources }) => ({ data: dataSources.api206780.listEntity(args) }),
    get206780: (_parent, { id }, { dataSources }) => ({ data: dataSources.api206780.getEntity(id) }),
    delete206780: (_parent, { id }, { dataSources }) => ({ data: dataSources.api206780.deleteEntity(id) }),
    update206780: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api206780.updateEntity(entity),
    }),
    autoComplete206780: (_parent, params, { dataSources }) => ({
      data: dataSources.api206780.getAutoCompleteValues(params.input),
    }),
    dialPhone206780: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api206780.customAction_dialPhone(params.input),
    sendInvoiceCopy206780: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api206780.customAction_sendInvoiceCopy(params.input),

    // EligiblePcp Resolvers
    add213133: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api213133.addEntity(input.entity, input.parent),
    }),
    list213133: (_parent, args, { dataSources }) => ({ data: dataSources.api213133.listEntity(args) }),
    get213133: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213133.getEntity(id) }),
    delete213133: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213133.deleteEntity(id) }),
    update213133: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api213133.updateEntity(entity),
    }),
    autoComplete213133: (_parent, params, { dataSources }) => ({
      data: dataSources.api213133.getAutoCompleteValues(params.input),
    }),
    addToMyList213133: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api213133.customAction_addToMyList(params.input),
    requestAVisit213133: (_parent, params, { dataSources }): DispatchCustomActionResults =>
      dataSources.api213133.customAction_requestAVisit(params.input),

    // HcapScore Resolvers
    add213333: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api213333.addEntity(input.entity, input.parent),
    }),
    list213333: (_parent, args, { dataSources }) => ({ data: dataSources.api213333.listEntity(args) }),
    get213333: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213333.getEntity(id) }),
    delete213333: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213333.deleteEntity(id) }),
    update213333: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api213333.updateEntity(entity),
    }),
    autoComplete213333: (_parent, params, { dataSources }) => ({
      data: dataSources.api213333.getAutoCompleteValues(params.input),
    }),

    // UploadFile Resolvers
    add213334: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api213334.addEntity(input.entity, input.parent),
    }),
    list213334: (_parent, args, { dataSources }) => ({ data: dataSources.api213334.listEntity(args) }),
    get213334: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213334.getEntity(id) }),
    delete213334: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213334.deleteEntity(id) }),
    update213334: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api213334.updateEntity(entity),
    }),
    autoComplete213334: (_parent, params, { dataSources }) => ({
      data: dataSources.api213334.getAutoCompleteValues(params.input),
    }),

    // UploadedBy Resolvers
    add213335: (_parent, { input }, { dataSources }) => ({
      data: dataSources.api213335.addEntity(input.entity, input.parent),
    }),
    list213335: (_parent, args, { dataSources }) => ({ data: dataSources.api213335.listEntity(args) }),
    get213335: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213335.getEntity(id) }),
    delete213335: (_parent, { id }, { dataSources }) => ({ data: dataSources.api213335.deleteEntity(id) }),
    update213335: (_parent, { entity }, { dataSources }) => ({
      data: dataSources.api213335.updateEntity(entity),
    }),
    autoComplete213335: (_parent, params, { dataSources }) => ({
      data: dataSources.api213335.getAutoCompleteValues(params.input),
    }),
  },
};
