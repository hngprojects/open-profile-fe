const STEP_CLASSES =
  "border-2 flex justify-center items-center rounded-full font-bold";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  function findActiveTab(step: number) {
    const dynamic_class =
      currentStep === step
        ? "h-16 w-16 border-[#C3E2E5] bg-[#DBEFF2] text-link-hover-text text-[28px]"
        : "h-10 w-10 border-[#A2A2A2] bg-[#fefefe] text-[#A2A2A2] text-[24px]";

    return dynamic_class;
  }

  return (
    <div className="absolute -top-7 right-0 left-0 mt-20 flex flex-col">
      <div
        className={`${currentStep === 3 ? "hidden" : "flex"} mt-10 w-full items-center justify-center`}
      >
        <div className={`${STEP_CLASSES} ${findActiveTab(1)}`}>1</div>

        <span className="relative bottom-1 mx-4 h-4 w-20 border-b-2 border-b-[#8C8F98]" />

        <div className={`${STEP_CLASSES} ${findActiveTab(2)}`}>2</div>
      </div>
    </div>
  );
}
