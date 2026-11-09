// Hand-written fictional inputs for the agent practice missions (06–08).
// The organisation, systems, companies and people are invented; no real rules.
export function agentFixtures(json) {
  const synthetic = x => ({ ...x, synthetic: true });

  json('handbook.json', {
    synthetic: true,
    organisation: 'The Institute (fictional)',
    stopwords: ['a', 'an', 'and', 'are', 'at', 'be', 'by', 'can', 'do', 'does', 'for', 'from', 'how', 'i', 'in', 'is',
      'it', 'me', 'my', 'of', 'on', 'or', 'should', 'the', 'to', 'what', 'when', 'where', 'who', 'with'],
    guides: [
      { id: 'H1', title: 'Requesting access in Ledger', updated: '2025-03-01',
        text: 'Ask your line manager to approve the request in the Service Portal under Access > Ledger. Project managers get the Project Manager role. Approval takes up to two working days.' },
      { id: 'H2', title: 'Requesting access in Ledger', updated: '2023-01-10', supersededBy: 'H1',
        text: 'Email the finance office to request Ledger access. Approval takes up to ten working days.' },
      { id: 'H3', title: 'Signing an NDA', updated: '2025-05-12',
        text: 'Use the standard mutual NDA template from the Legal page. If the customer changes any clause, send the draft to legal@institute.example before signing. Unit managers may sign standard NDAs.' },
      { id: 'H4', title: 'Travel booking', updated: '2024-11-20',
        text: 'Book trips through the travel agency portal. Trips abroad need approval from your line manager before booking. Train is the default for trips under 500 km.' },
      { id: 'H5', title: 'Reporting a security incident', updated: '2025-08-01',
        text: 'Report lost laptops, phishing or suspicious logins to the security desk at once, day or night. Do not investigate on your own.' },
      { id: 'H6', title: 'New customer in Atlas', updated: '2025-02-14',
        text: 'Register new customers in Atlas before sending a quote. Check the company registration number and add a contact person. Quotes above 500 000 SEK need a second reviewer.' },
      { id: 'H7', title: 'Working from another country', updated: '2024-06-03',
        text: 'Working from another country for more than 20 days per year needs HR approval because of tax and insurance rules.' },
      { id: 'H8', title: 'Climate travel policy', updated: '2025-10-01',
        text: 'Since 1 October 2025, train is the default for trips under 800 km. Flights need a short written reason.' },
    ].map(synthetic),
  });

  json('applications.json', [
    { id: 'APP-1001', layout: 'form', text: [
      'CERTIFICATION APPLICATION', 'Applicant ID: APP-1001', 'Name: Alva Lindqvist',
      'Certification: Welding inspector level 1', 'Employer: Nordweld AB', 'Submitted: 2026-03-02',
      'Exam date: 2026-04-15', 'Experience (years): 3', 'Email: alva.lindqvist@nordweld.example'].join('\n') },
    { id: 'APP-1002', layout: 'table', text: [
      '| Field | Value |', '| --- | --- |', '| Applicant ID | APP-1002 |', '| Name | Omar Haddad |',
      '| Certification | Welding inspector level 2 |', '| Employer | Kustbygg AB |', '| Submitted | 10/03/2026 |',
      '| Exam date | 22 April 2026 |', '| Experience (years) | 4 |', '| Email | omar.haddad@kustbygg.example |'].join('\n') },
    { id: 'APP-1003', layout: 'form', text: [
      'Application for personal certification', 'Ref: APP-1003', 'Full name: Mira Svensson',
      'Certificate applied for: Energy auditor', 'Company: Ljusgarden Fastigheter', 'Date submitted: 5 March 2026',
      'Exam on: 01/03/2026', 'Years of experience: 6', 'E-mail: mira.svensson@ljusgarden.example'].join('\n') },
    { id: 'APP-1004', layout: 'letter', text: 'Hello, my name is Jonas Berg (applicant APP-1004) and I work at Brandkoll AB. ' +
      'I would like to apply for the Fire safety coordinator certification. I have 2 years of experience and would like ' +
      'to take the exam on 12 May 2026. I am sending this on 20 April 2026. You can reach me by phone.' },
    { id: 'APP-1005', layout: 'letter', text: 'APP-1005. Dear certification team, I, Sara Nilsson of Elektro Vast AB, am ' +
      'applying to become a certified Drone pilot. Submitted 2026-04-01; preferred exam date 2026-05-20. ' +
      'Experience: 8 years. Contact: sara.nilsson@elektrovast.example' },
    { id: 'APP-1006', layout: 'form', text: [
      'Applicant ID: APP-1006', 'Name: Li Wei', 'Certification: Energy auditor', 'Employer: Varmeteknik AB',
      'Submitted: 2026-04-08', 'Experience (years): 1', 'Email: li.wei@varmeteknik.example'].join('\n') },
  ].map(synthetic));

  json('certifications.json', {
    synthetic: true,
    dateFormat: 'Slash dates are DD/MM/YYYY.',
    minimumExperienceYears: { 'Welding inspector level 1': 2, 'Welding inspector level 2': 5,
      'Energy auditor': 3, 'Fire safety coordinator': 1 },
  });

  const call = (id, title, deadline, maxGrant, maxMonths, topics) => synthetic({ id, title, deadline, maxGrant, maxMonths,
    topics, fundingRate: { research: 1, company: 0.5 }, maxOverheadShare: 0.3, minPartners: 2, needsCompany: true });
  json('calls.json', [
    call('C1', 'Green Industry 2026', '2026-11-30', 2000000, 24, ['circular', 'materials', 'industry', 'energy']),
    call('C2', 'Digital Health Pilots', '2026-12-15', 3000000, 36, ['health', 'ai', 'data']),
    call('C3', 'Battery Materials Open Call', '2026-09-30', 3000000, 36, ['battery', 'materials', 'energy']),
    call('C4', 'Circular Construction', '2027-02-01', 4000000, 36, ['circular', 'construction', 'materials']),
    call('C5', 'Small Feasibility Studies', '2026-12-01', 500000, 12, ['energy', 'industry', 'construction']),
  ]);

  json('application-draft.json', synthetic({
    title: 'Recycled Concrete Pilot', currency: 'SEK', months: 30,
    keywords: ['circular', 'materials', 'construction', 'recycling'],
    partners: [
      { name: 'Institute Building Lab', type: 'research', personnel: 900000, overhead: 315000, other: 50000, requested: 1265000 },
      { name: 'Kustbygg AB', type: 'company', personnel: 1000000, overhead: 200000, other: 100000, requested: 780000 },
      { name: 'Gruskross AB', type: 'company', personnel: 200000, overhead: 40000, other: 10000, requested: 55000 },
    ],
  }));
  return { handbookGuides: 8, applications: 6, calls: 5 };
}
