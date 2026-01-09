/**
 * Static Pages Data
 * 
 * Content for static pages: Privacy Policy, Terms of Use, Contact Us, Copyright Notification
 */

export interface StaticPageData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  showInFooter: boolean;
  footerOrder: number;
  pageType: 'general' | 'legal' | 'contact' | 'about';
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  showContactForm?: boolean;
}

export const staticPages: StaticPageData[] = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    excerpt: 'Learn how FiscalColumn collects, uses, and protects your personal information.',
    metaTitle: 'Privacy Policy - FiscalColumn',
    metaDescription: 'Read our Privacy Policy to understand how FiscalColumn handles your data, cookies, and personal information.',
    showInFooter: true,
    footerOrder: 1,
    pageType: 'legal',
    content: `# Privacy Policy

**Last Updated: January 7, 2026**

At FiscalColumn, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

## Information We Collect

### Personal Information
We may collect personal information that you voluntarily provide to us when you:
- Subscribe to our newsletter
- Create an account
- Contact us through our contact form
- Leave comments on articles

This information may include:
- Name and email address
- Phone number (optional)
- Any other information you choose to provide

### Automatically Collected Information
When you visit our website, we automatically collect certain information, including:
- IP address
- Browser type and version
- Operating system
- Pages visited and time spent
- Referring website
- Date and time of access

## How We Use Your Information

We use the information we collect to:
- Provide and maintain our services
- Send you newsletters and updates (with your consent)
- Respond to your inquiries and support requests
- Analyze website usage and improve user experience
- Protect against fraudulent or unauthorized activity
- Comply with legal obligations

## Cookies and Tracking Technologies

We use cookies and similar tracking technologies to:
- Remember your preferences
- Analyze site traffic and usage patterns
- Personalize content and advertisements
- Improve website functionality

You can control cookie settings through your browser preferences.

## Third-Party Services

We may share your information with:
- **Analytics Providers**: Google Analytics to understand website usage
- **Advertising Partners**: For displaying relevant advertisements
- **Email Service Providers**: For newsletter distribution

These third parties have their own privacy policies governing their use of information.

## Data Security

We implement appropriate security measures to protect your personal information, including:
- SSL/TLS encryption for data transmission
- Secure data storage practices
- Regular security assessments
- Access controls for authorized personnel only

## Your Rights

You have the right to:
- Access the personal information we hold about you
- Request correction of inaccurate information
- Request deletion of your personal information
- Opt-out of marketing communications
- Withdraw consent at any time

## Children's Privacy

Our website is not intended for children under 13. We do not knowingly collect personal information from children.

## Changes to This Policy

We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.

## Contact Us

If you have questions about this Privacy Policy, please contact us at:

**Email**: privacy@fiscalcolumn.com
**Address**: FiscalColumn, Bangalore, Karnataka, India

---

By using our website, you agree to the terms of this Privacy Policy.`
  },
  {
    title: 'Terms of Use',
    slug: 'terms-of-use',
    excerpt: 'Read the terms and conditions for using the FiscalColumn website and services.',
    metaTitle: 'Terms of Use - FiscalColumn',
    metaDescription: 'Terms and conditions for using FiscalColumn website. Read before using our financial news and information services.',
    showInFooter: true,
    footerOrder: 2,
    pageType: 'legal',
    content: `# Terms of Use

**Effective Date: January 7, 2026**

Welcome to FiscalColumn. By accessing and using this website, you agree to be bound by these Terms of Use. Please read them carefully.

## 1. Acceptance of Terms

By accessing, browsing, or using FiscalColumn (the "Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.

## 2. Description of Service

FiscalColumn provides:
- Financial news and market updates
- Gold and silver rate information
- Stock market analysis and insights
- Educational content on personal finance
- Investment-related articles and guides

## 3. Disclaimer of Financial Advice

**IMPORTANT**: The information provided on FiscalColumn is for general informational purposes only and should NOT be construed as:
- Professional financial advice
- Investment recommendations
- Legal or tax advice
- An offer or solicitation to buy or sell securities

Always consult with a qualified financial advisor, tax professional, or other appropriate expert before making any investment decisions.

## 4. Accuracy of Information

While we strive to provide accurate and up-to-date information:
- Market data may be delayed by 15-20 minutes
- Prices and rates are subject to change without notice
- We do not guarantee the accuracy, completeness, or timeliness of any information
- Historical performance does not guarantee future results

## 5. Intellectual Property

All content on this website, including but not limited to:
- Text, articles, and written content
- Images, graphics, and logos
- Website design and layout
- Trademarks and service marks

...is the property of FiscalColumn or its content suppliers and is protected by copyright laws.

### Permitted Use
You may:
- View and read content for personal, non-commercial use
- Share links to our articles on social media
- Quote brief excerpts with proper attribution

### Prohibited Use
You may NOT:
- Copy, reproduce, or distribute content without permission
- Modify, adapt, or create derivative works
- Use content for commercial purposes
- Remove copyright or proprietary notices
- Scrape or harvest data using automated means

## 6. User Conduct

When using our website, you agree NOT to:
- Violate any applicable laws or regulations
- Post false, misleading, or defamatory content
- Impersonate any person or entity
- Upload malicious code or viruses
- Attempt to gain unauthorized access to our systems
- Interfere with the proper functioning of the website
- Engage in any activity that could damage our reputation

## 7. Third-Party Links

Our website may contain links to third-party websites. We are not responsible for:
- The content or accuracy of external sites
- The privacy practices of third parties
- Any transactions conducted on external sites

## 8. Limitation of Liability

To the fullest extent permitted by law:
- FiscalColumn shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website
- We do not guarantee uninterrupted or error-free access
- We are not liable for any investment losses based on information from our website

## 9. Indemnification

You agree to indemnify and hold harmless FiscalColumn, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:
- Your use of the website
- Your violation of these Terms
- Your violation of any third-party rights

## 10. Modifications

We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Continued use of the website constitutes acceptance of modified terms.

## 11. Termination

We may terminate or suspend your access to the website at any time, without prior notice, for any reason.

## 12. Governing Law

These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.

## 13. Contact Information

For questions about these Terms of Use, contact us at:

**Email**: legal@fiscalcolumn.com
**Website**: www.fiscalcolumn.com

---

By using FiscalColumn, you acknowledge that you have read, understood, and agree to these Terms of Use.`
  },
  {
    title: 'Copyright Notification',
    slug: 'copyright-notification',
    excerpt: 'Copyright and intellectual property information for FiscalColumn content.',
    metaTitle: 'Copyright Notice - FiscalColumn',
    metaDescription: 'Copyright and intellectual property notice for FiscalColumn. All content is protected under applicable copyright laws.',
    showInFooter: true,
    footerOrder: 3,
    pageType: 'legal',
    content: `# Copyright Notification

**© 2024-2026 FiscalColumn. All Rights Reserved.**

## Ownership of Content

All content published on FiscalColumn, including but not limited to articles, news reports, analysis, commentary, graphics, photographs, logos, icons, and software, is the exclusive property of FiscalColumn and its content partners.

## Protected Materials

The following materials are protected under applicable copyright and intellectual property laws:

### Written Content
- News articles and market reports
- Analysis and commentary pieces
- Educational guides and tutorials
- Financial data compilations

### Visual Elements
- Website design and layout
- Logos and brand marks
- Infographics and charts
- Photographs and illustrations

### Technology
- Website code and scripts
- Databases and data structures
- Mobile applications (if any)

## Permitted Uses

### Personal Use
You may access and read our content for personal, non-commercial purposes.

### Sharing
You may share links to our articles on social media platforms, provided you:
- Do not modify the content
- Include proper attribution to FiscalColumn
- Do not imply endorsement

### Fair Use
Brief quotations for purposes of criticism, comment, news reporting, teaching, or research may be permitted under fair use provisions, provided:
- Proper credit is given to FiscalColumn
- The quotation is reasonable in length
- It does not substitute for the original work

## Prohibited Uses

Without prior written permission, you may NOT:

- **Reproduce** our content in any form
- **Distribute** copies of our articles
- **Republish** content on other websites
- **Create** derivative works
- **Use** content for commercial purposes
- **Scrape** or harvest data using automated tools
- **Frame** our website within another site
- **Remove** or alter copyright notices

## DMCA Notice

If you believe your copyrighted work has been infringed on FiscalColumn, please send a DMCA notice to:

**Email**: copyright@fiscalcolumn.com

Your notice should include:
1. Identification of the copyrighted work
2. Location of the infringing material on our site
3. Your contact information
4. A statement of good faith belief
5. A statement of accuracy under penalty of perjury
6. Your physical or electronic signature

## Trademarks

"FiscalColumn" and our logo are trademarks of FiscalColumn. Unauthorized use of our trademarks is strictly prohibited.

## Third-Party Content

Some content on our website may be licensed from third parties. Such content remains the property of the respective owners and is used under license.

## Enforcement

We actively monitor for copyright infringement and will take appropriate legal action against violators. Penalties may include:
- Cease and desist orders
- Monetary damages
- Legal fees and costs

## Contact

For permission requests or copyright inquiries:

**Email**: copyright@fiscalcolumn.com

---

*This copyright notice was last updated on January 7, 2026.*`
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    excerpt: 'Get in touch with the FiscalColumn team. We\'re here to help with your questions and feedback.',
    metaTitle: 'Contact Us - FiscalColumn',
    metaDescription: 'Contact FiscalColumn for questions, feedback, or business inquiries. Reach our team via email or through our contact form.',
    showInFooter: true,
    footerOrder: 4,
    pageType: 'contact',
    contactEmail: 'contact@fiscalcolumn.com',
    contactPhone: '+91-80-XXXX-XXXX',
    contactAddress: 'FiscalColumn\nBangalore, Karnataka\nIndia - 560001',
    showContactForm: true,
    content: `# Contact Us

We'd love to hear from you! Whether you have questions, feedback, or business inquiries, our team is here to help.

## General Inquiries

For general questions about our content, website, or services, please reach out to us. We typically respond within 24-48 business hours.

## Feedback & Suggestions

Your feedback helps us improve! If you have suggestions for:
- New features or content topics
- Website improvements
- Error reports or corrections

Please don't hesitate to let us know.

## Business & Partnerships

Interested in partnering with FiscalColumn? We welcome inquiries regarding:
- **Advertising**: Display ads, sponsored content
- **Content Partnerships**: Syndication, guest articles
- **Data Licensing**: Market data, API access
- **Media Relations**: Press inquiries, interviews

## Careers

While we're a growing team, we occasionally have openings for:
- Financial Writers & Analysts
- Web Developers
- Digital Marketing Specialists

Send your resume to **careers@fiscalcolumn.com**

## Report an Issue

Found an error in our content? Please let us know:
- The article or page URL
- Description of the error
- Suggested correction (if applicable)

We appreciate your help in maintaining accuracy.

## Response Time

- **General inquiries**: 24-48 business hours
- **Business partnerships**: 3-5 business days
- **Technical issues**: 12-24 hours
- **Content corrections**: 24 hours

## Office Hours

**Monday - Friday**: 9:00 AM - 6:00 PM IST
**Saturday**: 10:00 AM - 2:00 PM IST
**Sunday**: Closed

## Connect With Us

Follow us on social media for the latest updates:
- Twitter: @FiscalColumn
- LinkedIn: FiscalColumn
- Facebook: FiscalColumn

---

*Thank you for choosing FiscalColumn as your trusted source for financial news and insights.*`
  }
];

