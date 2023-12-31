// Modal điều khoản sử dụng website
document.getElementById("terms-and-conditions").addEventListener("click", (e) => {
    e.preventDefault();

    // Tạo tag <div> làm nền mờ cho modal
    let backdrop = document.createElement("div");
    backdrop.classList.add("fixed", "inset-0", "bg-gray-500", "bg-opacity-40", "flex", "justify-center", "items-center", "z-100");

    // Tạo tag <div> để chứa modal - là nơi text về điều khoản sử dụng
    let modal = document.createElement("div");
    modal.classList.add("m-4", "px-5", "py-10", "bg-white", "shadow-2xl", "rounded-lg");

    // Tạo tag <div> để text về điều khoản sử dungF
    let text = document.createElement("div");
    text.classList.add("max-h-[80vh]", "max-w-[80vw]", "md:max-h-[80vh]", "md:max-w-[60vw]", "lg:max-h-[80vh]", "lg:max-w-[30vw]", "overflow-y-scroll", "text-justify", "p-5");
    text.innerHTML = `<h1 class="text-4xl font-semibold mb-3">1. Preamble</h1>
    <p class="mb-2 text-md">1.1. Kaleido AI GmbH (hereinafter referred to as the Operator) develops and sells the software solution remove.bg, a web-based application for processing photos. The subject of this Contract is the provision of the software as a service.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">2. Subject of the Contract</h1>
    <p class="mb-2 text-md">2.1. The subject of this Contract is the temporary, non-exclusive use of the software remove.bg (hereinafter: the Software) according to point 3 of this Contract by the customer (hereinafter: the Customer). The scope of performance and functionality of the Software is derived from the interface description that the Customer has received separately or from the description at www.remove.bg/pricing and www.remove.bg/api.</p>
    <p class="mb-2 text-md">2.2. The Software is only available on the internet; the function of the Software therefore depends on a functioning internet connection. The system requirements necessary for the operation of the Software can be found in the interface description according to point 2.1 or at www.remove.bg/pricing.</p>
    <p class="mb-2 text-md">2.3. General terms and conditions of the Customer do not apply.</p>
    <p class="mb-2 text-md">2.4. Creation of multiple accounts for the same person is not allowed.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">3. Rights of use</h1>
    <p class="mb-2 text-md">3.1. The Customer shall acquire the non-exclusive right, which is limited in time to the duration of this Contract, to use the Software to the extent of the selected variant worldwide for internal or its own use.</p>
    <p class="mb-2 text-md">3.2. The scope of use (commercial or non-commercial) is based on the tariff chosen by the Customer. If the tariff chosen by the Customer so provides, the Customer may use, process or exploit the result of the Software (depending on the chosen tariff) commercially or non-commercially in any manner whatsoever. In the case of non-commercial use, the Customer is prohibited from using the results of the Software for direct or indirect commercial purposes.</p>
    <p class="mb-2 text-md">3.3. Transfer of the Software for use by third parties or other provision to third parties, such as by way of letting, is not permitted.</p>
    <p class="mb-2 text-md">3.4. Billing is via credits, which the Customer can obtain from "Paddle" (paddle.com). Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.</p>
    <p class="mb-2 text-md">3.5. Monthly credits shall expire at the end of a billing cycle, one-off credits after 24 months. In the context of the use of the Software, the Customer has the right to process photos in the amount equivalent to the credits acquired (the equivalent value is based on the respective tariff). A photo is considered to have been processed when the Customer is offered the result for download (regardless of whether the Customer downloads the photo). Should a Customer make more than 15% of unsuccessful requests (requests that cannot be processed), the Operator reserves the right to block access to the interface.</p>
    <p class="mb-2 text-md">3.6 The Operator shall grant the Customer a right of withdrawal for 30 days from the date of the Contract, unless the Customer has made use of the services (even in part). Use in accordance with point 6.3 also excludes withdrawal.</p>
    <p class="mb-2 text-md">3.7. The Operator shall provide the Customer (depending on the selected tariff) with an API interface with which the Customer can integrate the Software into its own websites, apps and software. The Customer has the right to integrate the Software into an unlimited number of its own websites, apps and software. Provision of the API interface to third parties (in return for payment or free of charge) is not permitted. The Customer may install the API interface only on websites in which the Customer is named in the legal notice. Integration into software and apps is permitted only if the Customer holds the rights of use of the respective software.</p>
    <p class="mb-2 text-md">3.8. Use for the following purposes is prohibited: Research/development of artificial intelligence (in particular generation of training data), military use, pornography, gambling/betting, terrorism, creation of "fake news".</p>
    <p class="mb-2 text-md">Use by organizations that carry out, encourage or require unlawful violence or physical injury to persons or property, or carry out, encourage or require unlawful force against any group based on race, religion, disability, gender, sexual orientation or national origin.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">4. Availability</h1>
    <p class="mb-2 text-md">4.1. In the context of the use of a version for which a fee is charged, the Operator undertakes to make the Software available to the Customer 98% of the time, calculated over one year (hereinafter referred to as the Availability). Availability is provided if the Software can be accessed via an internet connection in Austria that meets the system specifications, as described in the specification. Maintenance for which notification has been given by the Operator does not reduce the Availability.</p>
    <p class="mb-2 text-md">4.2. Higher availability must be agreed separately.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">5. Rights and obligations of the Customer</h1>
    <p class="mb-2 text-md">5.1. The Customer undertakes to keep all access data to the Software (e.g. passwords, API keys) secret.</p>
    <p class="mb-2 text-md">5.2. The Customer undertakes to refrain from any actions that compromise the functionality or operation of the Software. In particular, the Customer is prohibited from carrying out any actions that scan or test weak points of the Software, bypass security systems or access systems of the Software or integrate malware into the Software.</p>
    <p class="mb-2 text-md">5.3. The Customer guarantees that it has all the necessary rights (such as copyright, ancillary copyright, industrial property rights, trademark rights) for processing the uploaded photos.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">6. Contract duration</h1>
    <p class="mb-2 text-md">6.1. This Contract shall begin on activation of the account and is concluded for an indefinite period. Changes to the chosen tariff (upgrade and downgrade) shall take effect immediately. The respective minimum contract duration (see point 6.2) shall commence again at the same time.</p>
    <p class="mb-2 text-md">6.2. This Contract may be terminated by either party in writing by registered letter, subject to a one-month notice period, at the end of the respective accounting period. In addition, the Customer has the option of canceling the Contract directly in the account in the "My Dashboard" area, subject to the notice period. The termination shall take effect on the day following the last day of the accounting period.</p>
    <p class="mb-2 text-md">6.3. The Customer has the option of using the API interface provided by the Operator free of charge for the period offered by the Operator or to the extent offered by the Operator. In this case, the Customer is obliged to provide information about the Operator to the recipients of the edited photos by means of a link provided by the Operator. If the tariff selected by the Customer stipulates advertising of the Software, this obligation also exists in the use of the Software in return for payment.</p>
    <p class="mb-2 text-md">6.4. This Contract may be terminated by the Operator for good cause with immediate effect. The following constitute good causes in any case:</p>
    <p class="mb-2 text-md">6.4.1. if the Customer breaches the provisions of this Contract and does not desist from the conduct that breaches the Contract even after a written reminder within a period of seven working days;</p>
    <p class="mb-2 text-md">6.4.2. if the Customer is unable to pay or insolvency proceedings are instigated in respect of the Customer's assets or an application for the instigation of such proceedings is rejected for lack of assets to cover the costs;</p>
    <p class="mb-2 text-md">6.4.3. if the Customer violates point 5.3 or point 3.8 of this agreement.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">7. Terms of payment</h1>
    <p class="mb-2 text-md">7.1. All fees for recurring services are due before the beginning of the respective accounting period. The billing period shall commence on the day the Contract is concluded and end after one month. Monthly credits that are not used in an accounting period shall expire at the end of the accounting period and cannot be transferred to the next accounting period.</p>
    <p class="mb-2 text-md">7.2. Taxes and duties which are related to the current fee shall be paid by the Customer. The Customer hereby indemnifies the Operator in this respect.</p>
    <p class="mb-2 text-md">7.3. The Customer's activation shall take place as soon as the current fee has been paid. Should the Customer be in default even for one day only, the Operator is entitled to prohibit the Customer from further use of the Software and cancel all services. This is without prejudice to the obligation of the Customer to pay the agreed fee.</p>
    <p class="mb-2 text-md">7.4. Reminder fees shall be charged at EUR 12.00 per reminder.</p>
    <p class="mb-2 text-md">7.5. The Customer is not entitled to offset claims against the Operator unless such claims have been legally established by a court.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">8. Warranty and liability</h1>
    <p class="mb-2 text-md">8.1. Any warranty for the results of the Software and its Availability is excluded. If, nevertheless, a warranty claim should exist, the warranty period is six months.</p>
    <p class="mb-2 text-md">8.2. The Operator is not liable for the speed of the Software, its Availability, data loss or the correctness of the results. In addition, the liability of the Operator is excluded unless the damage has been caused intentionally or through gross negligence. This does not apply in cases of loss of life or damage to the health of a person.</p>
    <p class="mb-2 text-md">8.3. The liability of the Operator is in any case limited to the amount that the Customer has paid in ongoing fees in the last 3 months before the event giving rise to liability.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">9. Confidentiality and data privacy</h1>
    <p class="mb-2 text-md">9.1. As a matter of principle, remove.bg does not process any personal data. If the Customer is a private individual and processing is carried out exclusively for personal and family activities, remove.bg shall process all personal data submitted by the Customer exclusively on the basis of the General Data Protection Regulation.</p>
    <p class="mb-2 text-md">If the Customer is a company and the Customer submits personal data, the Data Processing Agreement available at www.remove.bg/dpa shall apply. In using the Software, the Customer accepts the Data Processing Agreement.</p>
    <p class="mb-2 text-md">9.2. All other data protection information is available to the Customer at www.remove.bg/privacy</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">10. Contact by e-mail</h1>
    <p class="mb-2 text-md">10.1. The Customer gives consent to receiving e-mails from the Operator for purposes of information and advertising of its products and product developments and for news.</p>
    <p class="mb-2 text-md">10.2 The Customer gives consent to being named as a reference by remove.bg.</p>
    <p class="mb-2 text-md">10.3. The Customer may withdraw consent at any time by sending an e-mail to team@remove.bg.</p>

    <h1 class="text-4xl font-semibold mt-6 mb-3">11. Concluding provisions</h1>
    <p class="mb-2 text-md">11.1. Legal disputes arising from this Contract are governed exclusively by Austrian law. Application of the UN Convention for the International Sale of Goods, the referral standards of the IPRG and the Regulation (EC) no. 593/2008 of the European Parliament and of the Council of June 17, 2008 on the law applicable to contractual obligations (Rome I Regulation) is excluded.</p>
    <p class="mb-2 text-md">11.2. The agreed place of performance is the registered office of the Operator.</p>
    <p class="mb-2 text-md">11.3. The exclusive jurisdiction for disputes arising out of or in connection with this Contract shall be the competent court in Vienna-Inner City, Austria.</p>
    <p class="mb-2 text-md">11.4. Changes and/or additions to this Contract must be made in writing to be valid; written form is also required for departure from this formal requirement.</p>
    <p class="mb-2 text-md">11.5. Should individual provisions of this Contract be void, unenforceable and/or invalid, this shall not result in the invalidity, unenforceability and/or invalidity of the entire Contract. In this case, the contracting parties undertake to agree on a provision which is as close as possible economically to the purpose pursued by the void, unenforceable and/or invalid provision to replace the void, unenforceable and/or invalid provision.</p>
    <p class="mb-2 text-md">11.6. If these Terms and Conditions are presented by the Operator in a language other than German, the translation was prepared by an independent specialist translator certified to ISO 17100:2015 and proofread by at least one other specialist translator. If, in the case of dispute, a court insists on a German-language Contract text, then only the original German-language Contract text shall be valid; under no circumstances shall a retranslation of the translated version be used.</p>`;

    // Handle event click ra ngoài modal (hay click vào backdrop) sẽ ẩn điều khoản sử dụng
    backdrop.onclick = function (e) {
        if (e.target === backdrop) {
            backdrop.remove();
        }
    };

    // Thêm tag <div> modalQR vào tag <div> modal
    modal.appendChild(text);

    // Thêm tag <div> modal vào tag <div> backdrop
    backdrop.appendChild(modal);

    // Thêm tag <div> backdrop vào phần <body> file 'sign-up.html'
    document.body.appendChild(backdrop);
});
