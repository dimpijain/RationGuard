import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#2D2D2D' }}>
      {/* Navbar */}
      <nav
        className="flex justify-between items-center px-10 py-5 shadow-sm sticky top-0 z-50"
        style={{ backgroundColor: '#355070' }}
      >
        <h1 className="text-white text-2xl font-bold tracking-wide ">RationGuard</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-white text-base hover:underline hover:text-[#EAAC8B] transition"
          >
            Login
          </Link>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: '#355070' }}>
          Food Security. Digital Transparency.
        </h2>
        <p className="max-w-2xl text-lg mb-8">
          A smart and simple way to track ration availability, raise complaints, and bring accountability to your local ration system.
        </p>
        <Link
          to="/signup"
          className="px-6 py-3 bg-[#355070] text-white text-lg font-medium rounded-full hover:bg-[#EAAC8B] hover:text-white transition"
        >
          Get Started
        </Link>
      </section>

      {/* Why RationGuard */}
      <section className="py-20 px-6 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12" style={{ color: '#355070' }}>Why RationGuard?</h3>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: 'Live Stock Visibility',
              desc: 'Check real-time availability of ration items like wheat, rice, sugar, and dal.',
            },
            {
              title: 'Raise Complaints Easily',
              desc: 'Report issues like stock denial or corruption directly to authorities.',
            },
            {
              title: 'Empower Your Community',
              desc: 'Track shop behavior, get alerts, and contribute to fair distribution.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF9F6] rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#F0ECE3] text-center">
        <h3 className="text-3xl font-bold mb-12" style={{ color: '#355070' }}>How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              step: '1. Sign Up',
              desc: 'Create your citizen account using email or mobile number.',
            },
            {
              step: '2. Track & Report',
              desc: 'Check stock status and report any issues with just a few taps.',
            },
            {
              step: '3. Stay Updated',
              desc: 'Get notified when stock is available or your complaint is resolved.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-gray-100"
            >
              <h4 className="text-lg font-semibold mb-2 text-[#355070]">{item.step}</h4>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-6"
        style={{ backgroundColor: '#355070', color: 'white' }}
      >
        <p>© {new Date().getFullYear()} RationGuard • Built for Bharat</p>
        <p className="text-sm mt-1">Food access with dignity. Powered by citizens.</p>
      </footer>
    </div>
  );
}

