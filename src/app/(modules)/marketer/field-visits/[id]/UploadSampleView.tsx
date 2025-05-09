'use client';
import FieldSet from '@/atoms/fields/FieldSet';
import ResultFieldHeader from '@/atoms/fields/ResultFields';
import { Text } from '@/lib/utils/Text';
import { useState, ChangeEvent } from 'react';
import { useShowFieldTask } from '@/hooks/marketer/useFieldTask';

// Define types
interface Sample {
  id: number;
  testName: string;
  sampleCollected: boolean;
  sampleType: string;
  units: string;
  requiredAmount: string;
}

const UploadSampleView = () => {
  const [notes, setNotes] = useState<string>('');
  const [samplePhoto, setSamplePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [samples, setSamples] = useState<Sample[]>([
    {
      id: 1,
      testName: 'Complete Blood Count (CBC)',
      sampleCollected: false,
      sampleType: 'Blood',
      units: 'mL',
      requiredAmount: '5'
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      sampleCollected: false,
      sampleType: 'Blood',
      units: 'mL',
      requiredAmount: '3'
    },
    {
      id: 3,
      testName: 'Urinalysis',
      sampleCollected: false,
      sampleType: 'Urine',
      units: 'mL',
      requiredAmount: '40'
    }
  ]);

  const handleSampleCollected = (id: number, isCollected: boolean): void => {
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

  return (
    <div className="space-y-4">
      {/* Patient Information Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Patient Information
        </Text>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FieldSet legend="Patient Name" text={'David Johnson'} />
          <FieldSet legend="Test Ordered" text={'Multiple (3)'} />
          <FieldSet legend="Collection Date" text={'15-04-2023'} />
          <FieldSet legend="Patient ID" text={'PAT-2023-0456'} />
        </div>
      </div>

      {/* Test Ordered Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Test Ordered
        </Text>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FieldSet legend="CBC" text={'Dr. Sarah Wilson'} />
          <FieldSet legend="Lipid Panel" text={'Dr. Sarah Wilson'} />
          <FieldSet legend="Urinalysis" text={'Dr. Sarah Wilson'} />
          <FieldSet legend="Request Date" text={'10-04-2023'} />
        </div>
      </div>

      {/* Log Samples Section */}
      <div className="bg-white p-6">
        <Text variant="title" weight="semibold" className="mb-6 border-b pb-2">
          Log Samples
        </Text>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="flex space-x-6 border-b pb-4 font-medium">
            <ResultFieldHeader text="Test Name" head={true} className="w-1/4" />
            <ResultFieldHeader text="Sample Type" head={true} className="w-1/5" />
            <ResultFieldHeader text="Required Amount" head={true} className="w-1/5" />
            <ResultFieldHeader text="Collection Status" head={true} className="w-1/3" />
          </div>

          {/* Sample Collection Rows */}
          {samples.map((sample) => (
            <div
              key={sample.id}
              className="border-gray-200 flex items-start space-x-6 border-b-2 border-dotted pb-4"
            >
              <div className="w-1/4 font-medium">{sample.testName}</div>
              <div className="w-1/5">{sample.sampleType}</div>
              <div className="w-1/5">
                {sample.requiredAmount} {sample.units}
              </div>
              <div className="w-1/3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`sample-${sample.id}`}
                    checked={sample.sampleCollected}
                    onChange={(e) => handleSampleCollected(sample.id, e.target.checked)}
                    className="text-blue-600 h-5 w-5"
                  />
                  <label
                    htmlFor={`sample-${sample.id}`}
                    className="text-gray-700 text-sm font-medium"
                  >
                    {sample.sampleCollected ? 'Collected' : 'Mark as collected'}
                  </label>
                </div>
              </div>
            </div>
          ))}

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
                <div className="flex items-center  justify-center rounded-lg bg-neutral-100 p-6">
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
