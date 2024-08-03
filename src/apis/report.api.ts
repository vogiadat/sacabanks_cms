import { BaseApi } from '@/apis'
import { IReport } from '@/interfaces/report.interface'
import { ResponseApi } from '@/utils'

class ReportApi extends BaseApi<IReport> {
  constructor() {
    super('report')
  }

  getDashboardHome() {
    return this.axiosClient
      .get(this.endpoint)
      .then((res) => res.data as ResponseApi<IReport>)
  }
}

export const reportApi = new ReportApi()
