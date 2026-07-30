
import { createClient } from '@supabase/supabase-js';

export async function getSession() {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return data.session ?? null;
}

export async function guestLogin(email) {
  // TODO: implement guest/signup flow when backend is ready
}

export async function saveSave(save) {
  // TODO: implement cloud save when backend is ready
}

export async function loadSave(userId) {
  // TODO: implement cloud save when backend is ready
}

export const api = {

};
let supabaseClient = null;
export function initSupabase(url, key) {
  supabaseClient = createClient(url, key);
}
