// constants.js

export const MONTH_CHOICES = [
  ["January", "01"],
  ["February", "02"],
  ["March", "03"],
  ["April", "04"],
  ["May", "05"],
  ["June", "06"],
  ["July", "07"],
  ["August", "08"],
  ["September", "09"],
  ["October", "10"],
  ["November", "11"],
  ["December", "12"],
];

export const YEAR_CHOICES = [
  ["2020", "20"],
  ["2021", "21"],
  ["2022", "22"],
  ["2023", "23"],
  ["2024", "24"],
  ["2025", "25"],
  ["2026", "26"],
  ["2027", "27"],
  ["2028", "28"],
  ["2029", "29"],
  ["2030", "30"],
  ["2031", "31"],
  ["2032", "32"],
  ["2033", "33"],
  ["2034", "34"],
  ["2035", "35"],
  ["2036", "36"],
  ["2037", "37"],
  ["2038", "38"],
  ["2039", "39"],
  ["2040", "40"],
  ["2041", "41"],
  ["2042", "42"],
  ["2043", "43"],
  ["2044", "44"],
  ["2045", "45"],
  ["2046", "46"],
  ["2047", "47"],
  ["2048", "48"],
  ["2049", "49"],
  ["2050", "50"],
];

export const SUPPORT_CHOICES = [
  ["Support", "Support"],
  ["Account Fund", "Account Fund"],
  ["Billing", "Billing"],
  ["Abuse", "Abuse"],
  ["OTP", "OTP"],
  ["Payments", "Payments"],
  ["Services", "Services"],
  ["Credit Points", "Credit Points"],
  ["Referrals", "Referrals"],
  ["Others", "Others"],
];

export const FREE_AD_DURATION_CHOICES = [
  ["1 day", "1 day (Free)"],
  ["2 days", "2 days (Free)"],
  ["3 days", "3 days (Free)"],
  ["5 days", "5 days (Free)"],
  ["1 week", "1 week (Free)"],
  ["2 weeks", "2 weeks (Free)"],
  ["1 month", "1 month (Free)"],
];

export const PAID_AD_DURATION_CHOICES = [
  ["1 day", "1 day (28.8 cps)"],
  ["2 days", "2 days (57.6 cps)"],
  ["3 days", "3 days (86.4 cps)"],
  ["5 days", "5 days (144.0 cps)"],
  ["1 week", "1 week (201.6 cps)"],
  ["2 weeks", "2 weeks (432.0 cps)"],
  ["1 month", "1 month (864.0 cps)"],
];

export const PAYMENT_DURATION_CHOICES = [
  ["Within 1 day", "Within 1 day"],
  ["2 days", "Less than 2 days"],
  ["3 days", "Less than 3 days"],
  ["5 days", "Less than 5 days"],
  ["1 week", "Less than 1 week"],
  ["2 weeks", "Less than 2 weeks"],
  ["1 month", "Less than 1 month"],
];

export const AD_CONDITION_CHOICES = [
  ["Brand New", "Brand New"],
  ["Fairly Used", "Fairly Used"],
];

export const AD_CATEGORY_CHOICES = [
  ["Home Appliances", "Home Appliances"],
  ["Properties", "Properties"],
  ["Electronics", "Electronics"],
  ["Fashion", "Fashion"],
  ["Vehicles", "Vehicles"],
  ["Services", "Services"],
  ["Mobile Phones", "Mobile Phones"],
  ["Health & Beauty", "Health & Beauty"],
  ["Sports", "Sports"],
  ["Jobs", "Jobs"],
  ["Babies and Kids", "Babies and Kids"],
  ["Agric & Food", "Agric & Food"],
  ["Repairs", "Repairs"],
  ["Equipment & Tools", "Equipment & Tools"],
  ["CVs", "CVs"],
  ["Pets", "Pets"],
  ["Others", "Others"],
];

