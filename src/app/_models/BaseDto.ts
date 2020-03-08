export interface BaseDto<T> {
    isSuccessful: boolean;
    message: string;
    payload: T;
}