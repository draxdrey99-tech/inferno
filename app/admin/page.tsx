import AdminApp from '@/components/admin/AdminApp';
import { isAdmin } from '@/lib/auth';

// Session state is per-request, so this page can never be prerendered.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return <AdminApp authed={await isAdmin()} />;
}
