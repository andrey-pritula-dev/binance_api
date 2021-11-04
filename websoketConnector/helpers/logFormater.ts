export const logFormater = (text: string): void => {
    console.log(`[${new Date().getHours()}:${new Date().getMinutes()}] ${text}`)
}