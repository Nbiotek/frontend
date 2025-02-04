import FieldSet from '@/atoms/fields/FieldSet';
import Input from '@/atoms/fields/Input';
import { XModal } from '@/atoms/modal';
import { Paragraph } from '@/atoms/typographys';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfigStore/appModalTypes';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useFieldArray, useForm } from 'react-hook-form';
import { testResultsSchema, TTestResultsTypeSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/atoms/Buttons';
import { Trash } from 'lucide-react';

const ResultUploadModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();

  const {
    control,
    resetField,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    trigger
  } = useForm<TTestResultsTypeSchema>({
    defaultValues: {
      test_parameters: [{ parameter: '', result: '', range: '', unit: '', reference: '' }]
    },
    mode: 'onChange',
    resolver: zodResolver(testResultsSchema),
    reValidateMode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test_parameters'
  });
  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.RESULT_UPLOAD_MODAL, open: false })}
      bgClose={false}
      isOpen={isOpen.RESULT_UPLOAD_MODAL}
      className="!max-w-[1440px]"
      title="Result Upload"
    >
      <div className="flex w-full flex-col space-y-8">
        <div className="flex w-full flex-col space-y-1">
          <Paragraph className="text-lg !font-medium" text="Test Information" />

          <div className="flex w-full flex-col space-y-1">
            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <FieldSet className="md:w-[60%]" legend="Patient Name" text="Ahmed Musa Zola" />
              <FieldSet className="md:w-[20%]" legend="Test type" text="CBC" />
              <FieldSet className="md:w-[20%]" legend="Test Date" text="2nd Sept. 2024" />
            </div>

            <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <FieldSet className="md:w-[80%]" legend="Clinician Name" text="Lawrence Afolabi" />
              <FieldSet className="md:w-[20%]" legend="Signature" text="Lawrence" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col space-y-1">
          <Paragraph className="text-lg !font-medium" text="Test Result" />

          <div className="flex w-full flex-col space-y-1">
            <div className="h-auto max-h-[450px] w-full overflow-y-scroll">
              <Table className="relative">
                <TableHeader className="sticky top-0 z-30">
                  <TableRow>
                    <TableHead className="w-[10px]">S/N</TableHead>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="w-[10px]">Unit</TableHead>
                    <TableHead className="w-[10px]">Range</TableHead>
                    <TableHead>Reference</TableHead>
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
                          <Input {...register(`test_parameters.${index}.parameter`)} />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`test_parameters.${index}.result`)} />
                        </TableCell>
                        <TableCell className="w-[10px]">
                          <Input {...register(`test_parameters.${index}.unit`)} />
                        </TableCell>
                        <TableCell className="w-[10px]">
                          <Input {...register(`test_parameters.${index}.range`)} />
                        </TableCell>
                        <TableCell>
                          <Input {...register(`test_parameters.${index}.reference`)} />
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

            <div className="flex items-center justify-end">
              <Button
                className="!h-[35px] !w-auto !text-xs"
                variant={'filled'}
                text="Add Parameter"
                onClick={() =>
                  append({ parameter: '', result: '', range: '', unit: '', reference: '' })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </XModal>
  );
};

export default observer(ResultUploadModal);
