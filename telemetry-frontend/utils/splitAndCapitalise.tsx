export default function splitAndCapitalise(input: string): string {
    const words = input.split(/(?=[A-Z])/); // Split at capital letters
    const capitalizedWords = words.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toUpperCase();
        return firstLetter + restOfWord;
    });
    return capitalizedWords.join(' ');
}