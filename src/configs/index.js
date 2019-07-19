export const pagination = {
  showSizeChanger: true,
  pageSizeOptions: ["15", "30", "50", "100"],
  pageSize: 15,
  current: 1,
  total: 0,
  showTotal(total) {
    return `共${total}条记录，${Math.floor((total - 1) / this.pageSize) + 1}页`;
  }
};
export const BaseUrl = "http://192.168.1.134:8001";
export const BaseApi = "/api/v1/front";
