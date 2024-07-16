import { getEnvConfig } from "@/app/oauth/actions"
import STSClient from "@/shared/utils/sts"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	// 读取 body 中的参数
	const body = await request.json()

	const validUsers = (await getEnvConfig('VALID_USERS'))?.split(',').map((item)=>{
		const [userName, password] = item.split('__')
		return {
			userName,
			password
		}
	})

	if (validUsers?.some((item) => item.userName === body.userName && item.password === body.password)) {

		const data = await STSClient.main()

		return NextResponse.json({
			code: 0,
			data,
			message: null
		})
	}
	return NextResponse.json({
		code: 1,
		data: null,
		message: '非法用户'
	})
}
