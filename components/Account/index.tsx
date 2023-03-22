import { useState, useEffect } from 'react';
import {
  useUser,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react';
// import Avatar from './Avatar';

import { Database } from '@/types/database.types';
import Avatar from '../Avatar';
import { Button, Label, TextInput } from 'flowbite-react';
type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles['username']>(null);
  const [full_name, setFullName] = useState<Profiles['full_name']>(null);
  const [website, setWebsite] = useState<Profiles['website']>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!user) throw new Error('No user');

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, full_name, website, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setFullName(data.full_name);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert('Error loading user data!');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [session, user, supabase]);

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: Profiles['username'];
    full_name: Profiles['full_name'];
    website: Profiles['website'];
    avatar_url: Profiles['avatar_url'];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-233px)] flex-col gap-4 px-4 pt-6">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={160}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, full_name, website, avatar_url: url });
        }}
      />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@domain.com"
          required={true}
          shadow={true}
          value={session.user.email}
          disabled
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" />
        </div>
        <TextInput
          id="username"
          type="text"
          required={true}
          shadow={true}
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="użytkownik"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="full_name" />
        </div>
        <TextInput
          id="full_name"
          type="text"
          required={true}
          shadow={true}
          value={full_name || ''}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="imię i nazwisko"
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="website" />
        </div>
        <TextInput
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="strona internetowa"
        />
      </div>

      <div>
        <Button
          className="w-40"
          onClick={() =>
            updateProfile({ username, full_name, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>
      <div>
        <Button className="w-40" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
