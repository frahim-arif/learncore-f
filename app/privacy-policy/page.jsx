export const metadata = {
  title: "Privacy Policy | WebcoreCubeTech",
  description: "Privacy Policy for WebcoreCubeTech online courses.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
        <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          Privacy Policy
        </span>

        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-600">
          Last updated: 24 June 2026
        </p>

        <div className="mt-8 space-y-8 text-gray-600 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Information We Collect
            </h2>
            <p className="mt-3">
              WebcoreCubeTech may collect your name, email address, phone
              number, payment details, course purchase details, and login
              information when you register or buy a course.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your information to create your account, provide course
              access, process payments, contact you for support, and improve our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Payment Information
            </h2>
            <p className="mt-3">
              Payments may be processed through third-party payment gateways.
              We do not store your card, UPI, or bank details on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Data Security
            </h2>
            <p className="mt-3">
              We use reasonable security measures to protect your information.
              However, no online platform can guarantee 100% security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Sharing of Information
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share required
              information only with payment providers, hosting providers, or
              legal authorities when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Cookies
            </h2>
            <p className="mt-3">
              Our website may use cookies to improve user experience, remember
              login sessions, and analyze website performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Your Rights
            </h2>
            <p className="mt-3">
              You may contact us to update, correct, or delete your personal
              information from our records where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              8. Contact Us
            </h2>
            <p className="mt-3">
              For any privacy-related questions, you can contact
              WebcoreCubeTech support through our contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}