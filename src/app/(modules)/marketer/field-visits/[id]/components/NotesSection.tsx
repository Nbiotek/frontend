import { Text } from '@/lib/utils/Text';
import { ChangeEvent } from 'react';

interface NotesProps {
  notes: string;
  onNotesChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fieldVisitData: FieldTaskData | undefined;
}

const NotesSection = ({ notes, onNotesChange, fieldVisitData }: NotesProps) => {
  const hasNoteCollection = fieldVisitData?.notes !== null || undefined;
  return (
    <div className="mt-6 pt-2">
      <Text variant="subtitle" weight="medium" className="mb-2">
        Collection Notes
      </Text>
      {hasNoteCollection ? (
        <div className="border-gray-300 min-h-[100px] w-full overflow-auto rounded border p-3">
          {fieldVisitData?.notes}
        </div>
      ) : (
        <textarea
          className="border-gray-300 min-h-[100px] w-full rounded border p-3"
          placeholder="Add any notes about the sample collection process (e.g., patient condition, collection difficulties, etc.)"
          value={notes}
          onChange={onNotesChange}
        ></textarea>
      )}
    </div>
  );
};

export default NotesSection;
