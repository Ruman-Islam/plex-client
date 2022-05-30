import { useEffect, useMemo, useState } from "react"
import fetcher from "../api/axios";

const useToken = user => {
    const [token, setToken] = useState('');

    const userInfo = useMemo(() => {
        return {
            email: user?.user?.email,
            name: user?.user?.displayName,
            photoURL: user?.user?.photoURL,
            phone: user?.user?.phoneNumber,
            role: 'user'
        }
    }, [user])

    useEffect(() => {
        if (user?.user?.email) {
            (async () => {
                const { data } = await fetcher.post(`/user/${user?.user?.email}`, userInfo)
                const accessToken = data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })()
        }
    }, [user?.user?.email, userInfo])

    return { token };
}

export default useToken;