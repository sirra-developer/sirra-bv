import { EmployeePlaceholder } from "./EmployeePlaceholder";

export type EmployeeProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  role?: string;
  biography?: string;
  employeePicture?: string;
  phoneNumber?: string;
  email?: string;
  linkedinUrl?: string;
};

function Portrait({ employee }: { employee: EmployeeProfile }) {
  const name = `${employee.firstName} ${employee.lastName}`;
  return employee.employeePicture ? (
    // Sanity supplies the final CDN dimensions; the natural ratio is retained here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
      src={employee.employeePicture}
      alt={name}
    />
  ) : (
    <EmployeePlaceholder name={name} />
  );
}

export function EmployeeProfiles({
  employees,
}: {
  employees: EmployeeProfile[];
}) {
  return (
    <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <li key={employee._id}>
          <article className="h-full">
            <Portrait employee={employee} />
            <p className="eyebrow mt-6">{employee.role ?? "SIRRA"}</p>
            <h3 className="text-sirra-green mt-3 text-2xl font-semibold tracking-[-0.035em]">
              {employee.firstName} {employee.lastName}
            </h3>
            {employee.biography ? (
              <p className="mt-4 max-w-[65ch] leading-7 text-stone-600">
                {employee.biography}
              </p>
            ) : null}
            {employee.email || employee.linkedinUrl ? (
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                {employee.email ? (
                  <a
                    className="text-sirra-green underline-offset-4 hover:underline"
                    href={`mailto:${employee.email}`}
                  >
                    E-mail
                  </a>
                ) : null}
                {employee.linkedinUrl ? (
                  <a
                    className="text-sirra-green underline-offset-4 hover:underline"
                    href={employee.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>
        </li>
      ))}
    </ul>
  );
}
