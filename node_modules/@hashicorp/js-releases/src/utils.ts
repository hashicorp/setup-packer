import axiosBase, { AxiosRequestConfig } from 'axios';
const HttpsProxyAgent = require('https-proxy-agent');

const httpProxy = process.env['HTTP_PROXY'] || process.env['http_proxy'];
const httpsProxy = process.env['HTTPS_PROXY'] || process.env['https_proxy'];

let proxyConf = {};
if (httpProxy || httpsProxy) {
  proxyConf = {
    proxy: false,
    httpAgent: httpProxy ? new HttpsProxyAgent(httpProxy) : undefined,
    httpsAgent: httpsProxy ? new HttpsProxyAgent(httpsProxy) : undefined,
  };
}

const axios = axiosBase.create({ ...proxyConf });

export async function request<T = any>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const result = await axios.get(url, { ...options });
  return result.data;
}
