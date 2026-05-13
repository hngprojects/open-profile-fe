"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
  className?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "David",
    role: "Product Designer",
    image: "/socialproof/david.png",
    text: "Before using Open Profile, I had my work scattered across different platforms—my portfolio on one site, links in my bio, and social media everywhere else. It was always a struggle sending everything to clients without overwhelming them.\n\nWith Open Profile, I was able to bring everything together into one clean, professional page. Now when someone wants to know about me, I just send a single link and they can see my work.",
    className: "md:col-span-2 lg:col-span-3",
  },
  {
    name: "Amaka",
    role: "Content Creator",
    image: "/socialproof/amaka.png",
    text: "Having everything in one place makes me look more professional, especially with the verification badge.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Tunde",
    role: "Frontend Developer",
    image: "/socialproof/tunde.png",
    text: "I like that people can actually find my profile instead of me always sharing it first.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Linda",
    role: "Content Creator",
    image: "/socialproof/linda.png",
    text: "I like that people can actually find my profile instead of me always sharing it first.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "James",
    role: "Backend Developer",
    image: "/socialproof/james.png",
    text: "I used to send multiple links to clients. Now I just share one profile and everything they need is there.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "Chinedu",
    role: "Programmer",
    image: "/socialproof/chinedu.png",
    text: "What I like most about Open Profile is how simple it is to bring everything together into one clean, professional page. Now, when someone wants to learn more about me, I just share a single link and they can instantly see my work, connect with me, and even verify my profile.\n\nIt's made a big difference in how I present myself online. I feel more organized, more credible, and I've noticed that people take me more seriously when they reach out.",
    className: "md:col-span-2 lg:col-span-3",
  },
];

export function Proof() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#FAFAFA] py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto flex max-w-7xl flex-col items-center px-4 md:px-8"
      >
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-8 flex h-7.5 w-fit items-center gap-1 rounded-[24px] bg-[#F2FDFE] pr-5.5 pl-3.5"
        >
          <Image
            src="/target_assets/icon-flash.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className="text-brand font-sfpror text-[12px] leading-4 font-medium">
            Social Proof
          </p>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mb-8 text-center text-[32px] font-semibold text-[#050505] lg:text-[40px]"
        >
          Join creators and freelancers building their identity online
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid w-full grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col justify-between rounded-[16px] bg-white p-6 px-4 ${testimonial.className} ${index === 0 || index === 5 ? "hidden md:flex" : ""}`}
            >
              <div className="mb-4 md:mb-8">
                {testimonial.text.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className={`text-label-text text-[11px] leading-[1.5] font-normal md:text-[15px] ${
                      i === 0 && testimonial.text.includes(" ") ? "mb-6" : ""
                    }`}
                  >
                    {i === 0 && <>&quot;</>}
                    {para}
                    {i === testimonial.text.split("\n\n").length - 1 && (
                      <>&quot;</>
                    )}
                  </p>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  <h4 className="mb-0.5 text-[12px] font-bold text-[#050505] md:text-[15px]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] font-medium text-[#737373] md:text-[13px]">
                    {testimonial.role}
                  </p>
                </div>
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
