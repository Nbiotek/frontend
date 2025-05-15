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

import PatientInfoSection from './components/PatientInfoSection';
import TestDetailsSection from './components/TestDetailsSection';
import SampleCollectionSection from './components/SampleCollectionSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import NotesSection from './components/NotesSection';
import ActionButtons from './components/ActionButtons';

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

  const [fieldVisitData, setFieldVisitData] = useState<FieldTaskData>();

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
  const [samplePhotos, setSamplePhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

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

  // Handler for photo upload - supports multiple files
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSamplePhotos([...samplePhotos, ...newFiles]);

      // Create preview URLs for all new files
      const newPreviewUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setPhotoPreviewUrls([...photoPreviewUrls, ...newPreviewUrls]);
    }
  };

  // Handler for removing a photo
  const handleRemovePhoto = (index: number): void => {
    const updatedPhotos = [...samplePhotos];
    const updatedPreviewUrls = [...photoPreviewUrls];

    URL.revokeObjectURL(updatedPreviewUrls[index]);

    updatedPhotos.splice(index, 1);
    updatedPreviewUrls.splice(index, 1);

    setSamplePhotos(updatedPhotos);
    setPhotoPreviewUrls(updatedPreviewUrls);
  };

  useEffect(() => {
    return () => {
      photoPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleSubmit = () => {
    if (samples.every((sample) => !sample.collectionStatus)) {
      toast.error('You must mark at least one sample as collected');
      return;
    }

    if (samplePhotos.length > 0) {
      uploadFiles(samplePhotos, {
        onSuccess: (uploadResponse) => {
          const fileIds = uploadResponse.data || [];

          const formData = {
            logSamples: samples.map(({ id, ...rest }) => rest),
            collectionNotes: notes,
            samplePhotos: fileIds
          };
          console.log('Form data:', formData);

          submitSample(id as string, formData);
        },
        onError: (error: any) => {
          toast.error(`Error uploading photos: ${error.message || 'Unknown error'}`);
        }
      });
    } else {
      const formData = {
        logSamples: samples,
        collectionNotes: notes,
        samplePhotos: []
      };

      submitSample(id as string, formData);
    }
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
      <PatientInfoSection fieldVisitData={fieldVisitData} />

      <TestDetailsSection fieldVisitData={fieldVisitData} />

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
            photoPreviewUrls={photoPreviewUrls}
            onRemovePhoto={handleRemovePhoto}
            onPhotoUpload={handlePhotoUpload}
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
