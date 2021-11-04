interface IApiData {
    "e": string,
    "E": number,
    "s": string,
    "a": number,
    "p": string,
    "q": string,
    "f": number,
    "l": number,
    "T": number,
    "m": boolean,
    "M": boolean
}

export interface IApiResponse {
    stream: string,
    data: IApiData
}