export const AD_TYPE_CHOICES = {
  "Home Appliances": [
    ["Washing Machine", "Washing Machine"],
    ["Refrigerator", "Refrigerator"],
    ["Microwave", "Microwave"],
    ["Coffee Machine", "Coffee Machine"],
    ["Air Conditioner", "Air Conditioner"],
    ["Solar", "Solar"],
    ["Kitchen Appliances", "Kitchen Appliances"],
  ],
  Properties: [
    ["House", "House"],
    ["Apartment", "Apartment"],
    ["Land", "Land"],
    ["Commercial Property", "Commercial Property"],
  ],
  Electronics: [
    ["Laptop", "Laptop"],
    ["Smartphone", "Smartphone"],
    ["Camera", "Camera"],
    ["Headphones", "Headphones"],
    ["Television", "Television"],
  ],
  Fashion: [
    ["Clothing", "Clothing"],
    ["Shoes", "Shoes"],
    ["Accessories", "Accessories"],
  ],
  Vehicles: [
    ["Car", "Car"],
    ["Motorcycle", "Motorcycle"],
    ["Bicycle", "Bicycle"],
  ],
  Services: [
    ["Cleaning", "Cleaning"],
    ["Plumbing", "Plumbing"],
    ["Electrician", "Electrician"],
    ["Catering", "Catering"],
    ["Tutoring", "Tutoring"],
  ],
  "Mobile Phones": [
    ["iPhone", "iPhone"],
    ["Samsung", "Samsung"],
    ["Google Pixel", "Google Pixel"],
    ["OnePlus", "OnePlus"],
  ],
  "Health & Beauty": [
    ["Skincare", "Skincare"],
    ["Haircare", "Haircare"],
    ["Makeup", "Makeup"],
    ["Fitness Equipment", "Fitness Equipment"],
  ],
  Sports: [
    ["Soccer", "Soccer"],
    ["Basketball", "Basketball"],
    ["Tennis", "Tennis"],
    ["Golf", "Golf"],
  ],
  Jobs: [
    ["IT", "IT"],
    ["Sales", "Sales"],
    ["Marketing", "Marketing"],
    ["Administrative", "Administrative"],
  ],
  "Babies and Kids": [
    ["Toys", "Toys"],
    ["Clothing Kids", "Clothing"],
    ["Strollers", "Strollers"],
  ],
  "Agric & Food": [
    ["Farm Products", "Farm Products"],
    ["Processed Food", "Processed Food"],
    ["Beverages", "Beverages"],
  ],
  Repairs: [
    ["Electronic Repair", "Electronic Repair"],
    ["Appliance Repair", "Appliance Repair"],
    ["Car Repair", "Car Repair"],
  ],
  "Equipment & Tools": [
    ["Power Tools", "Power Tools"],
    ["Hand Tools", "Hand Tools"],
    ["Kitchen Tools", "Kitchen Tools"],
  ],
  CVs: [
    ["Engineering", "Engineering"],
    ["Marketing CVs", "Marketing"],
    ["Design", "Design"],
    ["Education", "Education"],
  ],
  Pets: [
    ["Dog", "Dog"],
    ["Cat", "Cat"],
    ["Fish", "Fish"],
    ["Bird", "Bird"],
  ],
  Others: [["Others", "Others"]],
};

