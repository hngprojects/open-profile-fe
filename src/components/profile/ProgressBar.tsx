const STEP_CLASSES =
  "flex items-center justify-center rounded-full border-2 font-bold";

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  function findActiveTab(step: number) {
    return currentStep === step
      ? "h-16 w-16 border-brand-subtle-b bg-brand-progress-bg text-link-hover-text text-[28px]"
      : "h-10 w-10 border-disabled-text bg-span-text text-disabled-text text-[24px]";
  }

  if (currentStep === 3) return null;

  return (
    <div className="flex w-full items-center justify-center">
      <div className={`${STEP_CLASSES} ${findActiveTab(1)}`}>1</div>
      <span className="mx-4 h-4 w-20 border-b-2 border-b-[#8C8F98]" />
      <div className={`${STEP_CLASSES} ${findActiveTab(2)}`}>2</div>
    </div>
  );
}
