import { Card } from 'flowbite-react';
import { Database } from '@/types/database.types';

import EditIntegrationModal from '../EditIntegrationModal';
import GetImage from 'src/app/components/GetImage';
import { useState } from 'react';

type Integrations = Database['public']['Tables']['integrations']['Row'];

export default function CardIntegration({ item }: { item: Integrations }) {
  const [logo, setLogo] = useState(item.logo);
  return (
    <Card>
      <div className="flex justify-end px-4 pt-2">
        <EditIntegrationModal item={item} setNewLogo={setLogo} />
      </div>
      <div className="flex flex-col items-center pb-2">
        <GetImage item={logo} src="logo" />
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
