import StepNo, { totalStepCount } from "./StepNo";

const stepDescriptions = ["your info", "select plan", "add-ons", "summary"];

export default function Progress({ currentStepNo }: { currentStepNo: number }) {
  const steps = Array.from(Array(totalStepCount), (_, i) => i + 1);

  return (
    <header className="flex justify-center gap-4 pt-8 pb-24 bg-sidebar-mobile bg-cover md:bg-sidebar-desktop md:row-span-3 md:flex-col md:gap-8 md:justify-start md:pt-10 md:pl-8">
      {steps.map((step, index) => (
        <section key={step} className="flex gap-4 items-center">
          <StepNo
            no={step}
            active={
              step === currentStepNo ||
              (currentStepNo > totalStepCount && index + 1 === steps.length)
            }
          />
          <article className="hidden md:block">
            <p className="text-xs text-light-gray">STEP {step}</p>
            <h2 className="font-bold text-sm text-white uppercase">
              {stepDescriptions[index]}
            </h2>
          </article>
        </section>
      ))}
    </header>
  );
}
