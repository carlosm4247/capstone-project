const options = [
  { label: 'Home', value: '/' },
  { label: 'Presidential Race', value: '/president' },
];

const unclickables = ["Independent", "Write-ins", "None of these candidates"];

const questionsWithOptions = {
  "What is your stance on abortion?": [
    ["Pro-Life", "Pro-life, and I also oppose abortion for victims of rape and incest"],
    ["Pro-Life", "Pro-life, but allow in cases of rape, incest, or danger to the mother or child"],
    ["Pro-Choice", "Pro-choice, but ban after the first three months"],
    ["Pro-Choice", "Pro-choice, I don’t agree but the government has no right to ban it"],
    ["Pro-Choice", "Pro-choice, and providing birth control, sex education, and more social services will help reduce the number of abortions"]
  ],
  "Should convicted criminals have the right to vote?": [
    ["Enfranchisement", "Yes, every citizen deserves the right to vote"],
    ["Enfranchisement", "Yes, except for felons convicted of murder or violent crimes"],
    ["Conditional Voting", "Yes, but only after completing their sentences and parole/probation"],
    ["Felon Disenfranchisement", "No"]
  ],
  "Should funding for local police departments be redirected to social and community-based programs?": [
    ["Police Abolition", "Yes, and abolish the police"],
    ["Community Policing", "Yes, replace police with unarmed community-based responders for non-violent calls"],
    ["Back The Blue", "No, increase funding and training for police departments in higher crime rate communities"]
  ],
  "Should the government increase or decrease military spending?": [
    ["Increase Military", "Increase"],
    ["Reduce Deficit", "Increase, but only after our deficit is drastically reduced"],
    ["Military Spending", "Neither, I am satisfied with the current amount of spending"],
    ["Decrease Military", "Decrease"]
  ],
  "Should the federal government increase funding of entitlements, such as Medicaid, Medicare, Social Security, and Unemployment?": [
    ["Increase Entitlements", "Yes"],
    ["Selective Entitlements", "Yes, but only increase for the elderly and disabled"],
    ["State Autonomy", "No, and each state should decide their own level of coverage"],
    ["Selective Entitlements", "No, and eligibility should only include the elderly and disabled"],
    ["Entitlement Cuts", "No, the federal government should not increase funding for any social programs"],
    ["Abolish Entitlements", "No, and abolish all entitlements"]
  ],
  "Should the U.S. raise taxes on the rich?": [
    ["Rich Tax", "Yes"],
    ["Raise Taxes", "Yes, but raise taxes on all other income brackets as well"],
    ["Lower Taxes", "No, but lower taxes for the poor"],
    ["Taxes", "No, keep the current tax structure"],
    ["Flat Tax", "No, reform to a flat tax"],
    ["Lower Taxes", "No, lower the income tax rate and remove all existing tax loopholes for large corporations"],
    ["Abolish Income Tax", "No, abolish the income tax, disallow all deductions and increase the sales tax"]
  ],
  "If found guilty, should former President Trump be pardoned for mishandling classified documents?": [
    ["Trump Innocent", "Yes, he did nothing wrong"],
    ["Laptop From Hell", "Yes, this indictment represents a political double standard"],
    ["Rule of Law", "No, no one is above the law"]
  ],
  "Should the government increase environmental regulations to prevent climate change?": [
    ["Increase regulations Incentivize Energy", "Yes, and provide more incentives for alternative energy production"],
    ["Incentivize Energy", "No, provide more incentives for alternative energy production instead"],
    ["Tax Carbon Emissions", "No, tax carbon emissions instead"],
    ["Climate Change Denial", "No, global warming is a natural occurrence and there's nothing we can do"]
  ],
  "Should the government raise the federal minimum wage?": [
    ["Living Wage", "Yes, make it a living wage"],
    ["Inflation-Adjusted Wage", "Yes, and adjust it every year according to inflation"],
    ["Same Wages", "No"],
    ["Abolish Minimum Wage", "No, and remove any federal minimum wage"]
  ],
  "Should there be more restrictions on the current process of purchasing a gun?": [
    ["Gun Ban", "Yes, all guns should be banned from private citizen ownership."],
    ["Only Hunting Allowed", "Yes, ban all guns except hunting rifles"],
    ["Assault Rifle Ban", "Yes, ban assault rifles"],
    ["Gun Control", "Yes, require more stringent background checks, training, and add more psychological testing."],
    ["Gun Rights", "No, current laws are already sufficient"],
    ["Limited Gun Control", "No, except to expand to individuals with mental health issues."],
    ["2nd Amendment", "No, the government should not infringe on the second amendment."],
    ["More Guns", "No, a citizen has the right to bear arms in private and public."]
  ],
  "Should the federal government pay for tuition at four-year colleges and universities?": [
    ["College For All", "Yes"],
    ["Partial Tuition Funding", "Yes, but only for partial tuition"],
    ["Lower Student Loans", "No, but provide lower interest rates for student loans"],
    ["Federal Scholarships", "No, but provide more scholarship opportunities for low-income students"],
    ["Private Tuition", "No"]
  ],
  "Do you support affirmative action programs?": [
    ["Racial Inequity", "Yes, but it's only a band-aid trying to heal a much larger issue and we should create more social programs to address racial inequity"],
    ["Affirmative Action", "Yes"],
    ["Oppose Affirmative Action", "No, and minority groups should not receive any favorable treatment"]
  ],
  "Should the U.S. build a wall along the southern border?": [
    ["Build The Wall", "Yes, and Mexico should pay for it"],
    ["Border Wall", "Yes"],
    ["Increase Border Military", "No, but increase our military presence along the southern border"],
    ["No Border Wall", "No, this would be too costly and ineffective"]
  ],
  "Do you support the Affordable Care Act (Obamacare)?": [
    ["Medicare For All", "Yes, but a mandatory single-payer system would be even better"],
    ["Obamacare", "Yes"],
    ["Limit Obamacare", "Yes, I support a majority of the plan but not all aspects"],
    ["Private Healthcare", "No, government should not be involved in healthcare"],
    ["Private Healthcare", "No, open the markets so insurers can compete across state lines"]
  ]
};

