import FieldSet from '@/atoms/fields/FieldSet';
import Input from '@/atoms/fields/Input';
import { XModal } from '@/atoms/modal';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfigStore/appModalTypes';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const ResultUploadModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Range</TableHead>
                  <TableHead className="w-[30px]">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input />
                  </TableCell>
                  <TableCell>
                    <Input />
                  </TableCell>
                  <TableCell>
                    <Input />
                  </TableCell>
                  <TableCell className="w-[30px]">
                    <Input className="w-full" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </XModal>
  );
};

export default observer(ResultUploadModal);
