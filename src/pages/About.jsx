import React from "react";

const About = () => {
  return (
    <>
      <section
        id="about"
        className="container mx-auto px-4 space-y-6 bg-slate-50 py-8 md:py-12 lg:py-20"
      >
        {/* Header Section */}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-4xl md:text-6xl text-gray-900">
            About <span className="text-teal-600">GRANDA</span>
          </h2>

          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-gray-600">
            Welcome to <strong>GRANDA</strong> — your trusted destination for
            high-quality, stylish, and affordable products. Founded and managed
            by <strong>Athulya R Chandra</strong>, GRANDA is built with a vision
            to make online shopping seamless, reliable, and enjoyable for
            everyone.
          </p>
        </div>

        {/* Features Section */}
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {/* Feature 1 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Trusted Platform</h3>
                <p className="text-sm text-gray-600">
                  Every product sold on GRANDA is verified and quality-checked
                  to ensure your complete satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Customer Support</h3>
                <p className="text-sm text-gray-600">
                  Our dedicated support team is always here to assist you with
                  queries, returns, and order updates.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M12 7v5l3 3" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Fast & Reliable Delivery</h3>
                <p className="text-sm text-gray-600">
                  We ensure quick and safe delivery of every order, right to
                  your doorstep.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M14 2H6a2 2 0 0 0-2 2v16l8-4 8 4V4a2 2 0 0 0-2-2z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Secure Payments</h3>
                <p className="text-sm text-gray-600">
                  Multiple payment options with encrypted checkout for a safe
                  and secure shopping experience.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">
                  We stand by our products — every purchase comes with our
                  commitment to top-tier quality.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="relative overflow-hidden rounded-lg border bg-white hover:shadow-lg hover:shadow-teal-200 p-4 transition">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-teal-600 fill-current">
                <path d="M2 12L12 2l10 10-10 10L2 12z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Innovation & Growth</h3>
                <p className="text-sm text-gray-600">
                  At GRANDA, we continuously innovate to bring you the latest
                  trends and technologies in eCommerce.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 text-lg">
            GRANDA is more than just a store — it's a community built on trust,
            passion, and innovation.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} GRANDA. All rights reserved. Designed
            and managed by <span className="font-semibold">Athulya R Chandra</span>.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
