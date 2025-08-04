// UploadSampleView.tsx
'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import { useShowFieldTask } from '@/hooks/marketer/useFieldTask';
import { useParams, useRouter } from 'next/navigation';
import SampleCollectionSkeleton from './components/Loader';
import { Text } from '@/lib/utils/Text';
import { useFileUpload } from '@/hooks/fileUpload/useFileUpload';
import { toast } from 'react-hot-toast';
import { useUploadSample } from '@/hooks/marketer/useFieldTask';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

import PatientInfoSection from './components/PatientInfoSection';
import TestDetailsSection from './components/TestDetailsSection';
import SampleCollectionSection from './components/SampleCollectionSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import NotesSection from './components/NotesSection';
import ActionButtons from './components/ActionButtons';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, Upload } from 'lucide-react';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

interface Sample {
  id: string;
  testName: string;
  sampleType: string;
  requiredAmount: string;
  collectionStatus: boolean;
}

const UploadSampleView = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useShowFieldTask(id as string);

  const [fieldVisitData, setFieldVisitData] = useState<any>();

  // File upload mutation
  const { mutate: uploadFiles, isPending: isUploading, data: fileData } = useFileUpload();

  // Sample collection mutation
  const { mutate: submitForm, isPending: isSubmitting } = useUploadSample();

  const submitSample = (id: string, payload: TSampleCollectionData) => {
    submitForm(
      { id, payload },
      {
        onSuccess: (response) => {
          toast.success('Sample submitted successfully');
        },
        onError: (error) => {
          toast.error(`Error submitting sample: ${error.message || 'Try again'}`);
        }
      }
    );
  };
  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const visitData = data.data;
      setFieldVisitData(visitData);

      setSamples([
        {
          id: Date.now().toString(),
          testName: visitData.test?.name || '',
          sampleType: 'blood',
          requiredAmount: '3ml',
          collectionStatus: false
        }
      ]);
    }
  }, [isLoading, data]);

  const [notes, setNotes] = useState<string>('');

  // Setup react-hook-form
  const form = useForm<{ media: { file: File | TRemoteFile }[] }>({
    defaultValues: {
      media: []
    }
  });

  const {
    fields: mediaFields,
    append: mediaAppend,
    remove: mediaRemove,
    update: mediaUpdate
  } = useFieldArray({
    control: form.control,
    name: 'media'
  });

  const media = useWatch({ control: form.control, name: 'media' });

  // Handler for adding new sample row
  const handleAddSample = () => {
    const newSample: Sample = {
      id: Date.now().toString(),
      testName: fieldVisitData?.test.name || '',
      sampleType: 'blood',
      requiredAmount: '3ml',
      collectionStatus: false
    };
    setSamples([...samples, newSample]);
  };

  // Handler for removing a sample row
  const handleRemoveSample = (id: string) => {
    setSamples(samples.filter((sample) => sample.id !== id));
  };

  // Handler for updating sample test name
  const handleTestNameChange = (id: string, value: string) => {
    setSamples(
      samples.map((sample) => (sample.id === id ? { ...sample, testName: value } : sample))
    );
  };

  // Handler for updating sample type
  const handleSampleTypeChange = (id: string, value: string) => {
    setSamples(
      samples.map((sample) => (sample.id === id ? { ...sample, sampleType: value } : sample))
    );
  };

  // Handler for updating required amount
  const handleRequiredAmountChange = (id: string, value: string) => {
    setSamples(
      samples.map((sample) => (sample.id === id ? { ...sample, requiredAmount: value } : sample))
    );
  };

  // Handler for updating sample collection status
  const handlecollectionStatus = (id: string, isCollected: boolean) => {
    setSamples(
      samples.map((sample) =>
        sample.id === id ? { ...sample, collectionStatus: isCollected } : sample
      )
    );
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(e.target.value);
  };

  // Access the store at the component level
  const { AppConfigStore } = useStore();

  // Handler for updating a file with remote file info
  const handleUpdate = (index: number, remoteFile: TRemoteFile) => {
    mediaUpdate(index, { file: remoteFile });
  };

  // Handler for removing a photo
  const handleRemovePhoto = (index: number, media_uuid?: string): void => {
    mediaRemove(index);
  };

  // Function to handle opening file upload modal
  const handlerFn = (_files: File[]) => {
    mediaAppend(_files.map((file) => ({ file })));

    // Close the modal after files are appended
    AppConfigStore.toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false });
  };

  const handleSubmit = () => {
    if (samples.every((sample) => !sample.collectionStatus)) {
      toast.error('You must mark at least one sample as collected');
      return;
    }

    // Check if we have any unprocessed files (still uploading)
    const hasUnprocessedFiles = media && media.some((el) => el.file instanceof File);
    if (hasUnprocessedFiles) {
      toast.error('Please wait for all files to upload');
      return;
    }

    // Filter out any media items that aren't properly processed
    const getProcessedMedia = () => {
      if (media && media.length > 0) {
        return media
          .filter((item) => item.file && typeof item.file === 'object' && 'uuid' in item.file)
          .map((item) => ({ file: item.file as TRemoteFile }));
      }
      return [];
    };

    const formData: TSampleCollectionData = {
      logSamples: samples.map(({ id, ...rest }) => rest as unknown as TLogSample),
      collectionNotes: notes,
      media: getProcessedMedia()
    };

    submitSample(id as string, formData);
  };

  if (isLoading) {
    return <SampleCollectionSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text variant="title" weight="semibold" className="text-red-500">
          No data available
        </Text>
      </div>
    );
  }

  const hasSubmittedLogSample =
    fieldVisitData?.samplePhotos && fieldVisitData.samplePhotos.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 shadow-sm">
        <Text variant="title" weight="semibold">
          Upload Sample
        </Text>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          <ArrowLeft className="mr-2 inline-block" />
          Back
        </button>
      </div>
      <PatientInfoSection fieldVisitData={fieldVisitData} />

      {/* <TestDetailsSection fieldVisitData={fieldVisitData} /> */}

      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Log Samples
        </Text>
        <div className="space-y-4">
          <SampleCollectionSection
            samples={samples}
            onAddSample={handleAddSample}
            onRemoveSample={handleRemoveSample}
            onTestNameChange={handleTestNameChange}
            onSampleTypeChange={handleSampleTypeChange}
            onRequiredAmountChange={handleRequiredAmountChange}
            onCollectionStatusChange={handlecollectionStatus}
            fieldVisitData={fieldVisitData}
          />

          <PhotoUploadSection
            mediaFields={mediaFields}
            onUpdate={handleUpdate}
            onRemove={handleRemovePhoto}
            onPhotoUpload={handlerFn}
            fieldVisitData={fieldVisitData}
          />

          <NotesSection
            notes={notes}
            onNotesChange={handleNoteChange}
            fieldVisitData={fieldVisitData}
          />

          {!hasSubmittedLogSample && (
            <ActionButtons
              onCancel={() => router.back()}
              onSubmit={handleSubmit}
              isLoading={isUploading || isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSampleView;
