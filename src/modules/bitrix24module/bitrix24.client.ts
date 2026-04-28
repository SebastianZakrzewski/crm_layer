import { Injectable } from '@nestjs/common';
import { AbstractCrmClient } from '@app/common/clients/abstract-crm-client';
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
 * Bitrix24 REST adapter for {@link AbstractCrmClient}. Methods are stubs until wired to Bitrix24 APIs.
 */
@Injectable()
export class Bitrix24Client extends AbstractCrmClient {
  private throwNotImplemented(methodName: string): never {
    throw new Error(`Bitrix24Client.${methodName} is not implemented yet.`);
  }

  /** @inheritdoc */
  public getProviderId(): string {
    return 'bitrix24';
  }

  /** @inheritdoc */
  public listContacts(_options: CrmListOptions): Promise<CrmListResult<CrmContact>> {
    this.throwNotImplemented('listContacts');
  }

  /** @inheritdoc */
  public getContact(_contactId: string): Promise<CrmContact | null> {
    this.throwNotImplemented('getContact');
  }

  /** @inheritdoc */
  public createContact(_input: CrmContactCreateInput): Promise<CrmContact> {
    this.throwNotImplemented('createContact');
  }

  /** @inheritdoc */
  public updateContact(
    _contactId: string,
    _input: CrmContactUpdateInput,
  ): Promise<CrmContact> {
    this.throwNotImplemented('updateContact');
  }

  /** @inheritdoc */
  public listCompanies(_options: CrmListOptions): Promise<CrmListResult<CrmCompany>> {
    this.throwNotImplemented('listCompanies');
  }

  /** @inheritdoc */
  public getCompany(_companyId: string): Promise<CrmCompany | null> {
    this.throwNotImplemented('getCompany');
  }

  /** @inheritdoc */
  public createCompany(_input: CrmCompanyCreateInput): Promise<CrmCompany> {
    this.throwNotImplemented('createCompany');
  }

  /** @inheritdoc */
  public updateCompany(
    _companyId: string,
    _input: CrmCompanyUpdateInput,
  ): Promise<CrmCompany> {
    this.throwNotImplemented('updateCompany');
  }

  /** @inheritdoc */
  public listDeals(_options: CrmListOptions): Promise<CrmListResult<CrmDeal>> {
    this.throwNotImplemented('listDeals');
  }

  /** @inheritdoc */
  public getDeal(_dealId: string): Promise<CrmDeal | null> {
    this.throwNotImplemented('getDeal');
  }

  /** @inheritdoc */
  public createDeal(_input: CrmDealCreateInput): Promise<CrmDeal> {
    this.throwNotImplemented('createDeal');
  }

  /** @inheritdoc */
  public updateDeal(_dealId: string, _input: CrmDealUpdateInput): Promise<CrmDeal> {
    this.throwNotImplemented('updateDeal');
  }

  /** @inheritdoc */
  public listLeads(_options: CrmListOptions): Promise<CrmListResult<CrmLead>> {
    this.throwNotImplemented('listLeads');
  }

  /** @inheritdoc */
  public getLead(_leadId: string): Promise<CrmLead | null> {
    this.throwNotImplemented('getLead');
  }

  /** @inheritdoc */
  public createLead(_input: CrmLeadCreateInput): Promise<CrmLead> {
    this.throwNotImplemented('createLead');
  }

  /** @inheritdoc */
  public updateLead(_leadId: string, _input: CrmLeadUpdateInput): Promise<CrmLead> {
    this.throwNotImplemented('updateLead');
  }
}
