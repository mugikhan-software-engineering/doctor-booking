import type { LayoutServerLoad } from './$types';
import { Resource } from 'sst';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session } = await safeGetSession()
  return {
    session,
    cookies: cookies.getAll(),
    isDev: Resource.App.stage === 'dev' || Resource.App.stage === 'mugi'
  }
}