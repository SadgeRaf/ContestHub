import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 mt-8">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                    <p className="text-gray-700">
                        We collect information you provide when creating an account, participating in contests, 
                        or contacting us. This includes your name, email address, and any content you submit.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                    <p className="text-gray-700">
                        Your information is used to operate the platform, process contest entries, communicate with you, 
                        and improve our services. We do not sell your personal information to third parties.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
                    <p className="text-gray-700">
                        We implement reasonable security measures to protect your information. However, no online 
                        platform can guarantee complete security.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
                    <p className="text-gray-700">
                        We may use third-party services for payment processing, analytics, or other functions. 
                        These services have their own privacy policies.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
                    <p className="text-gray-700">
                        We use cookies to enhance your experience on our platform. You can disable cookies in your 
                        browser settings, but this may affect functionality.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
                    <p className="text-gray-700">
                        You have the right to access, correct, or delete your personal information. Contact us 
                        if you wish to exercise these rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
                    <p className="text-gray-700">
                        We may update this Privacy Policy periodically. Changes will be posted on this page with 
                        an updated effective date.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                    <p className="text-gray-700">
                        For privacy-related questions or concerns, please contact us through our contact page.
                    </p>
                </section>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Effective date: {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;