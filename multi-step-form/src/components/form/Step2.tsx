import { ComponentProps } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Form, {
  StepFormProps,
  PlanName,
  PlanSetting,
  useStepFormSetting,
} from "./Form";

interface Plan {
  planName: PlanName;
  image: Pick<ComponentProps<"img">, "src" | "alt">;
  monthlyPrice: number;
  yearlyPrice: number;
  freeMonthOfYear: number;
}

interface PlanSelectionProps {
  plan: Plan;
  defaultPlanName: PlanName;
}

function PlanSelection({ plan, defaultPlanName }: PlanSelectionProps) {
  const { register, watch } = useFormContext();
  const { image, planName, monthlyPrice, yearlyPrice, freeMonthOfYear } = plan;
  const watchIsMonthlyBilling = watch("isMonthlyBilling");
  const isYearlyBilling = !watchIsMonthlyBilling;
  const price = isYearlyBilling ? `$${yearlyPrice}/yr` : `$${monthlyPrice}/mo`;

  return (
    <article className="flex-1">
      <input
        type="radio"
        id={planName}
        value={planName}
        defaultChecked={planName === defaultPlanName}
        className="peer hidden"
        {...register("planName")}
      />
      <label
        htmlFor={planName}
        className={`border-light-gray peer-checked:border-purplish-blue peer-checked:bg-magnolia flex gap-3.5 rounded-md border border-solid pt-2 pb-4 px-4 md:flex md:flex-col md:gap-10 md:pt-5`}
      >
        <img {...image} className="h-10 w-10" />
        <span className="flex flex-col">
          <strong className="font-bold text-marine-blue capitalize">
            {planName}
          </strong>
          <data className="text-sm text-cool-gray" value={price}>
            {price}
          </data>
          {isYearlyBilling && (
            <data
              className="text-xs text-marine-blue pt-1"
              value={freeMonthOfYear}
            >
              {freeMonthOfYear} months free
            </data>
          )}
        </span>
      </label>
    </article>
  );
}

function BillingSelection() {
  const { register } = useFormContext();

  return (
    <article className="flex gap-6 justify-center items-end mt-6 bg-alabaster py-3 rounded-md">
      <input
        type="checkbox"
        id="billing-switcher"
        className="peer hidden"
        {...register("isMonthlyBilling")}
      />
      <label
        htmlFor="billing-switcher"
        className="font-medium text-cool-gray peer-checked:text-marine-blue peer-checked:pointer-events-none"
      >
        Monthly
      </label>
      <label
        htmlFor="billing-switcher"
        className="bg-marine-blue rounded-xl h-5 w-9 relative after:absolute after:rounded-full after:bg-white after:w-3 after:h-3 after:top-1 after:right-1 peer-checked:after:left-1"
      ></label>
      <label
        htmlFor="billing-switcher"
        className="font-medium text-marine-blue peer-checked:text-cool-gray pointer-events-none peer-checked:pointer-events-auto"
      >
        Yearly
      </label>
    </article>
  );
}

const plans: Plan[] = [
  {
    image: { src: "/images/icon-arcade.svg", alt: "arcade" },
    planName: "arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    freeMonthOfYear: 2,
  },
  {
    image: { src: "/images/icon-advanced.svg", alt: "advanced" },
    planName: "advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    freeMonthOfYear: 2,
  },
  {
    image: { src: "/images/icon-pro.svg", alt: "pro" },
    planName: "pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    freeMonthOfYear: 2,
  },
];

export function Step2({ formId, onSubmit }: StepFormProps<PlanSetting>) {
  const { planName, isMonthlyBilling } = useStepFormSetting(
    (state) => state.setting
  );
  const methods = useForm<PlanSetting>({
    defaultValues: { planName, isMonthlyBilling },
  });

  return (
    <FormProvider {...methods}>
      <Form
        id={formId}
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
        onSubmit={methods.handleSubmit(({ planName, isMonthlyBilling }) => {
          const selectedPlan = plans.find((p) => p.planName === planName);
          if (selectedPlan === undefined) return;
          const { monthlyPrice, yearlyPrice } = selectedPlan;
          const planPrice = isMonthlyBilling ? monthlyPrice : yearlyPrice;
          onSubmit({ planName, planPrice, isMonthlyBilling });
        })}
      >
        <section className="flex flex-col gap-3 md:flex-row md:mb-8">
          {plans.map((plan) => (
            <PlanSelection
              key={plan.planName}
              plan={plan}
              defaultPlanName={planName}
            />
          ))}
        </section>
        <BillingSelection />
      </Form>
    </FormProvider>
  );
}
