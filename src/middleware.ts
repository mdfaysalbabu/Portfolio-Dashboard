import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthKey } from './constants';
import { jwtDecode } from 'jwt-decode';
import { TUser } from './types';



const commonRoute = ['/dashboard', '/dashboard/change-password'];
const authRoutes = ['/', '/register'];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = cookies().get(AuthKey)?.value;
    // console.log(accessToken);
    if (!accessToken) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        }
        else {
        return NextResponse.redirect(new URL('/', request.url))
        }
    }

    if (accessToken && commonRoute.includes(pathname)) {
        return NextResponse.next();
    }
    let decode = null;
    if (accessToken) {
        decode = jwtDecode(accessToken) as TUser;
    }
    // console.log(decode);
    const role = decode?.role;
    if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) {
        return NextResponse.next();

    }
   

    return NextResponse.redirect(new URL('/local-page', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [ '/','/register', '/dashboard/:path*'],
}