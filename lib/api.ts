import { NextResponse } from 'next/server';

export const jsonOk = <T>(data: T, status = 200) => NextResponse.json(data, { status });
export const jsonError = (message: string, status = 400) => NextResponse.json({ message }, { status });
