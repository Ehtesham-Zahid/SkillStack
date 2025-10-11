import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/src/redux/features/order/orderApi";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Mail,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const CheckoutForm = ({ data }: { data: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [isElementsReady, setIsElementsReady] = useState<boolean>(false);
  const [
    createOrder,
    {
      data: orderData,
      isLoading: isCreateOrderLoading,
      isError: isCreateOrderError,
      isSuccess: isCreateOrderSuccess,
      error: createOrderError,
    },
  ] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const {} = useLoadUserQuery({
    skip: loadUser ? false : true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setIsLoading(false);
      setMessage(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      await createOrder({
        courseId: data?._id,
        paymentInfo: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const checkElementsReady = () => {
      if (elements) {
        setIsElementsReady(true);
      }
    };

    // Check if elements are ready
    checkElementsReady();
  }, [stripe, elements]);

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${data?._id}`);
    }
    if (isCreateOrderError) {
      if ("data" in createOrderError) {
        const errorMessage = createOrderError as any;
        toast.error(errorMessage.data.message || "Payment failed");
      }
    }
  }, [isCreateOrderError, orderData]);

  return (
    <div className="space-y-4">
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Email Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Mail className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <label className="text-xs font-semibold text-gray-700 dark:text-white">
              Email Address
            </label>
          </div>
          <div className="relative">
            <LinkAuthenticationElement
              id="link-authentication-element"
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus-within:border-primary dark:focus-within:border-primary-dark transition-colors duration-200 shadow-sm hover:shadow-md"
              // Access the email value like so:
              // onChange={(event) => {
              //  setEmail(event.value.email);
              // }}
              //
              // Prefill the email field like so:
              // options={{defaultValues: {email: 'foo@bar.com'}}}
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CreditCard className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <label className="text-xs font-semibold text-gray-700 dark:text-white">
              Payment Method
            </label>
          </div>
          <div className="relative">
            <PaymentElement
              id="payment-element"
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus-within:border-primary dark:focus-within:border-primary-dark transition-colors duration-200 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="text-xs text-green-700 dark:text-green-300">
            <p className="font-medium">Your payment is secure</p>
            <p className="text-xs opacity-80">
              Protected by 256-bit SSL encryption
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements || !isElementsReady}
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 dark:from-primary-dark dark:to-primary-dark/90 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/80 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center space-x-2 group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Complete Purchase</span>
              <span className="text-sm opacity-80">
                ${data?.discountedPrice || data?.price}
              </span>
            </>
          )}
        </button>

        {/* Error Message */}
        {message && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="text-xs text-red-700 dark:text-red-300">
              <p className="font-medium">Payment Error</p>
              <p className="text-xs opacity-80">{message}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isCreateOrderSuccess && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div className="text-xs text-green-700 dark:text-green-300">
              <p className="font-medium">Payment Successful!</p>
              <p className="text-xs opacity-80">
                Redirecting to your course...
              </p>
            </div>
          </div>
        )}
      </form>

      {/* Trust Indicators */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <CreditCard className="h-3 w-3" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Money Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
