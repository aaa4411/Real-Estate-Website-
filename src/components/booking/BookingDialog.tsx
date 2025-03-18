import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import BookingCalendar, { BookingDetails } from "./BookingCalendar";

interface BookingDialogProps {
  propertyId?: string;
  propertyTitle?: string;
  trigger?: React.ReactNode;
  onBookingComplete?: (bookingDetails: BookingDetails) => void;
}

const BookingDialog = ({
  propertyId = "1",
  propertyTitle = "Property",
  trigger,
  onBookingComplete = () => {},
}: BookingDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleBookingComplete = (bookingDetails: BookingDetails) => {
    onBookingComplete(bookingDetails);
    // Dialog will remain open to show the confirmation screen
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Calendar className="h-4 w-4 mr-2" /> Book Viewing
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a Viewing</DialogTitle>
          <DialogDescription>
            Select a date and time to view this property in person.
          </DialogDescription>
        </DialogHeader>
        <BookingCalendar
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          onBookingComplete={handleBookingComplete}
          onCancel={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
