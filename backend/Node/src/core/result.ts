export type Result<T> = Success<T> | Failure;

export interface Success<T> {
	ok: true;
	value: T;
}

export interface Failure {
	ok: false;
	code: string;
	message: string;
}

export const ok = <T>(value: T): Success<T> => ({ ok: true, value });
export const fail = (code: string, message: string): Failure => ({ ok: false, code, message });
