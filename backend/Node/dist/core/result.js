export const ok = (value) => ({ ok: true, value });
export const fail = (code, message) => ({ ok: false, code, message });
