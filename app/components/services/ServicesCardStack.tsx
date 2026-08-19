import { ServiceArea } from "./ServiceArea";
import type { ServiceAreaContent } from "./types";

export function ServicesCardStack({ areas }: { areas: ServiceAreaContent[] }) {
  return (
    <div>
      {areas.map((area, index) => (
        <ServiceArea
          key={area.number}
          content={area}
          tinted={index % 2 === 0}
        />
      ))}
    </div>
  );
}
