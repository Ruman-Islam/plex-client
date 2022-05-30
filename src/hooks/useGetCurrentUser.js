import { useEffect, useState } from "react";
import fetcher from "../api/axios";

const useGetCurrentUser = email => {
    const [currentUser, setCurrentUser] = useState({});
    const url = `/current-user/${email}`;
    useEffect(() => {
        (async () => {
            const { data: { result } } = await fetcher.get(url)
            setCurrentUser(result);
        })()
    }, [url])

    return { currentUser };
}

export default useGetCurrentUser;