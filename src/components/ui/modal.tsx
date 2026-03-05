import * as React from "react";
import ReactDOM from "react-dom";

import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional className override for the modal content container (the white card). */
  contentClassName?: string;
}

export function Modal({ open, onOpenChange, title, description, children, contentClassName }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!open) return null;

  const handleClose = () => onOpenChange(false);

  return ReactDOM.createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className={cn(
          "relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border bg-card p-6 shadow-lg",
          contentClassName,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <div className="space-y-1 pb-4">
            {title && <h2 className="text-base font-semibold text-slate-50">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="space-y-3 text-sm text-muted-foreground">{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}


