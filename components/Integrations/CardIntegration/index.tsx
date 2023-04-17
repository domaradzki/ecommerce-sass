import Layout from '@/components/Layout';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ProtectedWrapper from '@/components/ProtectedWrapper';
import AddIntegrationModal from '@/components/Integrations/AddIntegrationModal';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Label,
  Modal,
  TextInput,
  Card,
  Dropdown,
} from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
import {
  // useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import CustomLogo from '@/components/CustomLogo';

import { useQuery } from 'react-query';
import Image from 'next/image';
import type { ImageLoaderProps } from 'next/image';
import EditIntegrationModal from '../EditIntegrationModal';
import GetImage from '@/components/GetImage';

type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function CardIntegration({ item }: { item: Integrations }) {
  console.log('card', item);
  return (
    <Card>
      <div className="flex justify-end px-4 pt-2">
        <EditIntegrationModal item={item} />
      </div>
      <div className="flex flex-col items-center pb-2">
        <GetImage item={item.logo} src="logo" />
        {/* <img
          className="mb-3 h-32 w-32 rounded-full object-contain shadow-lg"
          src={logo}
          alt={name}
        /> */}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {item.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item.type}
        </span>
      </div>
    </Card>
  );
}
