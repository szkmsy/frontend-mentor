import { ComponentProps } from "react";

type ButtonProps = Omit<ComponentProps<"button">, "style" | "className">;

type PrimaryButtonProps = ButtonProps & { inProgress: boolean };
export function PrimaryButton(props: PrimaryButtonProps) {
  const { inProgress, ...buttonProps } = props;
  const bgColor = inProgress ? `bg-marine-blue` : `bg-purplish-blue`;

  return (
    <button
      {...buttonProps}
      className={`text-sm text-white ${bgColor} rounded-md py-3 px-4 outline-purplish-blue hover:saturate-200 hover:opacity-50`}
    >
      {props.children}
    </button>
  );
}

type SecondaryButtonProps = ButtonProps & { isInitialStep: boolean };
export function SecondaryButton(props: SecondaryButtonProps) {
  const { isInitialStep, ...buttonProps } = props;
  const visibility = isInitialStep ? "invisible" : "visible";

  return (
    <button
      {...buttonProps}
      className={`text-cool-gray ${visibility} outline-none`}
    >
      {props.children}
    </button>
  );
}
