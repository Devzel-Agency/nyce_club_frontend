import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">About <span><span className="text-[#00afef]">nyce</span><span className="text-[#f63ee9]"> club</span></span></h3>
            <p className="text-sm">
              Empowering communities through verified NGOs and transparent giving.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ngo" className="hover:text-white transition-colors">
                  Our NGOs
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li>Email: contact@nyceclub.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Impact Street, NY</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Stay Updated</h3>
            <p className="text-sm">Subscribe to our newsletter for updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-gray-800 rounded-lg text-sm w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-gray-900 rounded-lg font-bold hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2024 <span><span className="text-[#00afef]">nyce</span><span className="text-[#f63ee9]"> club</span></span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 