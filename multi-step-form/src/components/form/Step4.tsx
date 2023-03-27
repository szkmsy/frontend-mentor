import Form, { StepFormProps, useStepFormSetting } from "./Form";

export function Step4({ formId, onSubmit }: StepFormProps<{}>) {
  const { planName, planPrice, isMonthlyBilling, selectedAddOns } =
    useStepFormSetting((state) => state.setting);
  const billingType = isMonthlyBilling ? "Monthly" : "Yearly";
  const planDescription = `${planName}(${billingType})`;

  const billingSuffix = isMonthlyBilling ? "mo" : "yr";
  const planPriceText = `$${planPrice}/${billingSuffix}`;

  const onChangePlanButtonClick = useStepFormSetting(
    (state) => state.showPlanSelectionStep
  );

  const getAddOnPrice = (monthlyPrice: number) =>
    isMonthlyBilling ? monthlyPrice : monthlyPrice * 10;
  const getAddOnDescription = (monthlyPrice: number) =>
    `+$${getAddOnPrice(monthlyPrice)}/${billingSuffix}`;

  const totalDescription = `Total (per ${isMonthlyBilling ? "month" : "year"})`;
  const totalPrice =
    planPrice +
    selectedAddOns.reduce((s, a) => s + getAddOnPrice(a.monthlyPrice), 0);
  const totalPriceText = `+$${totalPrice}/${billingSuffix}`;

  return (
    <Form
      id={formId}
      title="Finishing up"
      description="Double-check everything looks OK before confirming."
      onSubmit={onSubmit}
    >
      <section className="bg-alabaster p-4 rounded-md md:px-6">
        <article className="flex justify-between items-center pb-3 md:pb-6 mb-3 border-b border-light-gray">
          <section>
            <p className="text-marine-blue font-medium capitalize text-sm md:text-base">
              {planDescription}
            </p>
            <button
              className="text-cool-gray underline text-sm focus:outline-purplish-blue"
              onClick={onChangePlanButtonClick}
            >
              Change
            </button>
          </section>
          <p className="text-marine-blue font-bold text-sm md:text-base">
            {planPriceText}
          </p>
        </article>
        {selectedAddOns.map((addOn) => (
          <article key={addOn.name} className="flex justify-between md:pb-4">
            <p className="text-cool-gray text-sm">{addOn.name}</p>
            <p className="text-marine-blue text-sm">
              {getAddOnDescription(addOn.monthlyPrice)}
            </p>
          </article>
        ))}
      </section>
      <article className="flex justify-between p-4 pt-6">
        <p className="text-cool-gray text-sm">{totalDescription}</p>
        <p className="text-purplish-blue font-bold md:text-xl">
          {totalPriceText}
        </p>
      </article>
    </Form>
  );
}
