import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 mt-8">
            <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Get in Touch</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-800">Email</h3>
                            <p className="text-gray-600">support@contesthub.com</p>
                        </div>
                        
                        <div>
                            <h3 className="font-medium text-gray-800">Business Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                        </div>
                        
                        <div>
                            <h3 className="font-medium text-gray-800">Response Time</h3>
                            <p className="text-gray-600">We typically respond within 24-48 hours</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input 
                                type="text" 
                                className="input input-bordered w-full"
                                placeholder="Your name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                className="input input-bordered w-full"
                                placeholder="Your email"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Subject</label>
                            <select className="select select-bordered w-full">
                                <option value="">Select a topic</option>
                                <option value="support">Technical Support</option>
                                <option value="contest">Contest Inquiry</option>
                                <option value="billing">Billing Issue</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea 
                                className="textarea textarea-bordered w-full h-32"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;