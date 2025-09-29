"use client";

import * as React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple dropdown implementation without Radix UI
const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(DropdownMenuContext);

  if (asChild) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...child.props,
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        setOpen(true);
      },
      ref,
    });
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: "start" | "center" | "end";
    forceMount?: boolean;
  }
>(({ className, children, align = "center", ...props }, ref) => {
  const { open, setOpen } = React.useContext(DropdownMenuContext);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref &&
        "current" in ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen, ref]);

  if (!open) return null;

  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full mt-1 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md",
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(DropdownMenuContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(e);
    setOpen(false);
  };

  if (asChild) {
    const child = children as React.ReactElement;
    return React.cloneElement(child, {
      ...(child.props as any),
      onClick: handleClick,
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className,
        (child.props as any).className
      ),
    });
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-gray-900", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// Placeholder components for compatibility
const DropdownMenuGroup = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const DropdownMenuSub = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const DropdownMenuRadioGroup = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
const DropdownMenuSubTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
const DropdownMenuSubContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
const DropdownMenuCheckboxItem = ({
  children,
}: {
  children: React.ReactNode;
}) => <>{children}</>;
const DropdownMenuRadioItem = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const DropdownMenuShortcut = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
