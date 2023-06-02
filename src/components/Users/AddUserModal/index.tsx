'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { HiPlus } from 'react-icons/hi';

const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return (
    <>
      <Button
        color="dark"
        onClick={() => setOpen(true)}
        className="bg-primary-700"
      >
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      {typeof window !== 'undefined' && (
        <Modal
          onClose={() => setOpen(false)}
          show={isOpen}
          suppressHydrationWarning={true}
        >
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add new user</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <div className="mt-1">
                  <TextInput
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <div className="mt-1">
                  <TextInput
                    id="lastName"
                    name="lastName"
                    placeholder="Green"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <div className="mt-1">
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder="e.g., +(12)3456 789"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <div className="mt-1">
                  <TextInput
                    id="department"
                    name="department"
                    placeholder="Development"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <div className="mt-1">
                  <TextInput
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => setOpen(false)}>
              Add user
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AddUserModal;
