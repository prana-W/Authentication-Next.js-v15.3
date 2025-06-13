import { Github, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-orange-600">Contact Us</h1>

                <p>
                    Hello! I’m <strong>Pranaw Kumar</strong>, a full-stack developer who enjoys building innovative solutions and
                    learning new things along the way. This project — SCMS — was built for a hackathon organized by our college Web Team
                    in under <strong>72 hours</strong>.
                </p>

                <p>
                    Through this experience, I gained deeper insights into full-stack workflows, database handling, authentication,
                    and dynamic UI design. I’m always looking forward to exploring more technologies and solving real-world problems
                    through code.
                </p>

                <h2 className="text-2xl font-semibold mt-8">Connect With Me</h2>
                <div className="flex space-x-6 mt-4">
                    <a
                        href="https://github.com/prana-W"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange-600"
                    >
                        <Github size={28} />
                    </a>
                    <a
                        href="https://twitter.com/prana_w_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange-600"
                    >
                        <Twitter size={28} />
                    </a>
                    <a
                        href="https://linkedin.com/in/pranaw-kumar-710331215"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-orange-600"
                    >
                        <Linkedin size={28} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
