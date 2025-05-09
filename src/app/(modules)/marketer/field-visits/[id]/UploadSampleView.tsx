'use client';
import FieldSet from '@/atoms/fields/FieldSet';
import ResultFieldHeader from '@/atoms/fields/ResultFields';
import { Text } from '@/lib/utils/Text';
import { useState, ChangeEvent, useEffect } from 'react';
import { useShowFieldTask } from '@/hooks/marketer/useFieldTask';
import { useParams } from 'next/navigation';
import SampleCollectionSkeleton from './components/Loader';
import { dateTimeUTC } from '@/utils/date';
import ResultField from '@/app/(modules)/patient/result/components/ResultField';

// Define types
interface Sample {
  id: string;
  testName: string;
  sampleType: string;
  requiredAmount: string;
  sampleCollected: boolean;
}

const UploadSampleView = () => {
  const { id } = useParams();
  const { data, isLoading } = useShowFieldTask(id as string);
  const [fieldVisitData, setFieldVisitData] = useState<FieldTaskData>();

  // Sample state
  const [samples, setSamples] = useState<Sample[]>([
    {
      id: '1',
      testName: 'CBC Blood Group',
      sampleType: 'blood',
      requiredAmount: '3ml',
      sampleCollected: false
    }
  ]);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setFieldVisitData(data.data);
    }
  }, [isLoading]);

  const [notes, setNotes] = useState<string>('');
  const [samplePhoto, setSamplePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Handler for adding new sample row
  const handleAddSample = () => {
    const newSample: Sample = {
      id: Date.now().toString(),
      testName: '',
      sampleType: 'blood',
      requiredAmount: '3ml',
      sampleCollected: false
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
  const handleSampleCollected = (id: string, isCollected: boolean) => {
    setSamples(
      samples.map((sample) =>
        sample.id === id ? { ...sample, sampleCollected: isCollected } : sample
      )
    );
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(e.target.value);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSamplePhoto(file);

      // Create a preview URL for the uploaded image
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (): void => {
    setSamplePhoto(null);
    setPhotoPreview(null);
  };

  // Handler for form submission
  const handleSubmit = () => {
    // Collect all the data
    const formData = {
      logSamples: samples,
      collectionNotes: notes,
      samplePhotos: samplePhoto
    };

    console.log('Form Data:', formData);
    // Add your API call here
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

  return (
    <div className="space-y-4">
      {/* Patient Information Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Patient Information
        </Text>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-3">
          <FieldSet legend="Patient Name" text={fieldVisitData?.patient.name} />
          <FieldSet legend="Test Ordered" text={fieldVisitData?.test.name} />
          <FieldSet
            legend="Collection Date"
            text={dateTimeUTC(fieldVisitData?.collectionDate || '')}
          />
        </div>
      </div>

      {/* Test Ordered Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Test Details
        </Text>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FieldSet legend="CBC" text={fieldVisitData?.test.name} />
          <FieldSet legend="Technician" text={fieldVisitData?.technician.name} />
          <FieldSet
            legend="Request Date"
            text={
              fieldVisitData?.createdAt ? dateTimeUTC(fieldVisitData?.createdAt, false) : 'Nill'
            }
          />
          <FieldSet
            legend="Due Date"
            text={fieldVisitData?.dateDue ? dateTimeUTC(fieldVisitData?.dateDue, false) : 'Nill'}
          />
        </div>
      </div>

      {/* Log Samples Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Log Samples
        </Text>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-3 pb-4 font-medium">
            <ResultFieldHeader text="Test Name" head={true} className="w-1/4" />
            <ResultFieldHeader text="Sample Type" head={true} className="w-1/5" />
            <ResultFieldHeader text="Required Amount" head={true} className="w-1/5" />
            <ResultFieldHeader text="Collection Status" head={true} className="w-1/3" />
          </div>

          {/* Sample Rows */}
          <div className="space-y-3">
            {samples.map((sample, index) => (
              <div key={sample.id} className="grid grid-cols-4 gap-4 border-b pb-2">
                <div className="">
                  {index === 0 ? (
                    <div className="text-gray-700 rounded border p-2 font-medium">
                      CBC Blood Group
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="border-gray-300 w-full rounded border p-2"
                      value={sample.testName}
                      onChange={(e) => handleTestNameChange(sample.id, e.target.value)}
                      placeholder="Enter test name"
                    />
                  )}
                </div>

                <div className="">
                  <select
                    className="border-gray-300 w-full rounded border p-2"
                    value={sample.sampleType}
                    onChange={(e) => handleSampleTypeChange(sample.id, e.target.value)}
                  >
                    <option value="blood">Blood</option>
                    <option value="urine">Urine</option>
                    <option value="stool">Stool</option>
                    <option value="saliva">Saliva</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="">
                  <select
                    className="border-gray-300 w-full rounded border p-2"
                    value={sample.requiredAmount}
                    onChange={(e) => handleRequiredAmountChange(sample.id, e.target.value)}
                  >
                    <option value="3ml">3ml</option>
                    <option value="4ml">4ml</option>
                    <option value="not-required">Not Required</option>
                  </select>
                </div>

                <div className="flex  items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={sample.sampleCollected}
                      onChange={(e) => handleSampleCollected(sample.id, e.target.checked)}
                      id={`sample-collected-${sample.id}`}
                    />
                    <label htmlFor={`sample-collected-${sample.id}`} className="ml-2">
                      Sample Collected
                    </label>
                  </div>

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSample(sample.id)}
                      className="hover:text-red-700 text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Sample Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handleAddSample}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Another Sample
            </button>
          </div>

          {/* Photo Upload Section */}
          <div className="mt-6 pt-2">
            <Text variant="subtitle" weight="medium" className="mb-2">
              Sample Photos
            </Text>

            <div className="mt-2">
              {photoPreview ? (
                <div className="relative mt-2">
                  <img
                    src={photoPreview}
                    alt="Sample vials"
                    className="border-gray-300 max-h-48 rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-lg bg-neutral-100 p-6">
                  <label htmlFor="photo-upload" className="flex w-full cursor-pointer items-center">
                    <span className="text-gray-500 mb-1 block w-full border-2 border-dashed border-neutral-300 p-4 text-center text-sm font-semibold text-neutral-300">
                      Upload a photo of the labeled sample vials.
                    </span>

                    <input
                      id="photo-upload"
                      name="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Collection Notes Section */}
          <div className="mt-6 pt-2">
            <Text variant="subtitle" weight="medium" className="mb-2">
              Collection Notes
            </Text>
            <textarea
              className="border-gray-300 min-h-[100px] w-full rounded border p-3"
              placeholder="Add any notes about the sample collection process (e.g., patient condition, collection difficulties, etc.)"
              value={notes}
              onChange={handleNoteChange}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="border-gray-300 hover:bg-gray-50 rounded border px-4 py-2"
              type="button"
            >
              Cancel
            </button>
            <button
              className="hover:bg-green-700 rounded bg-green-400 px-4 py-2 text-white"
              type="button"
              onClick={handleSubmit}
            >
              Confirm Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSampleView;
