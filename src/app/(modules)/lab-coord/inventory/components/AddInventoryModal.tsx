'use client';
import Input from '@/atoms/fields/Input';
import { XModal } from '@/atoms/modal';
import { Paragraph } from '@/atoms/typographys';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { addInventorySchema, TAddInventorySchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/atoms/Buttons';
import { Plus, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '@/atoms/Toast';
import { postCreateInventory } from '@/requests/lab-coord';
import { LAB_COORD } from '@/constants/api';
import CustomDate from '@/atoms/fields/CustomDate';

const AddInventoryModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postCreateInventory,
    onError: () => {
      Toast.error('Unable to add inventory!');
    },
    onSuccess: () => {
      toggleModals({});
      queryClient.invalidateQueries({ queryKey: [LAB_COORD.DASHBOARD] });
      Toast.success('Inventory added successful!');
    }
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TAddInventorySchema>({
    defaultValues: {
      items: [
        {
          name: '',
          category: '',
          stockQuantity: 0,
          unit: '',
          reorderLevel: 0,
          supplierName: '',
          supplierContact: '',
          expiryDate: ''
        }
      ]
    },
    mode: 'onChange',
    resolver: zodResolver(addInventorySchema),
    reValidateMode: 'onChange'
  });

  const onSubmit: SubmitHandler<TAddInventorySchema> = async (formData) => {
    // TODO: Never upload an empty row.s
    console.log(formData);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });
  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.ADD_INVENTORY, open: false })}
      bgClose={false}
      isOpen={isOpen.ADD_INVENTORY}
      className="!max-w-[1440px]"
      title="Add Inventory"
    >
      <div className="flex w-full flex-col space-y-8">
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px]">S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[10px]">Qty</TableHead>
              <TableHead className="w-[10px]">Unit</TableHead>
              <TableHead className="w-[10px]">re-order level</TableHead>
              <TableHead className="">Supplier Name</TableHead>
              <TableHead className="">Supplier Contact</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="w-[20px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow key={field.id} className="hover:!bg-transparent">
                  <TableCell>
                    <div className="">
                      <p>{index + 1}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.name`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.category`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.stockQuantity`)} />
                  </TableCell>
                  <TableCell>
                    <Input className="w-[10px]" {...register(`items.${index}.unit`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.reorderLevel`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.supplierName`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.supplierContact`)} />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`items.${index}.expiryDate`)} />
                  </TableCell>
                  <TableCell className="w-[20px]">
                    <div
                      className={`cursor-pointer flex-col items-center justify-center text-red-400 ${fields.length > 1 ? 'flex' : 'hidden'}`}
                      onClick={() => remove(index)}
                    >
                      <Trash size={20} />
                      <p className="invisible">pad</p>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col space-y-1">
          <Paragraph className="text-lg !font-medium" text="Items" />

          <div className="h-auto max-h-[450px] w-full overflow-y-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10px]">S/N</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>re-order level</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Supplier Contact</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="w-[20px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => {
                  return (
                    <TableRow key={field.id} className="hover:!bg-transparent">
                      <TableCell>
                        <div className="">
                          <p>{index + 1}</p>
                          <p className="invisible">pad</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input {...register(`items.${index}.name`)} />
                      </TableCell>
                      <TableCell>
                        <Input {...register(`items.${index}.category`)} />
                      </TableCell>
                      <TableCell>
                        <div className="w-[100px]">
                          <Input {...register(`items.${index}.stockQuantity`)} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-[100px]">
                          <Input {...register(`items.${index}.unit`)} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-[100px]">
                          <Input {...register(`items.${index}.reorderLevel`)} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input {...register(`items.${index}.supplierName`)} />
                      </TableCell>
                      <TableCell>
                        <Input {...register(`items.${index}.supplierContact`)} />
                      </TableCell>
                      <TableCell>
                        <CustomDate
                          handleSetDate={function (date: Date): void {
                            throw new Error('Function not implemented.');
                          }}
                        />
                      </TableCell>
                      <TableCell className="w-[20px]">
                        <div
                          className={`cursor-pointer flex-col items-center justify-center text-red-400 ${fields.length > 1 ? 'flex' : 'hidden'}`}
                          onClick={() => remove(index)}
                        >
                          <Trash size={20} />
                          <p className="invisible">pad</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Button
              className="!h-[35px] !w-auto !text-xs"
              variant="filled"
              text="Add inventory"
              type="submit"
              disabled={isPending}
              isLoading={isPending}
            />
            <Button
              disabled={isPending}
              type="button"
              className="!h-[35px] !w-auto !text-xs"
              variant="light"
              text="Add Item"
              leftIcon={<Plus />}
              onClick={() =>
                append({
                  name: '',
                  category: '',
                  stockQuantity: 0,
                  unit: '',
                  reorderLevel: 0,
                  supplierName: '',
                  supplierContact: '',
                  expiryDate: ''
                })
              }
            />
          </div>
        </form>
      </div>
    </XModal>
  );
};

export default observer(AddInventoryModal);
