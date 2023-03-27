import Footer from "./components/Footer";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  StepComplete,
  useStepFormSetting,
} from "./components/form";
import Progress from "./components/Progress";
import { totalStepCount } from "./components/StepNo";

const stepFormList = [Step1, Step2, Step3, Step4];

function App() {
  const stepNo = useStepFormSetting((state) => state.stepNo);
  const StepForm = stepFormList[stepNo - 1];
  const formId = `step-${stepNo}`;
  const isStepComplete = stepNo > totalStepCount;

  const onSubmit = useStepFormSetting((state) => state.showNextStep);
  const onGoBackButtonClick = useStepFormSetting((state) => state.showPrevStep);

  return (
    <section className="bg-white flex flex-col min-h-screen max-w-5xl mx-auto md:my-4 md:min-h-[min(calc(100vh-2em),37.5em)] md:grid md:grid-cols-[17em,1fr] md:grid-rows-[1fr,auto] md:shadow-xl">
      <Progress currentStepNo={stepNo} />
      <main className="flex-grow md:col-start-2 bg-magnolia md:w-[28.5em] md:justify-self-center md:bg-white">
        {isStepComplete ? (
          <StepComplete />
        ) : (
          <StepForm formId={formId} onSubmit={onSubmit} />
        )}
      </main>
      {!isStepComplete && (
        <Footer
          currentStepNo={stepNo}
          formId={formId}
          onGoBackButtonClick={onGoBackButtonClick}
        />
      )}
    </section>
  );
}

export default App;
