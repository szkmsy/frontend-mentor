export const minStepNo = 1;
export const totalStepCount = 4;

export default function StepNo({
  no,
  active,
}: {
  no: number;
  active?: boolean;
}) {
  const colorStyle = active
    ? `bg-light-blue text-marine-blue`
    : `bg-purplish-blue text-white`;
  return (
    <article
      className={`font-bold border border-white grid place-content-center rounded-full h-8 w-8 ${colorStyle}`}
    >
      {no}
    </article>
  );
}
