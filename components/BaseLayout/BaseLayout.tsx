import { Fragment, ReactNode, SVGProps, useMemo, useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  GlobeIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  SortAscendingIcon,
  XIcon,
} from "@heroicons/react/outline";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ROUTES from "../../paths";
import { User } from "../../types";
import DropDownMenu from "../DropDownMenu";
import NewBadge from "../NewBadge";

interface NavigationItem {
  name: string;
  href?: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  children?: {
    name: string;
    href: string;
  }[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface BaseLayoutProps {
  children: ReactNode;
  user?: User;
  onSignOut: VoidFunction;
  availableContributions?: number;
}

const BaseLayout: NextPage<BaseLayoutProps> = ({
  children,
  user,
  onSignOut,
  availableContributions,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const navigation: NavigationItem[] = useMemo(() => {
    return [
      { name: "Home", href: ROUTES.HOME, icon: HomeIcon },
      {
        name: "Pokemon Hunt",
        href: ROUTES.HUNT,
        icon: GlobeIcon,
      },
      {
        name: "Rankings",
        icon: SortAscendingIcon,
        children: [
          {
            name: "Collection Ranking",
            href: `${ROUTES.RANKINGS}?tab=collection`,
          },
          {
            name: "Pokemon Ranking",
            href: `${ROUTES.RANKINGS}?tab=pokemon`,
          },
          {
            name: "Contribution Ranking",
            href: `${ROUTES.RANKINGS}?tab=contribution`,
          },
        ],
      },
      {
        name: "Pokemon Workshop",
        href: ROUTES.WORKSHOP,
        icon: PhotographIcon,
      },
    ];
  }, []);

  const BadgeWrapper = useMemo(() => {
    return availableContributions ? NewBadge : "div";
  }, [availableContributions]);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-500">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Image
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                  width={143}
                  height={32}
                  alt="Workflow"
                  priority
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <SidebarItems
                    items={navigation}
                    onClickItem={() => setSidebarOpen(false)}
                  />
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-blue-500 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Image
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                width={143}
                height={32}
                alt="Workflow"
                priority
              />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                <SidebarItems items={navigation} />
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-400 text-gray-200 focus:outline-none md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex"></div>
            {user ? (
              <div className="ml-4 flex items-center md:ml-6">
                <BadgeWrapper>
                  <button
                    className="bg-gray-800 p-1 rounded-full text-gray-200 hover:text-gray-400"
                    onClick={() => router.push(ROUTES.PAYBACK)}
                  >
                    <span className="sr-only">Payback</span>
                    <FontAwesomeIcon icon={faReceipt} size="lg" aria-hidden="true" />
                  </button>
                </BadgeWrapper>

                <DropDownMenu
                  className="ml-3 relative"
                  buttonLabel={
                    <>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        width={32}
                        height={32}
                        src={user.githubUser!.avatar_url}
                        alt={user.nickname}
                        priority
                      />
                    </>
                  }
                  buttonClassName="max-w-xs bg-gray-800 flex items-center text-sm rounded-full"
                  header={
                    <>
                      Signed in as{" "}
                      <span className="text-gray-900 font-bold">
                        {user.githubUser!.login}
                      </span>
                    </>
                  }
                  menuItems={[
                    [
                      {
                        title: "Your profile",
                        onClick: () => router.push(ROUTES.PROFILE),
                      },
                      {
                        title: "Your collection",
                        onClick: () => router.push(`${ROUTES.COLLECTIONS}/${user.id}`),
                      },
                    ],
                    [
                      {
                        title: "Sign out",
                        onClick: onSignOut,
                      },
                    ],
                  ]}
                  origin="right"
                  width={48}
                />
              </div>
            ) : (
              <div className="ml-4 flex items-right md:ml-6">
                <button
                  className="bg-gray-800 p-1 rounded-full text-gray-200 hover:text-gray-400"
                  onClick={() => router.push(ROUTES.SIGN_IN)}
                >
                  <FontAwesomeIcon className="mr-2" icon={faGithub} />
                  <span className="text-sm">Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto overflow-x-hidden focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

interface SidebarItemsProps {
  items: NavigationItem[];
  onClickItem?: VoidFunction;
}

const SidebarItems = ({ items, onClickItem }: SidebarItemsProps) => {
  const router = useRouter();

  return (
    <>
      {items.map((item) =>
        !item.children ? (
          <Link href={item.href!} key={item.name}>
            <a
              className={classNames(
                router.asPath === item.href
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-600 hover:text-white",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
              )}
              onClick={onClickItem}
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-blue-200"
                aria-hidden="true"
              />
              {item.name}
            </a>
          </Link>
        ) : (
          <Disclosure
            as="div"
            defaultOpen={item.children.map((child) => child.href).includes(router.asPath)}
            key={item.name}
            className="space-y-1"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={classNames(
                    router.asPath === item.href
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-600 hover:text-white",
                    "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-blue-200"
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  <svg
                    className={classNames(
                      open ? "text-white rotate-90" : "text-blue-100",
                      "ml-3 flex-shrink-0 h-5 w-5 transform",
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="space-y-1">
                  {item.children!.map((subItem) => (
                    <Link href={subItem.href} key={subItem.name}>
                      <a
                        className={classNames(
                          router.asPath === subItem.href
                            ? "bg-blue-700 text-white"
                            : "text-blue-100 hover:bg-blue-600 hover:text-white",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md pl-11",
                        )}
                        onClick={onClickItem}
                      >
                        {subItem.name}
                      </a>
                    </Link>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ),
      )}
    </>
  );
};

export default BaseLayout;
