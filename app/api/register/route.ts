import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || String(password).length < 6) {
      return NextResponse.json(
        { error: "Email và mật khẩu (tối thiểu 6 ký tự) là bắt buộc." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email này đã được đăng ký." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    await prisma.user.create({
      data: { email, name: name || null, passwordHash },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
  }
}
