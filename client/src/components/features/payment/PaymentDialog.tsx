"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shadcn/ui/dialog";
import { Button } from "@/src/shadcn/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { CreditCard, Lock, Sparkles } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

interface PaymentDialogProps {
  trigger: React.ReactNode;
  stripePromise: any;
  clientSecret: string;
  data: any;
  user: any;
}

const PaymentDialog = ({
  trigger,
  stripePromise,
  clientSecret,
  data,
  user,
}: PaymentDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary-dark/10 dark:via-primary-dark/5 dark:to-primary-dark/10"></div>
          <DialogHeader className="relative p-4 pb-2">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-gradient-to-r from-primary to-primary/80 dark:from-primary-dark dark:to-primary-dark/80 rounded-full shadow-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>
            <DialogTitle className="text-xl text-gray-900 dark:text-white text-center font-bold">
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300 text-center text-sm">
              Secure payment powered by Stripe
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Course info card */}
        <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 dark:from-primary-dark dark:to-primary-dark/80 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {data?.name || "Premium Course"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Lifetime access
              </p>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-gray-900 dark:text-white">
                ${data?.discountedPrice || data?.price}
              </div>
              {data?.discountedPrice && data?.discountedPrice < data?.price && (
                <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ${data?.price}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment form */}
        <div className="px-4 pb-4">
          {stripePromise && clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm data={data} user={user} />
            </Elements>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-primary/20 border-t-primary dark:border-primary-dark/20 dark:border-t-primary-dark mx-auto mb-3"></div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Loading payment form...
                </p>
                <div className="flex items-center justify-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-3 w-3 mr-1" />
                  SSL Encrypted
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Secure
            </div>
            <div className="flex items-center">
              <CreditCard className="h-3 w-3 mr-1" />
              Cards
            </div>
            <div className="flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Instant
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
