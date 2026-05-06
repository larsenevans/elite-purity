/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Revalidation endpoint pre WordPress Webhook
 * URL: /api/revalidate?tag=product-slug&secret=tvoj_token
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  // Bezpečnostná kontrola tokenu
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: "Missing tag param" }, { status: 400 });
  }

  try {
    // Premázanie cache pre konkrétny tag
    // @ts-ignore - V niektorých verziách môže vyžadovať druhý argument
    revalidateTag(tag);
    // Voliteľne premázať aj hlavný zoznam produktov
    // @ts-ignore
    revalidateTag("products");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
