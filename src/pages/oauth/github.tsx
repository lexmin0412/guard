import { authBase } from "@/config";
import { useEffect } from "react";

export default function OAuthGithub() {
    const sourceURL = new URLSearchParams(window.location.search).get('redirect_uri') as string
    console.log('sourceURL', sourceURL)
    const getAuthURL = () => {
        fetch(`${authBase.local}/api/auth`).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log('授权链接', res)
            localStorage.setItem('redirect_uri', sourceURL)
            window.location.href = res.data.authURL
        })
    }

    const getTokenAndGoBack = async(code: string) => {
        fetch(`${authBase.local}/api/auth/token?code=${code}`).then((res)=>{
            return res.json()
        }).then((res)=>{
            console.log('token', res)
            const sourceURL = localStorage.getItem('redirect_uri')
            const callbackURL = `${sourceURL}?token=${res.data.access_token}`
            console.log('跳回去咯',callbackURL)
            window.location.href = callbackURL
        })
    }

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        if (code) {
            // 有 code 表示回来了，换个 token 调回去
            getTokenAndGoBack(code)
            // window.location.href = `${sourceURL}?code=${code}`
        } else {
            getAuthURL()
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">OAuth</h1>
            <div>
                正在登录...
            </div>
        </div>
    );
}