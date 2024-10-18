import React, { useEffect, useState } from "react";

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const DateModal: React.FC<DateModalProps> = ({
  isOpen,
  onClose,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Initialize with today's date

  // Set the default selected date to today when the modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(new Date()); // Reset to today when modal opens
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onSelectDate(selectedDate); // Pass the selected date to the parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="flex flex-col bg-white p-5 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Select a Date</h2>
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]} // Format date for input
          onChange={(e) => setSelectedDate(new Date(e.target.value))} // Update state
          className="border border-gray-300 rounded-lg p-2 w-full text-black"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;
