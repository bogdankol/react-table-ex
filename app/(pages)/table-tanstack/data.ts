import { EColumns, IItemData } from '@/app/src/types';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IItemData>()

export const columns = [
  columnHelper.accessor(EColumns.name, {
    header: EColumns.name,
    cell: info => {
      return info.getValue()
    }
  }),columnHelper.accessor(EColumns.country, {
    header: EColumns.country,
    cell: info => {
      return info.getValue()
    }
  }),columnHelper.accessor(EColumns.web_pages, {
    header: EColumns.web_pages,
    cell: info => {
      return info.getValue()
    }
  }),columnHelper.accessor(EColumns.state_province, {
    header: EColumns.state_province,
    cell: info => {
      return info.getValue()
    }
  }),
]