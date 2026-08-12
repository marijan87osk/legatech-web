import Image from "next/image";
import { clientLogos } from "@/src/data/client-logos";

export function ClientLogoWall() {
  return (
    <ul className="client-logo-wall" aria-label="Logotipi odabranih klijenata">
      {clientLogos.map((client) => (
        <li className="client-logo-wall-item" key={client.name}>
          <Image
            src={client.image}
            alt={`Logotip klijenta ${client.name}`}
            width={512}
            height={192}
            sizes="(max-width: 767px) 42vw, (max-width: 1100px) 21vw, 16vw"
          />
        </li>
      ))}
    </ul>
  );
}

export function ServiceClientLogos() {
  return (
    <section id="klijenti" className="client-logos-section" aria-labelledby="service-client-logos-title">
      <div className="container client-logos-wrap">
        <div className="client-logos-header">
          <h2 id="service-client-logos-title">Odabrani klijenti</h2>
        </div>
        <ClientLogoWall />
      </div>
    </section>
  );
}
