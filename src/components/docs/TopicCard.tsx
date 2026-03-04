import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type TopicCardProps = {
  title: string;
  summary: string;
  points: string[];
};

export function TopicCard({ title, summary, points }: TopicCardProps) {
  return (
    <Card className='border-border bg-card'>
      <CardHeader>
        <CardTitle className='text-lg'>{title}</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='list-disc space-y-1 pl-5 text-sm'>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}


