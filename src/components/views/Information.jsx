import  { useEffect } from 'react';
import gsap from 'gsap';

const Information = () => {
    useEffect(() => {
        gsap.to('#text', {
            ease: 'power1.inOut',
            opacity: 1,
            y: 0,
        });
        gsap.fromTo(
            '.para',
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                delay: 1,
                stagger: 0.1,
            }
        );
    }, []);

    return (
        <main className='flex justify-center'>
            <h1 id="text" className="opacity-0 translate-y-10">
                Informacion
                <p className="para">hacer dinamica la informacion</p>
            </h1>
        </main>
    );
};

export default Information;
