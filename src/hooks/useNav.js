import { useEffect, useState } from 'react';

const useNav = () => {
    //navbar scroll when active state
    const [navbar, setNavbar] = useState(0);

    //navbar scroll changeBackground function
    const changeBackground = () => {
        if (window.scrollY > 5) {
            setNavbar(5);
        } else if (window.scrollY > 600) {
            setNavbar(600);
        } else {
            setNavbar(0);
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