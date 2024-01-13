export type hashFunction = (password: string) => string
export type compareFunction = (password: string, hashedPassword: string) => boolean
export type SignToken = (payload: Object, duration?: string) => Promise<string | null>