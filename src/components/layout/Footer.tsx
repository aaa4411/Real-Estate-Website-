import React from "react";
import { Link } from "react-router-dom";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-6 w-6" />
              <span className="text-xl font-bold">
                RealEstate<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Find your perfect home with our AI-powered real estate platform.
              We combine cutting-edge technology with industry expertise to
              deliver an unmatched property search experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/property-comparison"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Compare Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/subscription"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Premium Features</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✓</span> Virtual Tours
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✓</span> AI Recommendations
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✓</span> Inspection Reports
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✓</span> Priority Booking
              </li>
              <li className="text-gray-400 flex items-center">
                <span className="mr-2">✓</span> Advanced Filters
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-gray-400 flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>support@realestate-ai.com</span>
              </li>
              <li className="text-gray-400 flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  123 Innovation Drive, Suite 100
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="ml-2">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} RealEstateAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
