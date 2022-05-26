import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;

    useEffect(() => {
        const url = `http://localhost:5000/user/${email}`;
        if (email) {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }
    }, [email])

    return { token };
}

export default useToken;