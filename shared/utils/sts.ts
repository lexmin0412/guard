// This file is auto-generated, don't edit it

import { getEnvConfig } from "@/shared/utils/env";

// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const Sts20150401 = require('@alicloud/sts20150401');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');

class STSClient {

	/**
	 * 使用AK&SK初始化账号Client
	 * @return Client
	 * @throws Exception
	 */
	static createClient() {
		// 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
		// 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
		let config = new OpenApi.Config({
			// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
			accessKeyId: getEnvConfig('ALI_CLOUD_RAM_ACCESS_KEY'),
			// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
			accessKeySecret: getEnvConfig('ALI_CLOUD_RAM_ACCESS_KEY_SECRET'),
		});
		// Endpoint 请参考 https://api.aliyun.com/product/Sts
		config.endpoint = getEnvConfig('ALI_CLOUD_STS_END_POINT');
		return new Sts20150401.default(config);
	}

	static async main() {
		let client = this.createClient();
		console.log('arn', getEnvConfig('ALI_CLOUD_RAM_ROLE_ARN'))
		let assumeRoleRequest = new Sts20150401.AssumeRoleRequest({
			roleArn: getEnvConfig('ALI_CLOUD_RAM_ROLE_ARN'),
			roleSessionName: getEnvConfig('ALI_CLOUD_RAM_ROLE_SESSION_NAME'),
		});
		let runtime = new Util.RuntimeOptions({});
		try {
			// 复制代码运行请自行打印 API 的返回值
			const res = await client.assumeRoleWithOptions(assumeRoleRequest, runtime);
			if (res.statusCode === 200) {
				return {
					bucket: getEnvConfig('OSS_BUCKET'),
					region: getEnvConfig('OSS_REGION'),
					...res.body.credentials,
				}
			}
			return null
		} catch (error: any) {
			// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
			// 错误 message
			console.log(error.message);
			// 诊断地址
			console.log(error.data["Recommend"]);
			Util.default.assertAsString(error.message);
		}
	}

}

export default STSClient
