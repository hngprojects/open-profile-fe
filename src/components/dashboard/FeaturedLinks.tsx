import { ExternalLink, ImageIcon } from "lucide-react";

const links = [
  {
    id: 1,
    title: "Portfolio",
    url: "https://yourlink.com/portfolio",
    subtitle: "yourlink.com/portfolio",
  },
  {
    id: 2,
    title: "Latest Project",
    url: "https://yourlink.com/project",
    subtitle: "yourlink.com/project",
  },
  {
    id: 3,
    title: "Book a Call",
    url: "https://yourlink.com/book",
    subtitle: "yourlink.com/book",
  },
];

export default function FeaturedLinks() {
  return (
    <section className="rounded-[12px] border border-[#EDEDED] bg-white p-6">
      <h2 className="text-2xl font-bold">Featured Link</h2>

      <div className="mt-6 flex flex-col gap-4">
        {links.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-[18px] border border-[#EDEDED] p-4 no-underline"
          >
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-[12px] border border-[#EDEDED]">
                <ImageIcon className="text-[#A2A2A2]" size={24} />
              </span>

              <div>
                <h3 className="font-bold text-[#050505]">{item.title}</h3>
                <p className="text-[#A2A2A2]">{item.subtitle}</p>
              </div>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDEDED]">
              <ExternalLink className="text-[#A2A2A2]" size={20} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
