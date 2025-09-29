/*
  @param date: Date - Date object to calculate time ago
  @return string
*/

import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const publishedTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " yıl önce";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " ay önce";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " gün önce";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " saat önce";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " dakika önce";
  }
  return Math.floor(seconds) + " saniye önce";
};

export const slugify = function (text: string) {
  const trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };
  for (const key in trMap) {
    text = text.replace(
      new RegExp("[" + key + "]", "g"),
      trMap[key as keyof typeof trMap]
    );
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
    .replace(/\s/gi, "-") // convert spaces to dashes
    .replace(/[-]+/gi, "-") // trim repeated dashes
    .toLowerCase();
};

export const uniqueFileName = (rawName: string) => {
  const fileName = `${Math.random().toString(36).substring(2, 15)}-${rawName}`;
  return fileName;
};

export const getBase64 = (file: File) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const generateSlug = (nameWithoutTurkish: string) => {
  // Türkçe karakterleri dönüştür
  const turkishMap: Record<string, string> = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  const slug = nameWithoutTurkish
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return slug;
};

import { toast } from "react-toastify";

type AsyncFunc<T> = (...args: any[]) => Promise<T>;

interface ErrorHandlingOptions {
  onError?: (error: any, errorMessage: string | null) => void;
  onFinally?: () => void;
  setLoading?: (loading: boolean) => void;
  showToast?: boolean;
}

export function withErrorHandling<T extends AsyncFunc<any>>(
  fn: T,
  options?: ErrorHandlingOptions
): T {
  return (async (...args: Parameters<T>) => {
    if (options?.setLoading) options.setLoading(true);

    try {
      const result = await fn(...args);
      return result;
    } catch (error: any) {
      const details = error?.response?.data?.details;
      const errorMsgFromDetails = Array.isArray(details)
        ? details
            .map((d: { message?: string }) => d.message)
            .filter(Boolean)
            .join(", ")
        : null;

      const errorMessage =
        errorMsgFromDetails ||
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Beklenmeyen bir hata oluştu.";

      if (options?.showToast ?? true) {
        toast.error(errorMessage);
      }

      if (options?.onError) {
        options.onError(error, errorMessage);
      }

      return null;
    } finally {
      if (options?.setLoading) options.setLoading(false);
      if (options?.onFinally) options.onFinally();
    }
  }) as T;
}
