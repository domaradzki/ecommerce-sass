'use client';

import { Label } from 'flowbite-react';
import { ChangeEvent, FC, useEffect,useState } from 'react';
import supabase  from '@/utils/supabase-browser'
import { Database } from '@/types/database.types';
import { useQuery } from 'react-query';
import { useAuth } from '@/components/AuthProvider';
type Integrations = Database['public']['Tables']['integrations']['Row'];

const SourceProducts = function () {
  const [integration, setIntegration] = useState<Integrations['id'] | null>(
    null,
  );
  const [jsonData, setData] = useState([]);
  const { user } = useAuth();

  const { data, isLoading, isSuccess } = useQuery(
    'integrations',
    async () => {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      enabled: !!user, // Only run the query if user is defined
    },
  );

  // useEffect(() => {
  //   const wholeseler = data?.filter((item) => item.id === integration);
  //   console.log(wholeseler?.[0]);
  //   const xml = wholeseler?.[0]?.xml_full as Integrations['xml_full'];
  //   console.log('xml', xml);

  //   setXmlFile(xml);
  // }, [data, integration]);

  // async function fetchData() {
  //   const response = await fetch('http://localhost:3000/api/ikonka');
  //   const data = await response.json();
  //   return data;
  // }

  // const products = fetchData();

  return (
    <div>
      <Label htmlFor="integration">Źródło produktów</Label>
      <div className="mt-1">
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setIntegration(e.target.value as Integrations['id'])
          }
          id="integration"
          name="integration"
          className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
        >
          {data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SourceProducts;
