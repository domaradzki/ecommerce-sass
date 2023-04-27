import { Label } from 'flowbite-react';
import { ChangeEvent, FC, useEffect } from 'react';
import { useState } from 'react';
import { parseStringPromise } from 'xml2js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { useUser } from '@/utils/hooks/useUser';
import { Database } from '@/types/database.types';
import { useQuery } from 'react-query';
type Integrations = Database['public']['Tables']['integrations']['Row'];

const SourceProducts: FC = function () {
  const supabase = useSupabaseClient<Database>();
  const [integration, setIntegration] = useState<Integrations['id'] | null>(
    null,
  );
  const [xmlFile, setXmlFile] = useState<Integrations['xml_full']>(null);
  const [jsonData, setData] = useState([]);
  const { user } = useUser();

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
  console.log(data);

  useEffect(() => {
    const wholeseler = data?.filter((item) => item.id === integration);
    console.log(wholeseler?.[0]);
    const xml = wholeseler?.[0]?.xml_full as Integrations['xml_full'];
    setXmlFile(xml);
  }, [data, integration]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(xmlFile);
      const xmlData = await response.text();
      const jsonData = await parseStringPromise(xmlData, {
        explicitArray: false,
      });
      setData(jsonData.records.record);
    }
    fetchData();
  }, [integration, xmlFile]);
  console.log(jsonData);
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
