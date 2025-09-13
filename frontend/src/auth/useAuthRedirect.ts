import { useNavigate, useSearchParams } from 'react-router-dom';

const isSafePath = (path: string) =>
  path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\');

/**
 * Hook that returns a function to redirect the user after authentication.
 * It respects a `next` query parameter when present.
 */
export const useAuthRedirect = (fallback = '/dashboard') => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next');

  return () => {
    const destination = next && isSafePath(next) ? next : fallback;
    navigate(destination, { replace: true });
  };
};
