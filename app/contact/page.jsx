export const metadata = {
  title: "Contact Us | WebcoreCubeTech",
  description:
    "Contact WebcoreCubeTech for course inquiries, support, and assistance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-16 text-center">
        <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          Contact Us
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
          Get in Touch
        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about our courses or need support? We would love to
          hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Information
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Email
                </h3>
                <p className="text-gray-600 mt-1">
                  support@webcorecubetech.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Phone
                </h3>
                <p className="text-gray-600 mt-1">
                  +91 9058596626
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Website
                </h3>
                <p className="text-gray-600 mt-1">
                  learn.webcorecubetech.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Support Hours
                </h3>
                <p className="text-gray-600 mt-1">
                  Monday - Saturday
                  <br />
                  10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Send a Message
            </h2>

            <form className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}