const parties = ["Democratic Party", "Republican Party", "Independent", "Libertarian Party", "Green Party", "Constitution Party", "Alliance Party"];

const partiesOrganized = ["Green Party", "Democratic Party", "Alliance Party", "Independent", "Republican Party", "Libertarian Party", "Constitution Party"];

const baseCandidates = {
    "Donald J. Trump": [0, 0],
    "Joseph R. Biden Jr.": [0, 0],
    "Jo Jorgensen": [0, 0],
    "Howie Hawkins": [0, 0],
    "Don Blankenship": [0, 0],
    "Brian T. Carroll": [0, 0],
    "Rocky De La Fuente": [0, 0],
    "Alyson Kennedy": [0, 0],
    "Gloria La Riva": [0, 0],
    "Brock Pierce": [0, 0],
    "Kanye West": [0, 0]
}

const FIPSfromStateName = {
  'alabama': '1',
  'alaska': '2',
  'arizona': '4',
  'arkansas': '5',
  'california': '6',
  'colorado': '8',
  'connecticut': '9',
  'delaware': '10',
  'district-of-columbia': '11',
  'florida': '12',
  'georgia': '13',
  'hawaii': '15',
  'idaho': '16',
  'illinois': '17',
  'indiana': '18',
  'iowa': '19',
  'kansas': '20',
  'kentucky': '21',
  'louisiana': '22',
  'maine': '23',
  'maryland': '24',
  'massachusetts': '25',
  'michigan': '26',
  'minnesota': '27',
  'mississippi': '28',
  'missouri': '29',
  'montana': '30',
  'nebraska': '31',
  'nevada': '32',
  'new-hampshire': '33',
  'new-jersey': '34',
  'new-mexico': '35',
  'new-york': '36',
  'north-carolina': '37',
  'north-dakota': '38',
  'ohio': '39',
  'oklahoma': '40',
  'oregon': '41',
  'pennsylvania': '42',
  'rhode-island': '44',
  'south-carolina': '45',
  'south-dakota': '46',
  'tennessee': '47',
  'texas': '48',
  'utah': '49',
  'vermont': '50',
  'virginia': '51',
  'washington': '53',
  'west-virginia': '54',
  'wisconsin': '55',
  'wyoming': '56',
};

