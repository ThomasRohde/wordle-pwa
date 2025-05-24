import { WORD_LIST } from "./word-list-constant";

export const getRandomWord = (): string => {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string): boolean => {
    return WORD_LIST.includes(word.toUpperCase());
};

export const checkGuess = (guess: string, target: string): ("correct" | "present" | "absent")[] => {
    const result: ("correct" | "present" | "absent")[] = new Array(5).fill("absent");
    const targetLetters = target.split("");
    const guessLetters = guess.split("");

    // First pass: mark correct letters
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === targetLetters[i]) {
            result[i] = "correct";
            targetLetters[i] = "*"; // Mark as used
            guessLetters[i] = "*"; // Mark as used
        }
    }

    // Second pass: mark present letters
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] !== "*") {
            const targetIndex = targetLetters.indexOf(guessLetters[i]);
            if (targetIndex !== -1) {
                result[i] = "present";
                targetLetters[targetIndex] = "*"; // Mark as used
            }
        }
    }

    return result;
};

export const getTodaysWord = (): string => {
    // Generate a consistent word for today based on date
    const today = new Date();
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    const wordIndex = daysSinceEpoch % WORD_LIST.length;
    return WORD_LIST[wordIndex];
};

export const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

export const isNewDay = (lastPlayed: string): boolean => {
    const today = formatDate(new Date());
    return lastPlayed !== today;
};

export const getShareText = (guesses: string[], targetWord: string, gameNumber: number): string => {
    const result = guesses
        .map((guess) => {
            if (!guess) return "";
            return checkGuess(guess, targetWord)
                .map((state) => {
                    switch (state) {
                        case "correct":
                            return "🟩";
                        case "present":
                            return "🟨";
                        case "absent":
                            return "⬛";
                        default:
                            return "⬜";
                    }
                })
                .join("");
        })
        .filter((line) => line)
        .join("\n");

    return `Wordle PWA #${gameNumber}\n\n${result}\n\nPlay at: ${window.location.origin}`;
};
