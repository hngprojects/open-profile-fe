type Props = {
  title: string;
  subtitle: string;
};

export function AuthPageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-2 text-center">
      <h1 className="text-2xl font-bold text-[#050505]">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
