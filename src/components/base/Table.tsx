import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Sheet, Link } from '@mui/joy'
import TableJoy from '@mui/joy/Table'
import { ReactNode } from '@tanstack/react-router'

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
  return (
    <Sheet
      variant='plain'
      sx={{
        overflowX: 'auto'
      }}
    >
      <TableJoy
        aria-labelledby='tableTitle'
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '4px',
          '--TableCell-paddingX': '8px',
          overflowX: 'auto'
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
                <th key={associate.toString()} style={{ padding: '12px 6px', zIndex: 5 }}>
                  {label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map(({ associate, render }) => (
                  <td key={associate.toString()}>{render ? render(row) : row[associate]}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </TableJoy>
    </Sheet>
  )
}

export default Table
