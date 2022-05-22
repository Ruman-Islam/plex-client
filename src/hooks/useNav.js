import { useEffect, useState } from 'react';

const useNav = () => {
    //navbar scroll when active state
    const [navbar, setNavbar] = useState(false);

    //navbar scroll changeBackground function
    const changeBackground = () => {
        if (window.scrollY > 5) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        changeBackground();
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground);
    }, []);

    return { navbar };
};

export default useNav;