const fipsStateCodes = {
  '1': 'alabama',
  '2': 'alaska',
  '4': 'arizona',
  '5': 'arkansas',
  '6': 'california',
  '8': 'colorado',
  '9': 'connecticut',
  '10': 'delaware',
  '11': 'district-of-columbia',
  '12': 'florida',
  '13': 'georgia',
  '15': 'hawaii',
  '16': 'idaho',
  '17': 'illinois',
  '18': 'indiana',
  '19': 'iowa',
  '20': 'kansas',
  '21': 'kentucky',
  '22': 'louisiana',
  '23': 'maine',
  '24': 'maryland',
  '25': 'massachusetts',
  '26': 'michigan',
  '27': 'minnesota',
  '28': 'mississippi',
  '29': 'missouri',
  '30': 'montana',
  '31': 'nebraska',
  '32': 'nevada',
  '33': 'new-hampshire',
  '34': 'new-jersey',
  '35': 'new-mexico',
  '36': 'new-york',
  '37': 'north-carolina',
  '38': 'north-dakota',
  '39': 'ohio',
  '40': 'oklahoma',
  '41': 'oregon',
  '42': 'pennsylvania',
  '44': 'rhode-island',
  '45': 'south-carolina',
  '46': 'south-dakota',
  '47': 'tennessee',
  '48': 'texas',
  '49': 'utah',
  '50': 'vermont',
  '51': 'virginia',
  '53': 'washington',
  '54': 'west-virginia',
  '55': 'wisconsin',
  '56': 'wyoming',
};

const presidentialStateWins = {
  "alabama": "republican",
  "alaska": "republican",
  "arizona": "democrat",
  "arkansas": "republican",
  "california": "democrat",
  "colorado": "democrat",
  "connecticut": "democrat",
  "delaware": "democrat",
  "florida": "republican",
  "georgia": "democrat",
  "hawaii": "democrat",
  "idaho": "republican",
  "illinois": "democrat",
  "indiana": "republican",
  "iowa": "republican",
  "kansas": "republican",
  "kentucky": "republican",
  "louisiana": "republican",
  "maine": "democrat",
  "maryland": "democrat",
  "massachusetts": "democrat",
  "michigan": "democrat",
  "minnesota": "democrat",
  "mississippi": "republican",
  "missouri": "republican",
  "montana": "republican",
  "nebraska": "republican",
  "nevada": "democrat",
  "new-hampshire": "democrat",
  "new-jersey": "democrat",
  "new-mexico": "democrat",
  "new-york": "democrat",
  "north-carolina": "republican",
  "north-dakota": "republican",
  "ohio": "republican",
  "oklahoma": "republican",
  "oregon": "democrat",
  "pennsylvania": "democrat",
  "rhode-island": "democrat",
  "south-carolina": "republican",
  "south-dakota": "republican",
  "tennessee": "republican",
  "texas": "republican",
  "utah": "republican",
  "vermont": "democrat",
  "virginia": "democrat",
  "washington": "democrat",
  "west-virginia": "republican",
  "wisconsin": "democrat",
  "wyoming": "republican"
}

export { options, unclickables, questionsWithOptions, parties, baseCandidates, partiesOrganized, FIPSfromStateName, fipsStateCodes, presidentialStateWins };