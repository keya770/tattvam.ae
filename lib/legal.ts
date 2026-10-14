export type Block = string | { list: string[] } | { callout: string };
export type LegalDoc = {
  title: string;
  intro: string;
  primary: string;
  next: { label: string; href: string };
  sections: { h: string; body: Block[] }[];
};

export const LEGAL: Record<string, LegalDoc> = {
  "privacy-policy-internal-privacy-controls": {
    title: "Privacy Policy & Internal Privacy Controls",
    intro: "How Tattvam Capital Markets collects, uses, and protects your personal and financial information in accordance with the Mauritius Data Protection Act 2017.",
    primary: "Create a Secure Account",
    next: { label: "Risk Disclosure", href: "/risk-disclosure-policy" },
    sections: [
      { h: "Introduction", body: [
        "Tattvam Capital Markets (the \"Company\") places a high priority on the privacy and integrity of the personal information of our customers, both present and future. The Company strives to ensure the safety and confidentiality of all information received from the Customer.",
        "This Privacy Policy & Internal Privacy Controls (the \"Policy\") describes how the Company collects, uses, and protects the personal information of the Customer.",
      ] },
      { h: "Data Protection Principles", body: [
        "In accordance with the Mauritius Data Protection Act 2017, the Company views the protection, privacy, and safeguarding of the personal and financial information of clients and website visitors as a high priority.",
        "Tattvam Capital Markets and everyone responsible for using data follow strict rules on how personal information can be collected and used. Personal information must be:",
        { list: [
          "Used fairly and lawfully",
          "Used for limited, specifically stated purposes",
          "Used in a way that is adequate, relevant, and not excessive",
          "Accurate and kept for no longer than absolutely necessary",
          "Handled according to people's data protection rights",
          "Kept safe and secure — not transferred without adequate protection",
        ] },
      ] },
      { h: "Non-Public Information", body: [
        "The Company routinely collects personal, confidential, and sensitive non-public information (\"Non-Public Information\") from its customers. The Company is committed to safeguarding this information so that its confidentiality can be maintained and unauthorized access, use, or disclosure of this information can be prevented.",
        "If the Customer does not want the Company to use the Non-Public Information, the Customer should so inform the Company in writing by sending an email or a letter by registered post at the registered office of the Company. Should the Customer wish to opt out, the Company may not be able to continue providing information, services, and products requested by the Customer.",
        "The Company will not use or disclose Non-Public Information for any purpose other than for the performance of business activities or if required by law.",
        { callout: "All credit/debit card details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties." },
      ] },
      { h: "Retention & Security", body: [
        "Tattvam Capital Markets will keep personal data only as long as it is necessary, including for the purposes of updating the product or services or as required by law. When the personal data is no longer required, it will be destroyed either by shredding or other approved destruction methods.",
        "We have developed and will maintain security procedures to safeguard personal data against loss, theft, copying, and unauthorized disclosure, use, or modification. Access to personal data is restricted to employees and authorized service providers who need it to perform their work.",
        "The Company takes the issue of security very seriously and ensures that all possible measures to ensure the safety of your confidential information, including adhering to strict standards for the internal use of confidential information and using leading data storage technology.",
      ] },
      { h: "Cookies", body: [
        "Cookies are small pieces of information sent by a web server to store on a web browser so it can be read back later from that web browser. Cookies may be used on some pages of the Site for us to provide Site users with a more customized web browsing experience.",
      ] },
      { h: "Card Payments", body: [
        "When making a payment with a credit/debit card, the client will be transferred to the site of the processing center where a form has to be filled out. To prevent the unauthorized use of your credit/debit card, the client's card information is transmitted to the Company in a shortened form and through a secure server.",
      ] },
      { h: "Sharing & Consent", body: [
        "The Company may occasionally share Non-Public Information with its affiliates or third-party service providers and joint marketers not affiliated with the Company for purposes such as supporting financial products, servicing accounts, cooperating with regulatory authorities, or complying with court orders.",
        "By accepting the Customer Agreement, the Customer consents to the Company collecting, maintaining, using, and disclosing their Non-Public Information in accordance with the terms of this Policy.",
        "By accessing our Site, you consent to Tattvam Capital Markets collecting, maintaining, using, and disclosing your Personal Data in accordance with this privacy policy.",
      ] },
      { h: "Access & Updates", body: [
        "The Company endeavors to keep its customer files complete and accurate. It shall also give its customers reasonable access to any Non-Public Information maintained on that customer.",
        "This Policy is set out on the Website, and the Company may update this Policy from time to time. The revised Policy, together with a general notice informing customers of such changes, will be promptly posted to the Website whenever this Policy is materially amended.",
        "The Customer is encouraged to periodically check back and review this Policy so that the Customer will always know what information the Company collects, how it uses it, and to whom it discloses it.",
      ] },
    ],
  },
  "risk-disclosure-policy": {
    title: "Risk Disclosure Policy",
    intro: "Important information about the risks involved in trading financial markets. Please read carefully before opening a trading account.",
    primary: "Register with Eyes Open",
    next: { label: "Client Agreement", href: "/client-agreement" },
    sections: [
      { h: "Purpose", body: [
        "The following statements are intended to inform the Customer of the potential risks involved in trading on financial markets. Customers should be aware of the potential losses associated with such risks. This document forms an integral part of the Agreement between the Company and the Customer.",
        "In issuing a licence to Tattvam Capital Markets (the \"Company\"), no regulatory authority has vouched for the reliability and financial soundness of the products offered or the correctness of statements or opinions expressed by the Company.",
        "Every Customer should deal with the Company at their own risks and shall not be protected by any statutory compensation arrangements in any event whatsoever.",
      ] },
      { h: "Trading Risk", body: [
        "Online trading involves substantial risks. Prospective Customers should be aware that they can benefit as well as lose all or part of their funds when engaging in trading activities.",
        "In deciding to trade in the Company's products, Customers must rely on their examination of the products, including the merits and risks involved. The Company does not provide advice of any kind, including tax, investment, or legal advice other than general consultations to Customers.",
        { callout: "Online trading involves a high degree of risk. Customers may not receive the amount that they initially invested and may lose all or part of their funds." },
      ] },
      { h: "Leverage & Margin", body: [
        "When executing trading operations under margin trading conditions, even small market movements may have a great impact on a Customer's Trading Account due to the effect of leverage.",
        "The Customer must take into consideration that if the trend on the market is against them, the Customer may sustain a total loss of their Initial Margin and any additional funds deposited to maintain Open Positions.",
      ] },
      { h: "Technical Risks", body: [
        "Customers shall assume the risk of financial loss caused by the failure of information, communication, electronic and other systems, including:",
        { list: [
          "Failure of the Customer's hardware, software, and internet connection",
          "Improper operation of the Customer's equipment",
          "Wrong settings in the Client Terminal or delayed updates",
          "Difficulty getting telephone communication during peak load or fast markets",
          "Increased execution time under abnormal market conditions",
        ] },
        "The Customer acknowledges that only one Request or Instruction is allowed in the queue. Once sent, any other Request will be ignored and \"Order is locked\" may appear.",
        "The only reliable source of quoting information is the server for Customers with live accounts. The quote base in the Customer terminal shall not be considered a reliable source given connection issues.",
        "The Customer assumes the risk of executing unplanned Transactions if another Instruction is sent before receiving the result from the previous one.",
      ] },
      { h: "Communication", body: [
        "The Customer shall assume the risk of any financial loss caused by not receiving a notification from the Company or it being delayed.",
        "Unencrypted information transmitted by email is not protected from unauthorized access. The Company may delete internal mail messages after five days.",
        "The Customer assumes full responsibility for the safekeeping of information received from the Company and bears all risks of financial loss caused by unauthorized access to the trading account.",
      ] },
      { h: "Funding & Withdrawals", body: [
        "In case the company disengages with an investor whose status changes (e.g., becomes a PEP) or fitness and propriety changes during the business relationship, investments made will then be reimbursed.",
        "Investments are made via credit card, wire transfers, or virtual cards. Withdrawals are made on a source-to-source basis — for example, wire transfer deposits are reimbursed by wire transfer.",
      ] },
    ],
  },
  "client-onboarding-process": {
    title: "Client Onboarding Process",
    intro: "Our structured AML/CFT-compliant onboarding process ensures every client is verified, approved, and supported from registration through first trade.",
    primary: "Begin Client Onboarding",
    next: { label: "Client Agreement", href: "/client-agreement" },
    sections: [
      { h: "Overview", body: [
        "Tattvam Capital Markets (the \"Company\") is authorized and regulated by the Financial Services Commission of Mauritius (\"FSC\"). The Company is committed to complying with its legal and regulatory responsibilities in relation to Anti-Money Laundering & Counter Terrorist Financing (AML/CFT) and has no appetite for non-compliance.",
        "This Client Onboarding Process applies to all end clients which will be onboarded, be they retail or corporate. It articulates minimum standards that meet and aim to exceed regulatory and legislative obligations and the guidance provided by the FSC.",
      ] },
      { h: "Sourcing of Clients", body: ["Clients are sourced from our target market and are known to the UBO. Tattvam Capital Markets will NOT deal with or provide services to OFAC sanctions countries, non-cooperative jurisdictions, or FATF Public Statement countries."] },
      { h: "Registration of Clients", body: ["The Onboarding Team liaises with prospective clients. All clients complete a Client Application Form, Client Agreement, and submit Customer Due Diligence (CDD) information. If a client refuses to provide required information or provides misleading information, the Company will not proceed with opening an account."] },
      { h: "Compliance Referral", body: ["Upon obtaining the Client Application form, client agreement, and KYC/CDD documents, the Onboarding Team refers the client to the Compliance department."] },
      { h: "Approval & Account Opening", body: ["The Compliance Analyst performs screening on each client. Upon successful approval, the Backoffice team refers the client to the dealing team for opening of a client trading account in MetaQuotes trading software."] },
      { h: "Trading Account Credentials", body: ["The Onboarding Team shares client trading account credentials with respective clients. Each client has their own ID and password to access their account for trading. All trades are executed by the client and the account is updated automatically."] },
      { h: "Funding of Trading Account", body: ["All clients fund their trading accounts through bank transfers. SBM Bank (Mauritius) Ltd (SBM) is the primary bank account and client funds are accepted in client-segregated accounts. All withdrawals are processed through client-segregated accounts."] },
      { h: "Trading & Monitoring", body: ["The dealing team manages trading operations and monitors all client trades. For margin requirements or specific requests, the Onboarding / Backoffice team manages communications with clients."] },
    ],
  },
  "complaint-handling-policy": {
    title: "Complaint Handling Policy",
    intro: "Our four-step complaints procedure ensures every client concern is recorded, investigated, and resolved fairly and promptly.",
    primary: "Open Account with Recourse",
    next: { label: "Contact Us", href: "/contact-us" },
    sections: [
      { h: "Introduction", body: [
        "Tattvam Capital Markets (herein the 'Company') fully adheres to the rules on complaint handling. In the event that a dispute arises, the Client shall have the right to file a complaint with the Company.",
        "This document sets out the Company's complaint procedures, prepared to demonstrate the Company's aim to treat its customers fairly at all times.",
      ] },
      { h: "Our Four-Step Procedure", body: [{ list: [
        "We record the details of your complaint and contact you within 48 hours of receipt, confirming your contact person at the Company",
        "We thoroughly investigate the basis of the complaint using all available information",
        "After investigation, we correct any errors on the part of the Company",
        "We let you know the outcome of our investigation",
      ] }] },
      { h: "What to Include", body: [
        "When making a complaint please include:",
        { list: ["Trading account number", "Full name", "Description of the problem and transaction number (if applicable)", "Date and time the issue arose"] },
        "The Company may refuse a client's complaint regarding non-trading operations where the complaint did not meet the requirements of this Policy, was not made according to the provided standard form, or where the client initiates operations using funds from a disputed non-trading operation.",
      ] },
      { h: "Timeframes", body: [
        "An initial response will be sent within 48 hours of receiving the complaint. Simple complaints are dealt with within 5 business days. We endeavour to resolve all complaints within 4 weeks. At the latest, your complaint will be dealt with within 8 weeks from receipt.",
        { callout: "Please write your complaints to complaints@tattvammarkets.com — it will be replied to within 24 hours." },
      ] },
    ],
  },
  "client-agreement": {
    title: "Client Agreement",
    intro: "The terms and conditions governing your relationship with Tattvam Capital Markets — covering account opening, trading, funding, and client obligations.",
    primary: "Accept Terms & Register",
    next: { label: "Onboarding Process", href: "/client-onboarding-process" },
    sections: [
      { h: "Agreement", body: [
        "This Client Agreement (the \"Agreement\") constitutes a legally binding contract between Tattvam Capital Markets Ltd (the \"Company\") and the Client. By completing the Client Application Form and opening a trading account, the Client agrees to be bound by the terms set out herein and all referenced policies.",
        "The Company is authorized and regulated by the Financial Services Commission of Mauritius (Investment Dealer License 183299GBC).",
      ] },
      { h: "Services", body: [
        "The Company provides execution-only trading services on financial instruments including forex, commodities, indices, and share CFDs via the MetaTrader 5 platform. The Company does not provide investment advice, tax advice, or portfolio management services.",
        { list: ["Execution-only brokerage on MT5", "Multi-asset trading across global markets", "Client fund segregation with SBM Bank (Mauritius) Ltd", "Access subject to successful KYC/CDD completion"] },
      ] },
      { h: "Client Obligations", body: [
        "The Client agrees to provide accurate and complete information during onboarding and to notify the Company of any material changes. The Client is responsible for maintaining the confidentiality of account credentials and for all instructions transmitted from their account.",
        { list: ["Provide truthful KYC/CDD documentation", "Maintain secure login credentials", "Ensure sufficient margin for open positions", "Comply with applicable laws in the Client's jurisdiction"] },
      ] },
      { h: "Risk Acknowledgement", body: ["By accepting this Agreement, the Client confirms they have read and understood the Risk Disclosure Policy and acknowledge that trading leveraged products involves substantial risk of loss, including the possibility of losing more than the initial deposit in certain circumstances."] },
      { h: "Privacy", body: ["By accepting this Agreement, the Customer consents to the Company collecting, maintaining, using, and disclosing their Non-Public Information in accordance with the Privacy Policy & Internal Privacy Controls."] },
      { h: "Complaints", body: ["Complaints shall be handled in accordance with the Complaint Handling Policy. The Client may file a complaint by email to complaints@tattvammarkets.com with the required information as set out in that policy."] },
      { h: "Amendments", body: ["The Company may amend this Agreement from time to time. Material amendments will be posted on the Website with notice to Clients. Continued use of the Company's services after such notice constitutes acceptance of the revised terms."] },
    ],
  },
};
