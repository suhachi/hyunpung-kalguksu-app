import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Navigate, useLocation } from "react-router-dom";
import { AUTH } from "../../routes";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const loc = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
      setReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!ready) {
    // 로딩 중 스켈레톤 (선택적)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D61C1C] mx-auto"></div>
          <p className="mt-4 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!uid) {
    return <Navigate to={AUTH.login} state={{ from: loc.pathname }} replace />;
  }

  return <>{children}</>;
}

