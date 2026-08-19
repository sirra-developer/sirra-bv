export function EmployeePlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      role="img"
      aria-label={`Tijdelijke portretplaceholder voor ${name}`}
      className="bg-sirra-taupe-light text-sirra-green flex aspect-[4/5] items-center justify-center rounded-[1.5rem]"
    >
      <span className="text-5xl font-semibold tracking-[-0.05em]">
        {initials}
      </span>
    </div>
  );
}
