import type { CrmCompany } from '@app/common/types/crm-company';
import type { CrmCompanyCreateInput } from '@app/common/types/crm-company-create-input';
import type { CrmCompanyUpdateInput } from '@app/common/types/crm-company-update-input';
import type { CrmContact } from '@app/common/types/crm-contact';
import type { CrmContactCreateInput } from '@app/common/types/crm-contact-create-input';
import type { CrmContactUpdateInput } from '@app/common/types/crm-contact-update-input';
import type { CrmDeal } from '@app/common/types/crm-deal';
import type { CrmDealCreateInput } from '@app/common/types/crm-deal-create-input';
import type { CrmDealUpdateInput } from '@app/common/types/crm-deal-update-input';
import type { CrmLead } from '@app/common/types/crm-lead';
import type { CrmLeadCreateInput } from '@app/common/types/crm-lead-create-input';
import type { CrmLeadUpdateInput } from '@app/common/types/crm-lead-update-input';
import type { CrmListOptions } from '@app/common/types/crm-list-options';
import type { CrmListResult } from '@app/common/types/crm-list-result';

/**
 * Provider-agnostic CRM contract. Concrete vendors extend this class and implement all abstract members.
 */
export abstract class AbstractCrmClient {
  /**
   * Human-readable provider key (e.g. bitrix24, hubspot) for logs and configuration.
   */
  public abstract getProviderId(): string;

  /**
   * Lists contacts with optional pagination and search.
   */
  public abstract listContacts(
    options: CrmListOptions,
  ): Promise<CrmListResult<CrmContact>>;

  /**
   * Loads a single contact by provider-native identifier.
   */
  public abstract getContact(contactId: string): Promise<CrmContact | null>;

  /**
   * Creates a new contact.
   */
  public abstract createContact(
    input: CrmContactCreateInput,
  ): Promise<CrmContact>;

  /**
   * Applies a partial update to an existing contact.
   */
  public abstract updateContact(
    contactId: string,
    input: CrmContactUpdateInput,
  ): Promise<CrmContact>;

  /**
   * Lists companies with optional pagination and search.
   */
  public abstract listCompanies(
    options: CrmListOptions,
  ): Promise<CrmListResult<CrmCompany>>;

  /**
   * Loads a single company by provider-native identifier.
   */
  public abstract getCompany(companyId: string): Promise<CrmCompany | null>;

  /**
   * Creates a new company.
   */
  public abstract createCompany(
    input: CrmCompanyCreateInput,
  ): Promise<CrmCompany>;

  /**
   * Applies a partial update to an existing company.
   */
  public abstract updateCompany(
    companyId: string,
    input: CrmCompanyUpdateInput,
  ): Promise<CrmCompany>;

  /**
   * Lists deals with optional pagination and search.
   */
  public abstract listDeals(
    options: CrmListOptions,
  ): Promise<CrmListResult<CrmDeal>>;

  /**
   * Loads a single deal by provider-native identifier.
   */
  public abstract getDeal(dealId: string): Promise<CrmDeal | null>;

  /**
   * Creates a new deal.
   */
  public abstract createDeal(input: CrmDealCreateInput): Promise<CrmDeal>;

  /**
   * Applies a partial update to an existing deal.
   */
  public abstract updateDeal(
    dealId: string,
    input: CrmDealUpdateInput,
  ): Promise<CrmDeal>;

  /**
   * Lists leads with optional pagination and search.
   */
  public abstract listLeads(
    options: CrmListOptions,
  ): Promise<CrmListResult<CrmLead>>;

  /**
   * Loads a single lead by provider-native identifier.
   */
  public abstract getLead(leadId: string): Promise<CrmLead | null>;

  /**
   * Creates a new lead.
   */
  public abstract createLead(input: CrmLeadCreateInput): Promise<CrmLead>;

  /**
   * Applies a partial update to an existing lead.
   */
  public abstract updateLead(
    leadId: string,
    input: CrmLeadUpdateInput,
  ): Promise<CrmLead>;
}
