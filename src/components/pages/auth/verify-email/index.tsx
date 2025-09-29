// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// Icons
import { Mail, Loader2, CheckCircle, RefreshCw } from "lucide-react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// React
import { useState, useEffect } from "react";

// React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// i18Next
import { useTranslation } from "next-i18next";

// Utils
import instance from "@/utils/axios";
import { toast } from "sonner";

const verifyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z.string().length(6, "Verification code must be 6 digits"),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmail() {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  // URL'den email parametresini al
  useEffect(() => {
    if (router.query.email) {
      setValue("email", router.query.email as string);
    }
  }, [router.query.email, setValue]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const onSubmit = async (data: VerifyEmailFormData) => {
    try {
      setError(null);
      setSuccess(null);
      
      const response = await instance.post("/auth/verify-email", {
        email: data.email,
        code: data.code,
      });

      if (response.data.status === 'success') {
        setSuccess("Your email has been successfully verified! Redirecting to login page...");
        toast.success("Email verification successful!");
        
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Verify email error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred during verification. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const resendCode = async () => {
    const email = watch("email");
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsResending(true);
      setError(null);
      
      const response = await instance.post("/auth/resend-verification-code", {
        email: email,
      });

      if (response.data.status === 'success') {
        toast.success("New verification code sent!");
        setCountdown(60); // 60 saniye bekletme
      }
    } catch (error: any) {
      console.error("Resend code error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred while sending the code.";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="font-bold text-4xl">BoenCV</span>
          </div>
          <p className="text-gray-600 mt-2">Verify your email address</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Email Verification</CardTitle>
            <CardDescription>
              Enter the 6-digit verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10"
                    {...register("email")}
                    disabled={isSubmitting || !!router.query.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  {...register("code")}
                  disabled={isSubmitting}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resendCode}
                  disabled={isResending || countdown > 0}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : countdown > 0 ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend ({countdown}s)
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend code
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-600">
                Return to login page{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  click here
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