export const CURRENCY_CHOICES = [
  ["NGN", "Nigerian Naira"],
  ["USD", "United States Dollar"],
  ["CAD", "Canadian Dollar"],
  ["EUR", "Euro"],
  ["GBP", "British Pound Sterling"],
  ["INR", "Indian Rupee"],
  ["ZAR", "South African Rand"],
  ["GHS", "Ghanaian Cedi"],
  ["CNY", "Chinese Yuan"],
  ["AED", "United Arab Emirates Dirham"],
  ["AUD", "Australian Dollar"],
  ["BRL", "Brazilian Real"],
  ["JPY", "Japanese Yen"],
  ["KES", "Kenyan Shilling"],
  ["SAR", "Saudi Riyal"],
  // Additional currencies
  ["AFN", "Afghan Afghani"],
  ["ALL", "Albanian Lek"],
  ["AMD", "Armenian Dram"],
  ["ANG", "Netherlands Antillean Guilder"],
  ["AOA", "Angolan Kwanza"],
  ["ARS", "Argentine Peso"],
  ["AWG", "Aruban Florin"],
  ["AZN", "Azerbaijani Manat"],
  ["BAM", "Bosnia-Herzegovina Convertible Mark"],
  ["BBD", "Barbadian Dollar"],
  ["BDT", "Bangladeshi Taka"],
  ["BGN", "Bulgarian Lev"],
  ["BHD", "Bahraini Dinar"],
  ["BIF", "Burundian Franc"],
  ["BMD", "Bermudian Dollar"],
  ["BND", "Brunei Dollar"],
  ["BOB", "Bolivian Boliviano"],
  ["BSD", "Bahamian Dollar"],
  ["BTN", "Bhutanese Ngultrum"],
  ["BWP", "Botswanan Pula"],
  ["BYN", "Belarusian Ruble"],
  ["BZD", "Belize Dollar"],
  ["CDF", "Congolese Franc"],
  ["CHF", "Swiss Franc"],
  ["CLP", "Chilean Peso"],
  ["CNY", "Chinese Yuan"],
  ["COP", "Colombian Peso"],
  ["CRC", "Costa Rican Colón"],
  ["CUP", "Cuban Peso"],
  ["CVE", "Cape Verdean Escudo"],
  ["CZK", "Czech Republic Koruna"],
  ["DJF", "Djiboutian Franc"],
  ["DKK", "Danish Krone"],
  ["DOP", "Dominican Peso"],
  ["DZD", "Algerian Dinar"],
  ["EGP", "Egyptian Pound"],
  ["ERN", "Eritrean Nakfa"],
  ["ETB", "Ethiopian Birr"],
  ["FJD", "Fijian Dollar"],
  ["FKP", "Falkland Islands Pound"],
  ["FOK", "Faroe Islands Króna"],
  ["GEL", "Georgian Lari"],
  ["GGP", "Guernsey Pound"],
  ["GIP", "Gibraltar Pound"],
  ["GMD", "Gambian Dalasi"],
  ["GNF", "Guinean Franc"],
  ["GTQ", "Guatemalan Quetzal"],
  ["GYD", "Guyanaese Dollar"],
  ["HKD", "Hong Kong Dollar"],
  ["HNL", "Honduran Lempira"],
  ["HRK", "Croatian Kuna"],
  ["HTG", "Haitian Gourde"],
  ["HUF", "Hungarian Forint"],
  ["IDR", "Indonesian Rupiah"],
  ["ILS", "Israeli New Shekel"],
  ["IMP", "Isle of Man Pound"],
  ["IQD", "Iraqi Dinar"],
  ["IRR", "Iranian Rial"],
  ["ISK", "Icelandic Króna"],
  ["JEP", "Jersey Pound"],
  ["JMD", "Jamaican Dollar"],
  ["JOD", "Jordanian Dinar"],
  ["KGS", "Kyrgystani Som"],
  ["KHR", "Cambodian Riel"],
  ["KID", "Kiribati Dollar"],
  ["KWD", "Kuwaiti Dinar"],
  ["KYD", "Cayman Islands Dollar"],
  ["KZT", "Kazakhstani Tenge"],
  ["LAK", "Laotian Kip"],
  ["LBP", "Lebanese Pound"],
  ["LKR", "Sri Lankan Rupee"],
  ["LRD", "Liberian Dollar"],
  ["LSL", "Lesotho Loti"],
  ["LYD", "Libyan Dinar"],
  ["MAD", "Moroccan Dirham"],
  ["MDL", "Moldovan Leu"],
  ["MGA", "Malagasy Ariary"],
  ["MKD", "Macedonian Denar"],
  ["MMK", "Myanma Kyat"],
  ["MNT", "Mongolian Tugrik"],
  ["MOP", "Macanese Pataca"],
  ["MRU", "Mauritanian Ouguiya"],
  ["MUR", "Mauritian Rupee"],
  ["MVR", "Maldivian Rufiyaa"],
  ["MWK", "Malawian Kwacha"],
  ["MXN", "Mexican Peso"],
  ["MYR", "Malaysian Ringgit"],
  ["MZN", "Mozambican Metical"],
  ["NAD", "Namibian Dollar"],
  ["NIO", "Nicaraguan Córdoba"],
  ["NOK", "Norwegian Krone"],
  ["NPR", "Nepalese Rupee"],
  ["NZD", "New Zealand Dollar"],
  ["OMR", "Omani Rial"],
  ["PAB", "Panamanian Balboa"],
  ["PEN", "Peruvian Nuevo Sol"],
  ["PGK", "Papua New Guinean Kina"],
  ["PHP", "Philippine Peso"],
  ["PKR", "Pakistani Rupee"],
  ["PLN", "Polish Złoty"],
  ["PYG", "Paraguayan Guarani"],
  ["QAR", "Qatari Rial"],
  ["RON", "Romanian Leu"],
  ["RSD", "Serbian Dinar"],
  ["RUB", "Russian Ruble"],
  ["RWF", "Rwandan Franc"],
  ["SBD", "Solomon Islands Dollar"],
  ["SCR", "Seychellois Rupee"],
  ["SDG", "Sudanese Pound"],
  ["SEK", "Swedish Krona"],
  ["SGD", "Singapore Dollar"],
  ["SHP", "Saint Helena Pound"],
  ["SLL", "Sierra Leonean Leone"],
  ["SOS", "Somali Shilling"],
  ["SRD", "Surinamese Dollar"],
  ["SSP", "South Sudanese Pound"],
  ["STN", "São Tomé and Príncipe Dobra"],
  ["SYP", "Syrian Pound"],
  ["SZL", "Swazi Lilangeni"],
  ["TJS", "Tajikistani Somoni"],
  ["TMT", "Turkmenistani Manat"],
  ["TND", "Tunisian Dinar"],
  ["TOP", "Tongan Paʻanga"],
  ["TRY", "Turkish Lira"],
  ["TTD", "Trinidad and Tobago Dollar"],
  ["TVD", "Tuvaluan Dollar"],
  ["TWD", "New Taiwan Dollar"],
  ["TZS", "Tanzanian Shilling"],
  ["UAH", "Ukrainian Hryvnia"],
  ["UGX", "Ugandan Shilling"],
  ["UYU", "Uruguayan Peso"],
  ["UZS", "Uzbekistan Som"],
  ["VES", "Venezuelan Bolívar"],
  ["VND", "Vietnamese Đồng"],
  ["VUV", "Vanuatu Vatu"],
  ["WST", "Samoan Tala"],
  ["XAF", "Central African CFA Franc"],
  ["XCD", "Eastern Caribbean Dollar"],
  ["XDR", "Special Drawing Rights"],
  ["XOF", "West African CFA franc"],
  ["XPF", "CFP Franc"],
  ["YER", "Yemeni Rial"],
  ["ZMW", "Zambian Kwacha"],
];

