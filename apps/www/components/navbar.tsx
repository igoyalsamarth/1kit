import GithubStar from './github-star';
import Image from 'next/image';

export default async function Navbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md px-6 py-4 rounded-full shadow-sm">
        <div className="flex items-center justify-between gap-10 mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/1kit.svg" alt="1kit" width={42} height={42} />
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm text-gray-600">
              <a href="https://github.com/igoyalsamarth/1kit/blob/main/packages/create-1kit-app/CHANGELOG.md" className="hover:text-gray-900 transition-colors">Changelog</a>
              <a href="https://github.com/igoyalsamarth/1kit/blob/main/README.md" className="hover:text-gray-900 transition-colors">Docs</a>
            </div>
            <GithubStar />
          </div>
        </div>
      </nav>
    </div>
  );
}
