import { Dropdown } from 'flowbite-react';
import { Badge } from 'flowbite-react';

export default function DropDownTodoStatus() {
  return (
    <Dropdown
      arrowIcon={false}
      color="transparent"
      fullSized={false}
      outline={false}
      pill={false}
      placement="bottom"
      positionInGroup="middle"
      title="Dropdown profile"
      trigger="click"
      label={<Badge color="purple">To do</Badge>}
    >
      {/* <!-- Dropdown menu --> */}
      <ul className="pb- pt-1" role="none">
        <li className="py-2 px-2">
          <Badge color="purple">To do</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="yellow">In progress</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="green">Done</Badge>
        </li>
        <li className="py-2 px-2">
          <Badge color="red">Won&apos;t do</Badge>
        </li>
      </ul>
    </Dropdown>
  );
}
