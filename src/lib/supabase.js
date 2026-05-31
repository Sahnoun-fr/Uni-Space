import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY/VITE_SUPABASE_PUBLISHABLE_KEY environment variables.');
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const DEFAULT_BOOKING_BALANCE = 10;

export const mapSupabaseUser = (user) => {
  if (!user) return null;

  const metadata = user.user_metadata || {};
  const role = metadata.role || user.app_metadata?.role || 'user';

  return {
    id: user.id,
    name: metadata.full_name || metadata.name || metadata.first_name || user.email?.split('@')?.[0] || 'User',
    email: user.email || '',
    role,
  };
};

export const ensureUserProfile = async (user) => {
  if (!user) return null;
  if (!supabase) throw new Error('Supabase is not configured.');

  const mappedUser = mapSupabaseUser(user);
  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    email: mappedUser.email,
    full_name: mappedUser.name,
  });

  if (error) {
    throw error;
  }

  return mappedUser;
};

export const getUserProfile = async (userId) => {
  if (!userId) return null;
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, balance_credits')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserBookings = async (userId, limit = 20) => {
  if (!userId) return [];
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('bookings')
    .select('id, user_id, seat_id, floor, start_time, end_time, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data || [];
};

export const getActiveBookingsByFloor = async (floor) => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('bookings')
    .select('seat_id, status')
    .eq('floor', floor)
    .gt('end_time', new Date().toISOString())
    .eq('status', 'confirmed');
  
  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
};

export const createSeatBooking = async ({ seatId, floor, startTime, endTime, status = 'confirmed' }) => {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const user = authData.user;
  if (!user) {
    throw new Error('You must be signed in to create a booking.');
  }

  const profile = await getUserProfile(user.id);
  const currentBalance = profile?.balance_credits ?? DEFAULT_BOOKING_BALANCE;

  if (currentBalance <= 0) {
    throw new Error('Your booking balance is empty.');
  }

  const activeBookings = await getUserBookings(user.id, 1);
  if (activeBookings.length > 0 && activeBookings[0].status === 'confirmed' && new Date(activeBookings[0].end_time) > new Date()) {
    throw new Error('You already have an active reservation. You can only reserve one table at a time.');
  }

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      seat_id: seatId,
      floor,
      start_time: startTime,
      end_time: endTime,
      status,
    })
    .select('id, user_id, seat_id, floor, start_time, end_time, status, created_at')
    .single();

  if (bookingError) {
    throw bookingError;
  }

  const { error: balanceError } = await supabase
    .from('profiles')
    .update({ balance_credits: currentBalance - 1 })
    .eq('id', user.id);

  if (balanceError) {
    throw balanceError;
  }

  return booking;
};

/**
 * Fetch stats for all seats on a given floor.
 * Falls back gracefully if the seat_stats table doesn't exist yet.
 * @param {string} floor
 * @returns {Promise<Record<string,{wifi:string,outlet:string,noise:string,warmth:string}>>}
 */
export const getSeatStats = async (floor) => {
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from('seat_stats')
      .select('seat_id, wifi, outlet, noise, warmth')
      .eq('floor', floor);
    if (error) throw error;
    const map = {};
    (data || []).forEach(row => { map[row.seat_id] = { wifi: row.wifi, outlet: row.outlet, noise: row.noise, warmth: row.warmth }; });
    return map;
  } catch {
    return {};
  }
};

/**
 * Upsert a single stat for a seat.
 * @param {{seatId:string, floor:string, stat:'wifi'|'outlet'|'noise'|'warmth', value:string}} params
 */
export const upsertSeatStat = async ({ seatId, floor, stat, value }) => {
  if (!supabase) return;
  try {
    await supabase
      .from('seat_stats')
      .upsert({ seat_id: seatId, floor, [stat]: value }, { onConflict: 'seat_id,floor' });
  } catch {
    /* table may not exist yet — fail silently */
  }
};

