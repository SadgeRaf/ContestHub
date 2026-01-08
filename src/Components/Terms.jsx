import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 mt-8 mb-2">
            <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                    <p className="text-gray-700">
                        By accessing and using ContestHub, you accept and agree to be bound by these Terms and Conditions. 
                        If you do not agree to these terms, you must not use our platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
                    <p className="text-gray-700">
                        You are responsible for maintaining the confidentiality of your account credentials. 
                        Any activities that occur under your account are your responsibility. You must notify us 
                        immediately of any unauthorized use of your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">3. Contest Participation</h2>
                    <p className="text-gray-700">
                        By entering contests on ContestHub, you agree to abide by the specific rules and guidelines 
                        of each contest. Contest organizers have the final say in determining winners and prize distribution.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">4. Content Submission</h2>
                    <p className="text-gray-700">
                        You retain ownership of any content you submit to contests. However, by submitting content, 
                        you grant ContestHub and contest organizers the right to display, reproduce, and distribute 
                        your content for contest-related purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">5. Prohibited Activities</h2>
                    <p className="text-gray-700">
                        Users must not engage in any fraudulent activities, submit plagiarized content, harass other 
                        users, or violate any laws while using ContestHub. Violations may result in account termination.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
                    <p className="text-gray-700">
                        ContestHub is not responsible for any damages, losses, or disputes arising from contest participation, 
                        prize distribution, or user interactions on the platform. We provide the platform as-is without warranties.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
                    <p className="text-gray-700">
                        We reserve the right to modify these Terms and Conditions at any time. Continued use of ContestHub 
                        after changes constitutes acceptance of the modified terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
                    <p className="text-gray-700">
                        For questions about these Terms and Conditions, please contact us through our contact page.
                    </p>
                </section>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;