export const MAIN_CURRENCY_CHOICES = [
  ["NGN", "Nigerian Naira"],
  ["USD", "United States Dollar"],
];

export const ID_TYPE_CHOICES = [
  // ["NIN", "NIN"],
  ["Intl Passport", "Int'l Passport"],
  ["Driving License", "Driving License"],
  ["Govt Issued ID", "Govt Issued ID"],
];

export const COUNTRY_CHOICES = [
  ["Afghanistan", "Afghanistan"],
  ["Albania", "Albania"],
  ["Algeria", "Algeria"],
  ["Andorra", "Andorra"],
  ["Angola", "Angola"],
  ["Antigua and Barbuda", "Antigua and Barbuda"],
  ["Argentina", "Argentina"],
  ["Armenia", "Armenia"],
  ["Australia", "Australia"],
  ["Austria", "Austria"],
  ["Azerbaijan", "Azerbaijan"],
  ["Bahamas", "Bahamas"],
  ["Bahrain", "Bahrain"],
  ["Bangladesh", "Bangladesh"],
  ["Barbados", "Barbados"],
  ["Belarus", "Belarus"],
  ["Belgium", "Belgium"],
  ["Belize", "Belize"],
  ["Benin", "Benin"],
  ["Bhutan", "Bhutan"],
  ["Bolivia", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herzegovina"],
  ["Botswana", "Botswana"],
  ["Brazil", "Brazil"],
  ["Brunei", "Brunei"],
  ["Bulgaria", "Bulgaria"],
  ["Burkina Faso", "Burkina Faso"],
  ["Burundi", "Burundi"],
  ["Cabo Verde", "Cabo Verde"],
  ["Cambodia", "Cambodia"],
  ["Cameroon", "Cameroon"],
  ["Canada", "Canada"],
  ["Central African Republic", "Central African Republic"],
  ["Chad", "Chad"],
  ["Chile", "Chile"],
  ["China", "China"],
  ["Colombia", "Colombia"],
  ["Comoros", "Comoros"],
  ["Congo", "Congo"],
  ["Costa Rica", "Costa Rica"],
  ["Croatia", "Croatia"],
  ["Cuba", "Cuba"],
  ["Cyprus", "Cyprus"],
  ["Czech Republic", "Czech Republic"],
  ["Denmark", "Denmark"],
  ["Djibouti", "Djibouti"],
  ["Dominica", "Dominica"],
  ["Dominican Republic", "Dominican Republic"],
  ["Ecuador", "Ecuador"],
  ["Egypt", "Egypt"],
  ["El Salvador", "El Salvador"],
  ["Equatorial Guinea", "Equatorial Guinea"],
  ["Eritrea", "Eritrea"],
  ["Estonia", "Estonia"],
  ["Eswatini", "Eswatini"],
  ["Ethiopia", "Ethiopia"],
  ["Fiji", "Fiji"],
  ["Finland", "Finland"],
  ["France", "France"],
  ["Gabon", "Gabon"],
  ["Gambia", "Gambia"],
  ["Georgia", "Georgia"],
  ["Germany", "Germany"],
  ["Ghana", "Ghana"],
  ["Greece", "Greece"],
  ["Grenada", "Grenada"],
  ["Guatemala", "Guatemala"],
  ["Guinea", "Guinea"],
  ["Guinea-Bissau", "Guinea-Bissau"],
  ["Guyana", "Guyana"],
  ["Haiti", "Haiti"],
  ["Honduras", "Honduras"],
  ["Hungary", "Hungary"],
  ["Iceland", "Iceland"],
  ["India", "India"],
  ["Indonesia", "Indonesia"],
  ["Iran", "Iran"],
  ["Iraq", "Iraq"],
  ["Ireland", "Ireland"],
  ["Israel", "Israel"],
  ["Italy", "Italy"],
  ["Jamaica", "Jamaica"],
  ["Japan", "Japan"],
  ["Jordan", "Jordan"],
  ["Kazakhstan", "Kazakhstan"],
  ["Kenya", "Kenya"],
  ["Kiribati", "Kiribati"],
  ["Korea, North", "Korea, North"],
  ["Korea, South", "Korea, South"],
  ["Kosovo", "Kosovo"],
  ["Kuwait", "Kuwait"],
  ["Kyrgyzstan", "Kyrgyzstan"],
  ["Laos", "Laos"],
  ["Latvia", "Latvia"],
  ["Lebanon", "Lebanon"],
  ["Lesotho", "Lesotho"],
  ["Liberia", "Liberia"],
  ["Libya", "Libya"],
  ["Liechtenstein", "Liechtenstein"],
  ["Lithuania", "Lithuania"],
  ["Luxembourg", "Luxembourg"],
  ["Madagascar", "Madagascar"],
  ["Malawi", "Malawi"],
  ["Malaysia", "Malaysia"],
  ["Maldives", "Maldives"],
  ["Mali", "Mali"],
  ["Malta", "Malta"],
  ["Marshall Islands", "Marshall Islands"],
  ["Mauritania", "Mauritania"],
  ["Mauritius", "Mauritius"],
  ["Mexico", "Mexico"],
  ["Micronesia", "Micronesia"],
  ["Moldova", "Moldova"],
  ["Monaco", "Monaco"],
  ["Mongolia", "Mongolia"],
  ["Montenegro", "Montenegro"],
  ["Morocco", "Morocco"],
  ["Mozambique", "Mozambique"],
  ["Myanmar", "Myanmar"],
  ["Namibia", "Namibia"],
  ["Nauru", "Nauru"],
  ["Nepal", "Nepal"],
  ["Netherlands", "Netherlands"],
  ["New Zealand", "New Zealand"],
  ["Nicaragua", "Nicaragua"],
  ["Niger", "Niger"],
  ["Nigeria", "Nigeria"],
  ["North Macedonia", "North Macedonia"],
  ["Norway", "Norway"],
  ["Oman", "Oman"],
  ["Pakistan", "Pakistan"],
  ["Palau", "Palau"],
  ["Panama", "Panama"],
  ["Papua New Guinea", "Papua New Guinea"],
  ["Paraguay", "Paraguay"],
  ["Peru", "Peru"],
  ["Philippines", "Philippines"],
  ["Poland", "Poland"],
  ["Portugal", "Portugal"],
  ["Qatar", "Qatar"],
  ["Romania", "Romania"],
  ["Russia", "Russia"],
  ["Rwanda", "Rwanda"],
  ["Saint Kitts and Nevis", "Saint Kitts and Nevis"],
  ["Saint Lucia", "Saint Lucia"],
  ["Saint Vincent and the Grenadines", "Saint Vincent and the Grenadines"],
  ["Samoa", "Samoa"],
  ["San Marino", "San Marino"],
  ["Sao Tome and Principe", "Sao Tome and Principe"],
  ["Saudi Arabia", "Saudi Arabia"],
  ["Senegal", "Senegal"],
  ["Serbia", "Serbia"],
  ["Seychelles", "Seychelles"],
  ["Sierra Leone", "Sierra Leone"],
  ["Singapore", "Singapore"],
  ["Slovakia", "Slovakia"],
  ["Slovenia", "Slovenia"],
  ["Solomon Islands", "Solomon Islands"],
  ["Somalia", "Somalia"],
  ["South Africa", "South Africa"],
  ["South Sudan", "South Sudan"],
  ["Spain", "Spain"],
  ["Sri Lanka", "Sri Lanka"],
  ["Sudan", "Sudan"],
  ["Suriname", "Suriname"],
  ["Sweden", "Sweden"],
  ["Switzerland", "Switzerland"],
  ["Syria", "Syria"],
  ["Taiwan", "Taiwan"],
  ["Tajikistan", "Tajikistan"],
  ["Tanzania", "Tanzania"],
  ["Thailand", "Thailand"],
  ["Timor-Leste", "Timor-Leste"],
  ["Togo", "Togo"],
  ["Tonga", "Tonga"],
  ["Trinidad and Tobago", "Trinidad and Tobago"],
  ["Tunisia", "Tunisia"],
  ["Turkey", "Turkey"],
  ["Turkmenistan", "Turkmenistan"],
  ["Tuvalu", "Tuvalu"],
  ["Uganda", "Uganda"],
  ["Ukraine", "Ukraine"],
  ["United Arab Emirates", "United Arab Emirates"],
  ["United Kingdom", "United Kingdom"],
  ["United States", "United States"],
  ["Uruguay", "Uruguay"],
  ["Uzbekistan", "Uzbekistan"],
  ["Vanuatu", "Vanuatu"],
  ["Vatican City", "Vatican City"],
  ["Venezuela", "Venezuela"],
  ["Vietnam", "Vietnam"],
  ["Yemen", "Yemen"],
  ["Zambia", "Zambia"],
  ["Zimbabwe", "Zimbabwe"],
];

export const BUSINESS_TYPE_CHOICES = [
  ["Registered", "Registered"],
  ["Unregistered", "Unregistered"],
];

export const STAFF_SIZE_CHOICES = [
  ["Small", "Small (1-50 employees)"],
  ["Medium", "Medium (51-250 employees)"],
  ["Large", "Large (251+ employees)"],
];

export const BUSINESS_INDUSTRY_CHOICES = [
  ["Information Technology", "Information Technology"],
  ["Healthcare", "Healthcare"],
  ["Finance", "Finance"],
  ["Education", "Education"],
  ["Retail", "Retail"],
  ["Manufacturing", "Manufacturing"],
  ["Services", "Services"],
  ["Entertainment", "Entertainment"],
  ["Food & Beverage", "Food & Beverage"],
  ["Travel & Tourism", "Travel & Tourism"],
  ["Real Estate", "Real Estate"],
  ["Construction", "Construction"],
  ["Automotive", "Automotive"],
  ["Agriculture", "Agriculture"],
  ["Energy", "Energy"],
  ["Environmental", "Environmental"],
  ["Government", "Government"],
  ["Nonprofit", "Nonprofit"],
  ["Others", "Others"],
];

export const BUSINESS_CATEGORY_CHOICES = [
  ["Startup", "Startup"],
  ["Small Business", "Small Business"],
  ["Medium Business", "Medium Business"],
  ["Large Business", "Large Business"],
  ["Corporation", "Corporation"],
  ["Sole Proprietorship", "Sole Proprietorship"],
  ["Partnership", "Partnership"],
  ["Franchise", "Franchise"],
  ["Family Owned", "Family Owned"],
  ["Online Business", "Online Business"],
  ["Brick and Mortar", "Brick and Mortar"],
  ["Service Provider", "Service Provider"],
  ["Retailer", "Retailer"],
  ["Wholesaler", "Wholesaler"],
  ["Manufacturer", "Manufacturer"],
  ["Restaurant", "Restaurant"],
  ["Hospitality", "Hospitality"],
  ["Healthcare", "Healthcare"],
  ["Education", "Education"],
  ["Tech", "Tech"],
  ["Creative", "Creative"],
  ["Entertainment", "Entertainment"],
  ["Travel", "Travel"],
  ["Construction", "Construction"],
  ["Automotive", "Automotive"],
  ["Agriculture", "Agriculture"],
  ["Energy", "Energy"],
  ["Environmental", "Environmental"],
  ["Government", "Government"],
  ["Nonprofit", "Nonprofit"],
  ["Others", "Others"],
];