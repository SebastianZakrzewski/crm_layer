import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { mapBitrixDealRowToCrmDeal } from './map-bitrix-deal-row-to-crm-deal';

/** Env key: full incoming webhook base URL up to the token segment (no trailing slash). */
export const BITRIX24_WEBHOOK_BASE_URL_ENV =
  'BITRIX24_WEBHOOK_BASE_URL' as const;

type BitrixRestSuccess<T> = Readonly<{ readonly result: T }>;
type BitrixRestFailure = Readonly<{
  readonly error: string | number;
  readonly error_description?: string;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Bitrix24 REST adapter for {@link AbstractCrmClient}. Methods are implemented incrementally.
 */
@Injectable()
export class Bitrix24Client extends AbstractCrmClient {
  public constructor(private readonly configService: ConfigService) {
    super();
  }

  private throwNotImplemented(methodName: string): never {
    throw new Error(`Bitrix24Client.${methodName} is not implemented yet.`);
  }

  private getWebhookBaseUrl(): string {
    const raw = this.configService.get<string>(BITRIX24_WEBHOOK_BASE_URL_ENV);
    if (raw === undefined || raw.trim() === '') {
      throw new Error(`${BITRIX24_WEBHOOK_BASE_URL_ENV} is not configured.`);
    }
    return raw.replace(/\/+$/, '');
  }

  private parsePositiveIntId(entityLabel: string, id: string): number {
    const trimmed = id.trim();
    if (trimmed === '' || !/^\d+$/.test(trimmed)) {
      throw new Error(`Bitrix24Client: invalid ${entityLabel} id "${id}".`);
    }
    const numeric = Number.parseInt(trimmed, 10);
    if (numeric <= 0) {
      throw new Error(`Bitrix24Client: invalid ${entityLabel} id "${id}".`);
    }
    return numeric;
  }

  private isDealNotFoundFailure(
    error: string | number,
    description: string,
  ): boolean {
    const normalizedDescription = description.toLowerCase();
    if (normalizedDescription.includes('not found')) {
      return true;
    }
    const normalizedError = String(error).toLowerCase();
    return normalizedError.includes('not_found') || normalizedError === '404';
  }

  private async postJson<T>(
    methodPath: string,
    body: Readonly<Record<string, unknown>>,
  ): Promise<T> {
    const url = `${this.getWebhookBaseUrl()}/${methodPath}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parsed: unknown = await response.json();
    if (!isRecord(parsed)) {
      throw new Error('Bitrix24Client: unexpected non-object REST response.');
    }
    return parsed as T;
  }

  /** @inheritdoc */
  public getProviderId(): string {
    return 'bitrix24';
  }

  /** @inheritdoc */
  public listContacts(
    _options: CrmListOptions,
  ): Promise<CrmListResult<CrmContact>> {
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
  public listCompanies(
    _options: CrmListOptions,
  ): Promise<CrmListResult<CrmCompany>> {
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

  /**
   * Loads a deal via Bitrix24 `crm.deal.get` (incoming webhook POST).
   * Bitrix marks this method deprecated in favor of `crm.item.get` with smart-process IDs; this adapter still uses `crm.deal.get` for classic deal rows.
   * @inheritdoc
   */
  public async getDeal(dealId: string): Promise<CrmDeal | null> {
    const id = this.parsePositiveIntId('deal', dealId);
    const payload = await this.postJson<
      BitrixRestSuccess<unknown> | BitrixRestFailure
    >('crm.deal.get', {
      ID: id,
    });
    if ('error' in payload) {
      const description = payload.error_description ?? '';
      if (this.isDealNotFoundFailure(payload.error, description)) {
        return null;
      }
      throw new Error(
        `Bitrix24Client: crm.deal.get failed (${String(payload.error)}): ${description}`.trim(),
      );
    }
    if (!isRecord(payload.result)) {
      throw new Error(
        'Bitrix24Client: crm.deal.get returned a non-object result.',
      );
    }
    return mapBitrixDealRowToCrmDeal(payload.result);
  }

  /** @inheritdoc */
  public createDeal(_input: CrmDealCreateInput): Promise<CrmDeal> {
    this.throwNotImplemented('createDeal');
  }

  /** @inheritdoc */
  public updateDeal(
    _dealId: string,
    _input: CrmDealUpdateInput,
  ): Promise<CrmDeal> {
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
  public updateLead(
    _leadId: string,
    _input: CrmLeadUpdateInput,
  ): Promise<CrmLead> {
    this.throwNotImplemented('updateLead');
  }
}
