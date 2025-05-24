import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Starting signup process with:', { email, firstName: userData.firstName, lastName: userData.lastName });

      // Validate input data
      if (!email || !password || !userData.firstName || !userData.lastName) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      // Get the User role ID
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'User')
        .single();

      if (roleError || !roleData) {
        console.error('Error fetching User role:', roleError);
        throw new Error('Failed to fetch User role');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: email,
          hashed_password: hashedPassword,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role_id: roleData.id
        })
        .select()
        .single();

      if (createError) {
        console.error('User creation error:', createError);
        throw new Error(`Failed to create user: ${createError.message}`);
      }

      if (!newUser) {
        throw new Error('Failed to create user - no data returned');
      }

      // Store user in localStorage (without the hashed password)
      const userToStore = {
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        role_id: newUser.role_id
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);

      console.log('User created successfully:', userToStore);
      
      // Immediately navigate to profile builder
      console.log('Navigating to profile builder...');
      navigate('/profile-builder', { replace: true });
    } catch (error: any) {
      console.error('Signup error:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Find user by email
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Sign in error:', error);
        throw new Error('Failed to sign in');
      }

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.hashed_password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Store user in localStorage (without the hashed password)
      const userToStore = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.role_id
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);

      console.log('User signed in successfully:', userToStore);
      
      // Check if user has completed their profile
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile) {
        // Redirect to AIProfileBuilder page if profile is not complete
        console.log('User profile not found, redirecting to profile builder...');
        navigate('/profile-builder');
      } else {
        // Redirect to dashboard if profile is complete
        console.log('User profile found, redirecting to dashboard...');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Sign in error:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Remove user from localStorage
      localStorage.removeItem('user');
      setUser(null);
      console.log('User signed out successfully');
      // Redirect to home page after sign out
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
