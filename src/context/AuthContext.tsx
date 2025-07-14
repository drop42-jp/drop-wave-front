import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { Database } from "../database.types";

type UserExtended = Database["public"]["Tables"]["users_extended"]["Row"];

interface AuthContextType {
  user: User | null;
  userProfile: UserExtended | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ user: User | null; error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signInWithProvider: (
    provider: "google" | "facebook" | "twitter" | "discord"
  ) => Promise<{ error: AuthError | null }>;
  updateProfile: (
    updates: Partial<UserExtended>
  ) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserExtended | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Separate effect to handle profile updates when user changes
  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users_extended")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found" error
        console.error("Error fetching user profile:", error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
          },
        },
      });

      return { user: data.user, error };
    } catch (error) {
      console.error("Error signing up:", error);
      return { user: null, error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { user: data.user, error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { user: null, error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error("Error signing out:", error);
      return { error: error as AuthError };
    }
  };

  const signInWithProvider = async (
    provider: "google" | "facebook" | "twitter" | "discord"
  ) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/account`,
        },
      });

      return { error };
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      return { error: error as AuthError };
    }
  };

  const updateProfile = async (updates: Partial<UserExtended>) => {
    if (!user) {
      return { error: new Error("No user logged in") };
    }

    try {
      const { error } = await supabase.from("users_extended").upsert({
        id: user.id,
        ...updates,
      });

      if (!error) {
        // Refresh user profile
        await fetchUserProfile(user.id);
      }

      return { error };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error: error as Error };
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithProvider,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
