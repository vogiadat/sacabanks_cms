import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import { Link } from '@tanstack/react-router'
import * as React from 'react'

const SidebarItem = (props: {
  href: string
  title: string
  icon: React.ReactNode
}) => {
  const { href, title, icon } = props

  return (
    <Link
      to={href}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      {(state) => (
        <ListItem>
          <ListItemButton selected={state.isActive}>
            {icon}
            <ListItemContent>
              <Typography level='title-sm'>{title}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      )}
    </Link>
  )
}

export default SidebarItem
