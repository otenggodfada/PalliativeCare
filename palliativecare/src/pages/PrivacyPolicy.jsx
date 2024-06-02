import React from "react";
import { Typography } from "@material-tailwind/react";

const PrivacyPolicy = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h4" className="text-center mb-6">Privacy Policy and Terms of Service</Typography>

      <div className="space-y-6">
        <section>
          <Typography variant="h5" className="mb-2">Privacy Policy</Typography>
          <Typography variant="h6" className="mb-2">Introduction</Typography>
          <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to ensure your information is handled appropriately.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Information Collection</Typography>
          <p>We collect information that you provide to us directly, such as when you create an account, fill out a form, or contact customer support. We also collect information automatically through your use of our services, including IP addresses, browser types, and usage data.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Use of Information</Typography>
          <p>Your information is used to provide and improve our services, communicate with you, and ensure the security of our platform. We may also use your information for research and analytics purposes.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Sharing of Information</Typography>
          <p>We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our platform, complying with legal obligations, or protecting our rights.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Your Rights</Typography>
          <p>You have the right to access, update, or delete your personal information. You can also opt out of certain data collection practices. To exercise these rights, please contact our support team.</p>
        </section>

        <section>
          <Typography variant="h5" className="mb-2">Terms of Service</Typography>
          <Typography variant="h6" className="mb-2">Acceptance of Terms</Typography>
          <p>By using our services, you agree to these terms. If you do not agree to these terms, you should not use our services.        </p>
          
          <Typography variant="h6" className="mt-4 mb-2">User Responsibilities</Typography>
          <p>Users are expected to use our services in a lawful and respectful manner. Any misuse of the platform, including violation of any applicable laws or regulations, may result in termination of access to our services.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Modifications to Terms</Typography>
          <p>We may update these terms from time to time. We will notify you of any significant changes by posting the new terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new terms.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Limitation of Liability</Typography>
          <p>Our services are provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our services.</p>
          
          <Typography variant="h6" className="mt-4 mb-2">Contact Us</Typography>
          <p>If you have any questions about these terms, please contact our support team.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

