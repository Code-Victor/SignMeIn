import React from "react";
import Link from "next/link";
const footerLinks = [
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        link: "#",
      },
      {
        name: "Career",
        link: "#",
      },
      {
        name: "Github",
        link: "#",
      },
    ],
  },
  {
    title: "Company & terms",
    links: [
      {
        name: "Terms of use",
        link: "#",
      },
      {
        name: "Privacy policy",
        link: "#",
      },
    ],
  },
  {
    title: "Help and Support",
    links: [
      {
        name: "LinkedIn",
        link: "#",
      },
      {
        name: "Instagram",
        link: "#",
      },
      {
        name: "Twitter",
        link: "#",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="container mx-auto px-5 grid md:grid-cols-5 gap-5 py-6 md:py-12 ">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-xl md:text-2xl font-bold text-primary">SignMeIn</h1>
        <p>
          Empower your business with modern technology to track employee
          promptness, save costs, and enhance worker efficiency - Start
          optimizing your workforce today!
        </p>
      </div>
      <div className="md:col-span-3 flex flex-wrap justify-between gap-4">
        {footerLinks.map((link) => {
          return (
            <div className="flex flex-col gap-4" key={link.title}>
              <h2 className="text-lg font-bold text-primary">{link.title}</h2>
              <ul className="flex flex-col gap-2">
                {link.links.map((item) => {
                  return (
                    <li className="text-sm" key={item.name}>
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="md:col-span-2">
        <p>
          &copy; 2023 SignMeIn. All rights reserved.
          <span className="text-primary font-semibold">Built by BuildLab</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
