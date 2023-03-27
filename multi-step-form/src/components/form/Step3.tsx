import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import Form, { StepFormProps, useStepFormSetting, AddOn } from "./Form";

type AddOnSelectionProps = {
  addOn: AddOn;
  inputProps: ComponentProps<"input">;
  isMonthlyBilling: boolean;
  isDefaultSelection: boolean;
};

function AddOnSelection({
  addOn,
  inputProps,
  isMonthlyBilling,
  isDefaultSelection,
}: AddOnSelectionProps) {
  const { name, description, monthlyPrice } = addOn;
  const price = isMonthlyBilling
    ? `+$${monthlyPrice}/mo`
    : `+$${monthlyPrice * 10}/yr`;

  // peer-checked:[.group_&] -> https://github.com/tailwindlabs/tailwindcss/pull/4556
  return (
    <article>
      <input
        id={name}
        type="checkbox"
        className="peer hidden"
        defaultChecked={isDefaultSelection}
        {...inputProps}
      />
      <label
        htmlFor={name}
        className="group flex items-center gap-3 border border-light-gray peer-checked:border-purplish-blue peer-checked:bg-magnolia hover:border-purplish-blue py-3 px-4 rounded-lg cursor-pointer md:pb-5 md:px-6"
      >
        <span className="peer-checked:[.group_&]:bg-purplish-blue border border-light-gray rounded-sm w-5 h-5 after:border-2 after:border-white after:border-t-0 after:-rotate-45 after:translate-x-1 after:translate-y-1.5 after:border-r-0 after:block after:h-1.5 after:w-2.5"></span>
        <span className="flex flex-col">
          <strong className="font-medium text-sm md:text-base text-marine-blue">
            {name}
          </strong>
          <span className="text-xs text-cool-gray md:text-sm">
            {description}
          </span>
        </span>
        <data
          className="text-sm text-purplish-blue ml-auto md:text-sm"
          value={price}
        >
          {price}
        </data>
      </label>
    </article>
  );
}

const addOnList: AddOn[] = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
  },
];

type AddOnFormInput = { [key: AddOn["name"]]: boolean };

export function Step3({
  formId,
  onSubmit,
}: StepFormProps<{ selectedAddOns: AddOn[] }>) {
  const { selectedAddOns, isMonthlyBilling } = useStepFormSetting(
    (state) => state.setting
  );
  const { register, handleSubmit } = useForm<AddOnFormInput>({
    defaultValues: selectedAddOns.reduce<AddOnFormInput>(
      (o, a) => ({ ...o, [a.name]: true }),
      {}
    ),
  });

  return (
    <Form
      id={formId}
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
      onSubmit={handleSubmit((data) => {
        const selectedAddOnNames = Object.entries(data).flatMap(([n, v]) =>
          v ? n : []
        );
        const selectedAddOns = addOnList.filter((a) =>
          selectedAddOnNames.includes(a.name)
        );
        onSubmit({ selectedAddOns });
      })}
    >
      <section className="flex flex-col gap-3">
        {addOnList.map((addOn) => (
          <AddOnSelection
            key={addOn.name}
            addOn={addOn}
            inputProps={register(addOn.name)}
            isMonthlyBilling={isMonthlyBilling}
            isDefaultSelection={
              selectedAddOns.find((a) => a.name === addOn.name) !== undefined
            }
          />
        ))}
      </section>
    </Form>
  );
}
