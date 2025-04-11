import LegalMarkdown from "../legal-markdown";

export default function page() {
  return (
    <LegalMarkdown>
      {`
# **Return & Refund Policy**

**Effective Date:** [latest-date-when-we-publish]

Thank you for choosing our service. We believe in providing transparency about our policies, so here’s everything you need to know about refunds.

---

### **No Refund Policy**

We do not offer refunds for purchased credits or subscriptions. Here’s why:

- Every user receives **free trial credits** upon signing up. This allows you to explore and test the platform before making a purchase.
- Clear details about features, pricing, and usage are provided prior to checkout, ensuring informed decision-making.
- All purchases are final. We do not process refunds for unused credits, change of mind, or lack of usage.

---

### **Service Assurance**

We are committed to delivering a smooth and reliable experience. If you encounter a **technical issue** that prevents access to paid features, please contact our support team at [Insert Support Email]. Our team will investigate and assist promptly.

---

### **Contact Us**

If you have any questions about this policy, feel free to reach out:

📧 **Email:** [Insert Support Email]


            `}
    </LegalMarkdown>
  );
}
