import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-yellow-ladder">
      {/* Navigation */}
      <nav className="bg-coffee-brown text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">☕ Yellow Ladder Coffee</div>
          <div className="space-x-6">
            <Link
              href="/"
              className="hover:text-yellow-ladder transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="hover:text-yellow-ladder transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="hover:text-yellow-ladder transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-ladder transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-coffee-dark mb-6">
            Welcome to Yellow Ladder Coffee
          </h1>
          <p className="text-xl text-coffee-brown mb-8 max-w-2xl mx-auto">
            Climb to new heights with our premium coffee blends. Each cup is
            carefully crafted to deliver an exceptional experience.
          </p>
          <div className="space-x-4">
            <button className="btn-primary">Order Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-coffee-dark mb-12">
            Why Choose Yellow Ladder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-coffee-dark mb-4">
                Premium Quality
              </h3>
              <p className="text-coffee-brown">
                Sourced from the finest coffee beans around the world, ensuring
                exceptional quality in every cup.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-coffee-dark mb-4">
                Fast Delivery
              </h3>
              <p className="text-coffee-brown">
                Quick and reliable delivery service to get your coffee fix
                exactly when you need it.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-xl font-semibold text-coffee-dark mb-4">
                Sustainable
              </h3>
              <p className="text-coffee-brown">
                Committed to sustainable practices and supporting coffee farmers
                around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Yellow Ladder Coffee. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
