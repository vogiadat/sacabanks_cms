import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Link from '@mui/joy/Link'
import TableJoy from '@mui/joy/Table'
import { ReactNode, useRouter } from '@tanstack/react-router'

export type ColumDef<T extends { id: string | number }> = {
  associate: keyof T
  render?: (value: T) => ReactNode
  label: string
}

interface Props<T extends { id: string | number }> {
  rows: T[]
  columns: ColumDef<T>[]
}

const Table = <T extends { id: string | number }>({ rows, columns }: Props<T>) => {
  const { navigate } = useRouter()

  const handleRowClick = (id: string | number) => {
    navigate({ to: `update/${id}` })
  }

  return (
    <TableJoy
      aria-labelledby='tableTitle'
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px'
      }}
    >
      <thead>
        <tr>
          {columns.map(({ associate, label }) => {
            if (associate === 'id')
              return (
                <th style={{ width: 120, padding: '12px 6px' }} key={associate.toString()}>
                  <Link
                    underline='none'
                    color='primary'
                    component='button'
                    fontWeight='lg'
                    endDecorator={<ArrowDropDownIcon />}
                    sx={{
                      '& svg': {
                        transition: '0.2s'
                      }
                    }}
                  >
                    {label}
                  </Link>
                </th>
              )

            return (
              <th key={associate.toString()} style={{ padding: '12px 6px' }}>
                {label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr onClick={() => handleRowClick(row.id)} key={row.id}>
              {columns.map(({ associate, render }) => (
                <td key={associate.toString()}>{render ? render(row) : row[associate]}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </TableJoy>
  )
}

export default Table
