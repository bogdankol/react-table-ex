export enum EColumns {
  name = 'name',
  country = 'country',
  web_pages = 'web_pages',
  state_province = 'state-province'
}

export enum ESortOrder {
  asc = 'asc',
  desc = 'desc'
}

export interface IItemData {
	country: string
	name: string
	web_pages: string[]
	['state-province']: string | null
}