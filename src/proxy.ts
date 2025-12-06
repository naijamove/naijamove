import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone()
    url.pathname = "/musafir-express"
    return NextResponse.redirect(url)
  }

  return NextResponse.next();
}


export const config = {
    matcher: [

      '/((?!_next|favicon.ico|api).*)',
    ],
  };