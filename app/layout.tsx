// app/layout.tsx
import '../app/globals.css';
import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between">
            <div className="text-white">
              <Link href="/" className="mr-4">
                Home
              </Link>
              <Link href="/sign-up" className="mr-4">
                Sign Up
              </Link>
              
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
