import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { AdminAddUserSchema, TAdminAdduserSchema } from '../../validation';
import InputSelect from '@/atoms/fields/NewInputSelect';
import { role } from '@/constants/data';
import Input from '@/atoms/fields/NewInput';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SUPER_ADMIN } from '@/constants/api';

const AddUserModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals },
    AdminStore: { addUser, isLoading }
  } = useStore();

  const queryClient = useQueryClient();

  const form = useForm<TAdminAdduserSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(AdminAddUserSchema),
    reValidateMode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<TAdminAdduserSchema> = (formData) => {
    addUser(formData, () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] == SUPER_ADMIN.STATS
      });
      toggleModals();
    });
  };

  return (
    <XModal
      closeModal={() => {
        toggleModals();
      }}
      bgClose={false}
      isOpen={isOpen.ADMIN_ADD_USER}
      className="!max-w-[350px]"
      title="Add user"
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-4">
            <fieldset disabled={isLoading.add_user} className="w-full">
              <div className="mb-1 flex w-full flex-col md:flex-row md:items-center md:justify-between md:space-x-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <div>
                      <Input
                        className="md:mb-0 md:w-[50%]"
                        defaultValue={field.value}
                        label="First Name"
                        placeholder=""
                        required
                        {...field}
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <div>
                      <Input
                        className="md:mb-0 md:w-[50%]"
                        defaultValue={field.value}
                        label="Last Name"
                        placeholder=""
                        required
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <Input
                      className="md:mb-0 md:w-[50%]"
                      defaultValue={field.value}
                      label="Email"
                      type="email"
                      placeholder=""
                      required
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <div>
                    <Input
                      className="md:mb-0 md:w-[50%]"
                      defaultValue={field.value}
                      label="Phone Number"
                      placeholder=""
                      required
                      {...field}
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <div>
                    <InputSelect
                      items={role}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label="Role"
                      placeholder="select role"
                      required
                      {...field}
                    />
                  </div>
                )}
              />
            </fieldset>

            <div className="flex items-center justify-end space-x-2">
              <Button
                disabled={isLoading.add_user}
                type="button"
                variant="outline"
                onClick={() => toggleModals()}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-400" disabled={isLoading.add_user}>
                {isLoading.add_user && <Loader className="animate-spin" />}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </XModal>
  );
};

export default observer(AddUserModal);
