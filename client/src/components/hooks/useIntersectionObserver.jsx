import { useEffect } from "react";

const useIntersectionObserver = (selector) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("show");
                }else{
                    entry.target.classList.remove("show");
                }
            });
        });

        const elements = document.querySelectorAll(selector);
        elements.forEach((ele) => observer.observe(ele));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [selector]);
}

export default useIntersectionObserver;