import { useEffect } from "react";

const useIntersectionObserver = (selector) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show"); // ✅ Only add 'show', not 'reveal'
                }
            });
        });

        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [selector]);
}

export default useIntersectionObserver;
