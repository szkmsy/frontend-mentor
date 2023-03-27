import { ComponentProps } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Form, { PersonalInfo, StepFormProps, useStepFormSetting } from "./Form";

const getLabelName = (kebabCase: string) =>
  kebabCase
    .split("-")
    .map((w) => w.replace(/^\w/, (c) => c.toUpperCase()))
    .join(" ");

interface InputProps extends ComponentProps<"input"> {
  fieldName: string;
}

function Input({ fieldName, ...inputProps }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasRequiredError = errors[fieldName];
  const outLineStyle = hasRequiredError
    ? "focus:outline-strawberry-red"
    : "focus:outline-purplish-blue";

  return (
    <fieldset className="flex flex-col gap-1">
      <span className="flex justify-between text-xs md:text-sm">
        <label htmlFor={inputProps.id}>
          {getLabelName(inputProps.id ?? "")}
        </label>
        {hasRequiredError && (
          <strong className="text-strawberry-red">
            This field is required
          </strong>
        )}
      </span>
      <input
        className={`border border-light-gray rounded-md py-3 px-4 font-medium ${outLineStyle}`}
        {...inputProps}
        {...register(fieldName, { required: true })}
      />
    </fieldset>
  );
}

export function Step1({ formId, onSubmit }: StepFormProps<PersonalInfo>) {
  const methods = useForm<PersonalInfo>();
  const { name, email, phone } = useStepFormSetting((state) => state.setting);

  return (
    <FormProvider {...methods}>
      <Form
        id={formId}
        title="Personal info"
        description="Please provide your name, email address, and phone number."
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-4 md:gap-6">
          <Input
            id="name"
            type="text"
            placeholder="e.g. Stephen King"
            fieldName="name"
            defaultValue={name}
          />
          <Input
            id="email-address"
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            fieldName="email"
            defaultValue={email}
          />
          <Input
            id="phone-number"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            fieldName="phone"
            defaultValue={phone}
          />
        </section>
      </Form>
    </FormProvider>
  );
}
