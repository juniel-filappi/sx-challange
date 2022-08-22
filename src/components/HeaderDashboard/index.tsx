import { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { SigInButton } from "../SigInButton";
import styles from './styles.module.css';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function HeaderDashboard() {
  const { data: session } = useSession();
  const navigation = [
    { name: "Empresas", href: "#" },
    { name: "Colaboradores", href: "/colaborators" },
  ];
  const [currentNavigation, setCurrenteNavigation] = useState("Empresas");

  return (
    <Disclosure as="nav" className={styles.backgroundImage}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="ml-2 text-2xl font-bold">
                    <span className="text-[#00D8FD]">SX</span>&CO
                  </h1>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.name === currentNavigation
                            ? "bg-bluesx text-black"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        onClick={() => setCurrenteNavigation(item.name)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <SigInButton />
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <AiOutlineMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.name === currentNavigation
                      ? "bg-bluesx text-black"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  onClick={() => setCurrenteNavigation(item.name)}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-2 space-y-1">
                <SigInButton />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
