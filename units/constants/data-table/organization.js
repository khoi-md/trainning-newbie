import i18n from '@/units/i18n'

export const ORGANIZATIONTABLE = {
  tableHeader: [
    {
      key: 'status',
      label: i18n.t('unit.organization.list.table.status'),
      width: '115px',
    },
    {
      key: 'department_code',
      label: i18n.t('unit.organization.list.table.department_code'),
      width: '115px',
    },
    {
      key: 'department_name',
      label: i18n.t('unit.organization.list.table.department_name'),
      width: '364px',
    },
    {
      key: 'date_of_establishment',
      label: i18n.t('unit.organization.list.table.date_of_establishment'),
      width: '115px',
    },
    {
      key: 'last_updated',
      label: i18n.t('unit.organization.list.table.last_updated'),
      width: '115px',
    },
    {
      key: 'Unit.active_end_date',
      label: i18n.t('unit.organization.list.table.abolition_date'),
      width: '115px',
    },
    {
      width: '80px',
    },
  ],
  tableAffliationManager: [
    {
      key: 'family_name',
      label: i18n.t('unit.organization.detail.table.family_name'),
      width: '462px',
    },
    {
      key: 'arrival_date',
      label: i18n.t('unit.organization.detail.table.arrival_date'),
      width: '120px',
    },
    {
      key: 'retire_date',
      label: i18n.t('unit.organization.detail.table.retire_date'),
      width: '120px',
    },
    {
      width: '120px',
    },
    {
      width: '120px',
    },
  ],
}
