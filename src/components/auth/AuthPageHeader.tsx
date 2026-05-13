type Props = {
  title: string;
  subtitle: string;
};

export function AuthPageHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-2">
      <h1 className="text-2xl font-bold text-[#050505]">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
