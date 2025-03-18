import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingCalendarProps {
  propertyId?: string;
  propertyTitle?: string;
  onBookingComplete?: (bookingDetails: BookingDetails) => void;
  onCancel?: () => void;
  className?: string;
}

export interface BookingDetails {
  propertyId: string;
  date: Date;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const BookingCalendar = ({
  propertyId = "1",
  propertyTitle = "Property",
  onBookingComplete = () => {},
  onCancel = () => {},
  className = "",
}: BookingCalendarProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    // Disable past dates and weekends (0 = Sunday, 6 = Saturday)
    return date < today || day === 0 || day === 6;
  };

  const handleNextStep = () => {
    if (step === 1 && date && selectedTimeSlot) {
      setStep(2);
    } else if (step === 2 && name && email && phone) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (!date || !selectedTimeSlot || !name || !email || !phone) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const bookingDetails: BookingDetails = {
        propertyId,
        date: date,
        timeSlot: selectedTimeSlot,
        name,
        email,
        phone,
        notes,
      };

      onBookingComplete(bookingDetails);
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className={cn("p-6 bg-white rounded-lg shadow-md", className)}>
        <div className="text-center py-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Booking Confirmed!</h2>
          <p className="mt-2 text-muted-foreground">
            Your viewing for {propertyTitle} has been scheduled for{" "}
            {date && format(date, "EEEE, MMMM do, yyyy")} at {selectedTimeSlot}.
          </p>
          <p className="mt-1 text-muted-foreground">
            A confirmation email has been sent to {email}.
          </p>
          <Button className="mt-6" onClick={onCancel}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-xl font-semibold mb-6">
        Schedule a Viewing for {propertyTitle}
      </h2>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="block mb-2">Select a Date</Label>
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate as (date?: Date) => void}
                disabled={disabledDays}
                className="mx-auto"
                initialFocus
              />
            </div>
          </div>

          {date && (
            <div>
              <Label className="block mb-2">Select a Time Slot</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTimeSlot === time ? "default" : "outline"}
                    className="flex items-center justify-center gap-2"
                    onClick={() => setSelectedTimeSlot(time)}
                  >
                    <Clock className="h-4 w-4" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!date || !selectedTimeSlot}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your full name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific questions or requests?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!name || !email || !phone}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-md">
            <h3 className="font-medium mb-4">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property:</span>
                <span className="font-medium">{propertyTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {date && format(date, "EEEE, MMMM do, yyyy")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{phone}</span>
              </div>
              {notes && (
                <div className="pt-2">
                  <span className="text-muted-foreground block">Notes:</span>
                  <span className="font-medium">{notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevStep}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
