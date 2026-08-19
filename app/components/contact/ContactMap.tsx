export function ContactMap({
  address,
  heading,
}: {
  address: string;
  heading: string;
}) {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address.replace(/\s*\n+\s*/g, ", "))}&output=embed`;

  return (
    <section data-animate-section className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-6 px-2">{heading}</p>
        <div
          data-animate-image
          className="bg-sirra-sand relative h-[28rem] overflow-hidden rounded-[2rem] sm:h-[36rem] sm:rounded-[3rem]"
        >
          <iframe
            src={mapEmbedUrl}
            title={`Google Maps locatie van SIRRA: ${address.replace(/\s*\n+\s*/g, ", ")}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
