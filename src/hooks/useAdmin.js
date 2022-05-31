import { message } from "antd";
import { useEffect, useState } from "react"
import fetcher from "../api/axios";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const email = user?.email;
        if (email) {
            (async () => {
                try {
                    const { data } = await fetcher.get(`/admin/${email}`)
                    setAdmin(data.admin)
                    setAdminLoading(false)
                } catch (error) {
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        message.warning(error?.response?.data?.message);
                    }
                }
            })()
        }
    }, [user])

    return { admin, adminLoading };
}

export default useAdmin;