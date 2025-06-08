'use client'; // usePathname を使うため
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// ダミーのLinkコンポーネントとusePathnameフック (型エラー回避のため)
const Link = ({ href, children, ...props }: { href: string, children: React.ReactNode, [key: string]: any }) => <a href={href} {...props}>{children}</a>;
const usePathname = () => '/dummy-path';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`
        tw:px-3 tw:py-2 tw:rounded-md tw:text-sm tw:font-medium tw:transition-all tw:duration-150 tw:ease-in-out
        tw:group
        ${
          isActive
            ? 'tw:bg-sky-700 tw:text-white tw:shadow-inner' // アクティブ時のスタイル
            : 'tw:text-gray-300 tw:hover:bg-gray-700 tw:hover:text-white tw:focus:bg-gray-700 tw:focus:text-white tw:focus:outline-none'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
      <span
        className={`
          tw:block tw:max-w-0 tw:group-hover:max-w-full tw:transition-all tw:duration-300 tw:h-0.5
          ${isActive ? 'tw:bg-yellow-400 tw:max-w-full' : 'tw:bg-sky-500'}
        `}
      ></span> {/* ホバー/アクティブ時の下線アニメーション例 */}
    </Link>
  );
}
