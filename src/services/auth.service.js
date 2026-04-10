import { clientDB } from "@/libs/supabase";
import { setupNewUser } from "./agencies.service";

export const signInOrSignUp = async (email, password) => {

    // 1. Intentar login
    const { data: loginData, error: loginError } = await clientDB.auth.signInWithPassword({ email, password });

    if (!loginError && loginData?.user) {
        // 🔥 FORZAR SESSION SYNC
        await clientDB.auth.getSession();
        return { user: loginData.user, isNew: false };
    }

    // 2. Si falla → crear cuenta
    const { data: signUpData, error: signUpError } = await clientDB.auth.signUp({ email, password });

    if (signUpError) throw signUpError;

    const user = signUpData.user;

    if (!user) {
        return { user: null, isNew: true };
    }

    // 3. Crear agencia + perfil
    await setupNewUser(user);

    // 🔥 FORZAR SESSION SYNC
    await clientDB.auth.getSession();

    return { user, isNew: true };
};

export const getCurrentUser = async () => {

    // 1. Obtener usuario auth
    const { data: { user }, error } = await clientDB.auth.getUser();

    if (error || !user) return null;

    // 2. Obtener usuario extendido
    const { data: profile, error: profileError } = await clientDB
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profileError) throw profileError;

    const { data: agency, error: agencyError } = await clientDB
        .from("agencies")
        .select("*")
        .eq("id", profile.agency_id)
        .single();

    if (agencyError) throw agencyError;

    return {
        ...user,
        ...profile,
        agency: agency
    };
};

export const signOut = async () => {

    const { error } = await clientDB.auth.signOut();

    if (error) throw error;

};