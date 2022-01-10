export function numFormatter(num) {
    if (num >= 1000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}