import { redirect } from "next/navigation";
import { auth } from "@/auth";

export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
}

/** Lấy user hiện tại (hoặc null). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth();
  return (session?.user as SessionUser) ?? null;
}

/**
 * Bắt buộc là ADMIN. Nếu chưa đăng nhập → chuyển tới đăng nhập;
 * nếu đăng nhập nhưng không phải ADMIN → về trang chủ.
 * Trả về thông tin admin để dùng tiếp.
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap?callbackUrl=/admin");
  if (user.role !== "ADMIN") redirect("/");
  return user;
}
