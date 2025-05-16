import Button from '@/atoms/Buttons';

interface ActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ActionButtons = ({ onCancel, onSubmit, isLoading }: ActionButtonsProps) => {
  return (
    <div className="mt-6 flex justify-end space-x-4">
      <button
        className="border-gray-300 hover:bg-gray-50 rounded border px-4 py-2"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
      <Button
        className="hover:bg-green-700 w-fit rounded bg-green-400 px-4 py-2 text-white"
        type="button"
        variant="outlined"
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Confirm Collection'}
      </Button>
    </div>
  );
};

export default ActionButtons;
