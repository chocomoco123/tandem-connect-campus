
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EventRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
}

interface RegistrationFormData {
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  eventName: string;
  notes: string;
}

const EventRegistrationDialog = ({
  isOpen,
  onClose,
  eventName,
  eventId
}: EventRegistrationDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationFormData>({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      eventName: eventName
    }
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Registration data:', data);
    
    // In a real application, you would send this data to your API here
    
    toast({
      title: "Registration Submitted!",
      description: "Thank you for registering! See you at the event.",
    });
    
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>
            Please fill out the registration form for {eventName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                className="col-span-3"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.fullName.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rollNumber" className="text-right">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                className="col-span-3"
                {...register("rollNumber", { required: "Roll number is required" })}
              />
              {errors.rollNumber && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.rollNumber.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.email.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                className="col-span-3"
                {...register("department", { required: "Department is required" })}
              />
              {errors.department && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.department.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Select 
                onValueChange={(value) => {
                  register("year").onChange({ target: { value, name: "year" } });
                }}
                defaultValue=""
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FE">First Year (FE)</SelectItem>
                  <SelectItem value="SE">Second Year (SE)</SelectItem>
                  <SelectItem value="TE">Third Year (TE)</SelectItem>
                  <SelectItem value="BE">Fourth Year (BE)</SelectItem>
                </SelectContent>
              </Select>
              {errors.year && (
                <p className="text-sm text-red-500 col-start-2 col-span-3">{errors.year?.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventName" className="text-right">
                Event
              </Label>
              <Input
                id="eventName"
                className="col-span-3"
                disabled
                {...register("eventName")}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                className="col-span-3"
                placeholder="Any additional information or special requirements"
                {...register("notes")}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Registration</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationDialog;
