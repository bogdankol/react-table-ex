export type Item = {
  country: string
  name: string
  ['state-province']: string
  web_pages: string[]
}

export enum EColumns {
  country = 'country',
  name = 'name',
  web_pages = 'web_pages',
  state_province = 'state-province'
}

export enum ESortOrder {
  asc = 'asc',
  desc = 'desc'
}