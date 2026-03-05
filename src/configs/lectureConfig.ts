export const lectureAccents: Record<string, { label: string; className: string }> = {
  'lecture-1': {
    label: 'Lecture 1',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  'lecture-2': {
    label: 'Lecture 2',
    className: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  'lecture-3': {
    label: 'Lecture 3',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  // future lectures can be added here
};

export function getLectureAccent(lectureId?: string) {
  if (!lectureId) return undefined;
  return lectureAccents[lectureId];
}
