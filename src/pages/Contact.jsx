const Contact = () => {

    return (
        <>
            <section className="bg-blue-50 dark:bg-slate-800" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                            Contact Us
                        </p>
                        <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                            Get in Touch with GRANDA
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-slate-400">
                            Have questions about your order or want to collaborate?
                            We're always happy to hear from you. Our support team, led by{" "}
                            <span className="font-semibold text-blue-700 dark:text-blue-300">
                                Athulya R Chandra
                            </span>
                            , is here to assist you.
                        </p>
                    </div>

                    {/* Contact Info + Map */}
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Left Section - Contact Info */}
                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                                    You can reach out to us using the channels below, or visit our office for
                                    in-person support.
                                </p>
                                <ul className="mb-6 md:mb-0 space-y-6">
                                    {/* Address */}
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-6 w-6"
                                            >
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                                Office Address
                                            </h3>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                GRANDA HQ, MG Road, Trivandrum, Kerala, India
                                            </p>
                                        </div>
                                    </li>

                                    {/* Contact */}
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-6 w-6"
                                            >
                                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                                Contact Info
                                            </h3>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                Phone: +91 98765 43210
                                            </p>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                Email: support@granda.com
                                            </p>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                Admin: athulyarchandra@granda.com
                                            </p>
                                        </div>
                                    </li>

                                    {/* Working Hours */}
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-6 w-6"
                                            >
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                                Working Hours
                                            </h3>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                Monday - Saturday: 9:00 AM - 6:00 PM
                                            </p>
                                            <p className="text-gray-600 dark:text-slate-400">
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Section - Google Map */}
                            <div className="card h-fit max-w-6xl px-0 md:px-12 md:py-4" id="form">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0505588332608!2d76.94537847482646!3d8.4944653915471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbbbd6de2871%3A0x30b0af41e768f417!2sMahatma%20Gandhi%20Rd%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1762154717104!5m2!1sen!2sin"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="GRANDA Location" width="600" height="450" allowfullscreen="" ></iframe>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;


