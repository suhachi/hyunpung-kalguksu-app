import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = (loc.state as any)?.from ?? "/admin";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      toast.success("로그인 성공");
      nav(redirectTo, { replace: true });
    } catch (e: any) {
      const errorMessage = e?.message ?? "로그인 실패";
      setErr(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[#F9F6F3]">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 p-8 rounded-2xl shadow-lg bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#2E1C10]">로그인</h1>
          <p className="text-sm text-gray-600">관리자 또는 고객 계정으로 로그인하세요</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          {err && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{err}</p>
          )}

          <Button
            type="submit"
            disabled={loading || !email || !pw}
            className="w-full bg-[#D61C1C] hover:bg-[#D61C1C]/90"
          >
            {loading ? "로그인 중…" : "로그인"}
          </Button>
        </div>
      </form>
    </div>
  );
}

