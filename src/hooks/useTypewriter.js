import { useState, useEffect } from 'react';

export default function useTypewriter(words, typingSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timer;

        if (!isDeleting && text === currentWord) {
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timer = setTimeout(() => {
                setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
            }, isDeleting ? deleteSpeed : typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseTime]);

    return text;
}
