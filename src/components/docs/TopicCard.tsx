import type { ReactNode } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

export type TopicCardAction = {
  label: string;
  onClick: () => void;
};

export type TopicCardProps = {
  title: string;
  summary: string;
  points: string[];
  /** Optional rich content opened from a modal (e.g. full lecture notes). */
  details?: ReactNode;
  /** Optional override for modal title/description. */
  detailsTitle?: ReactNode;
  detailsDescription?: ReactNode;
  /** Optional override for the primary action label. */
  readLabel?: string;
  /**
   * Optional click handler for the primary action.
   * When provided, `TopicCard` will NOT open its internal modal; parent controls behavior.
   */
  onReadClick?: () => void;
  /** Optional secondary action button (e.g. "Read more"). */
  secondaryAction?: TopicCardAction;
  /** Optional list of extra action buttons (renders before the primary read button). */
  actions?: TopicCardAction[];
};

export function TopicCard({
  title,
  summary,
  points,
  details,
  detailsTitle,
  detailsDescription,
  readLabel = 'Read',
  onReadClick,
  secondaryAction,
  actions,
}: TopicCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasInternalModal = Boolean(details) && !onReadClick;
  const showReadButton = Boolean(details) || Boolean(onReadClick);
  const resolvedActions = actions ?? (secondaryAction ? [secondaryAction] : []);

  const handleReadClick = () => {
    if (onReadClick) {
      onReadClick();
      return;
    }
    setDetailsOpen(true);
  };

  return (
    <>
      <Card className='border-border bg-card'>
        <CardHeader className='flex flex-row items-start justify-between gap-4'>
          <div className='space-y-1'>
            <CardTitle className='text-lg'>{title}</CardTitle>
            <CardDescription>{summary}</CardDescription>
          </div>
          {(showReadButton || resolvedActions.length > 0) && (
            <div className='flex items-center gap-2'>
              {resolvedActions.map((action) => (
                <Button key={action.label} type='button' variant='outline' size='sm' onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
              {showReadButton && (
                <Button type='button' variant='outline' size='sm' onClick={handleReadClick}>
                  {readLabel}
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ul className='list-disc space-y-1 pl-5 text-sm'>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {hasInternalModal && (
        <Modal
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          title={detailsTitle ?? title}
          description={detailsDescription ?? summary}
          contentClassName='max-w-4xl'
        >
          {details}
        </Modal>
      )}
    </>
  );
}
