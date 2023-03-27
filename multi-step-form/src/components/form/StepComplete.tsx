import Form, { useStepFormSetting } from "./Form";

export function StepComplete() {
  const setting = useStepFormSetting((state) => state.setting);
  console.log(setting);

  return (
    <div className="md:translate-y-2/4">
      <Form title="" description="">
        <section className="flex flex-col gap-2 items-center">
          <article className="mb-4">
            <img src="/images/icon-thank-you.svg" alt="think you" />
          </article>
          <h3 className="text-marine-blue text-2xl font-bold md:text-3xl">
            Thank you!
          </h3>
          <p className="text-cool-gray text-center px-1">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </section>
      </Form>
    </div>
  );
}
