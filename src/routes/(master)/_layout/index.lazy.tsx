import { createLazyFileRoute } from '@tanstack/react-router'

import { reportApi } from '@/apis/report.api'
import CardReport from '@/components/report/CardReport'
import { useUserStore } from '@/stores'
import { ADMIN_SUPER_ADMIN_ROLE, RoleEnum } from '@/types'
import AddCardIcon from '@mui/icons-material/AddCard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SellIcon from '@mui/icons-material/Sell'
import { Box, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'

const DashBoard = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => reportApi.getDashboardHome(),
    queryKey: reportApi.getKey('other')
  })
  const { userProfile } = useUserStore()
  const isAdmin = ADMIN_SUPER_ADMIN_ROLE.includes(
    userProfile?.role.name as RoleEnum
  )

  const report = data?.data

  if (isError) return <h1>error</h1>
  if (isLoading || !report) return <h1>Loading</h1>

  const { userQuantity, formRegisterQuantity, orderQuantity, productQuantity } =
    report

  return (
    <Box>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        {isAdmin && (
          <>
            <Grid xs={6} lg={3}>
              <CardReport
                Icon={<GroupAddIcon />}
                subTittle='Số lượng người dùng hệ thống'
                content={userQuantity + ' +'}
                link='/user'
              />
            </Grid>
            <Grid xs={6} lg={3}>
              <CardReport
                Icon={<AddCardIcon />}
                subTittle='Số lượng đơn đăng kí'
                content={formRegisterQuantity + ' +'}
                link='/active-user'
              />
            </Grid>
            <Grid xs={6} lg={3}>
              <CardReport
                Icon={<LocalMallIcon />}
                subTittle='Số lượng đơn đặt hàng'
                content={orderQuantity + ' +'}
                link='/order'
              />
            </Grid>
          </>
        )}
        <Grid xs={6} lg={3}>
          <CardReport
            Icon={<SellIcon />}
            subTittle='Số lượng sản phẩm'
            content={productQuantity + ' +'}
            link='/product'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export const Route = createLazyFileRoute('/(master)/_layout/')({
  component: DashBoard
})
