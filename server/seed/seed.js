require('dns').setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const mongoose = require('mongoose');
// ... rest
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Guide = require('../models/Guide');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');
const SavedResource = require('../models/SavedResource');
const Feedback = require('../models/Feedback');

const guides = [
  {
    title: 'Passport & Student Visa',
    description:
      'Understand your passport validity and student visa requirements before traveling to India.',
    category: 'pre-arrival',
    icon: '🛂',
    order: 1,
    steps: [
      {
        title: 'Check Passport Validity',
        description:
          'Ensure your passport is valid for at least 6 months beyond your planned stay in India.',
        documents: ['Passport (original + copies)', 'Passport-size photographs'],
        tips: [
          'Apply for passport renewal early if it expires soon.',
          'Keep digital and physical copies.',
        ],
        resources: [
          {
            label: 'Ministry of External Affairs',
            url: 'https://www.mea.gov.in/',
          },
        ],
      },
      {
        title: 'Apply for Student Visa',
        description:
          'Apply through the official Indian embassy/consulate or authorized visa application centre in your country.',
        documents: [
          'Admission letter',
          'Passport',
          'Photographs',
          'Fee receipt',
          'Financial proof',
        ],
        tips: [
          'Apply well in advance — visa processing times vary.',
          'Always verify rules on the official government website.',
        ],
        resources: [
          {
            label: 'Indian Missions Abroad',
            url: 'https://www.mea.gov.in/indian-missions-abroad.htm',
          },
        ],
      },
    ],
    resources: [
      { label: 'Ministry of External Affairs', url: 'https://www.mea.gov.in/' },
    ],
  },
  {
    title: 'University Admission Documents',
    description:
      'Prepare and organize all documents required by your Indian university.',
    category: 'pre-arrival',
    icon: '🎓',
    order: 2,
    steps: [
      {
        title: 'Collect Originals',
        description: 'Gather originals of all academic records.',
        documents: [
          'Admission offer letter',
          'Academic transcripts',
          'Degree certificates',
          'English proficiency test scores (IELTS/TOEFL)',
        ],
        tips: [
          'Carry multiple attested copies.',
          'Keep scanned copies in cloud storage.',
        ],
        resources: [
          { label: 'Ministry of Education', url: 'https://www.education.gov.in/' },
        ],
      },
      {
        title: 'Verify University Recognition',
        description:
          'Check that your institution is recognized by UGC/AICTE or relevant regulator.',
        documents: ['UGC recognition list'],
        tips: ['Verify on official UGC website.'],
        resources: [{ label: 'UGC', url: 'https://www.ugc.gov.in/' }],
      },
    ],
    resources: [
      { label: 'Ministry of Education', url: 'https://www.education.gov.in/' },
    ],
  },
  {
    title: 'Travel Documents & Packing',
    description:
      'Plan your travel and carry essential documents in your hand luggage.',
    category: 'pre-arrival',
    icon: '✈️',
    order: 3,
    steps: [
      {
        title: 'Book Flights',
        description:
          'Book a flight that arrives during daytime for easier settlement.',
        documents: ['E-ticket', 'Passport', 'Visa'],
        tips: [
          'Keep a printed itinerary.',
          'Note your university pickup contacts.',
        ],
        resources: [],
      },
      {
        title: 'Hand Luggage Essentials',
        description:
          'Documents, medications, and valuables go in your cabin bag.',
        documents: ['Passport', 'Visa', 'Admission letter', 'Prescriptions'],
        tips: [
          'Check airline baggage rules.',
          'Carry some local currency if possible.',
        ],
        resources: [],
      },
    ],
    resources: [],
  },
  {
    title: 'Accommodation Planning',
    description:
      'Decide between university hostel, private hostel, or rental before arriving.',
    category: 'pre-arrival',
    icon: '🏠',
    order: 4,
    steps: [
      {
        title: 'Contact University Housing',
        description:
          'Ask about hostel availability and application deadlines.',
        documents: ['Student ID', 'Admission letter'],
        tips: ['Apply early — hostels fill fast.'],
        resources: [],
      },
      {
        title: 'Consider Off-Campus Options',
        description:
          'Research PG accommodations, shared flats, and safe neighborhoods.',
        documents: ['ID proof', 'Rental agreement (if any)'],
        tips: ['Avoid paying deposits before verifying the landlord/agency.'],
        resources: [],
      },
    ],
    resources: [],
  },
  {
    title: 'Financial Preparation',
    description:
      'Plan your finances, international transfers, and emergency funds.',
    category: 'pre-arrival',
    icon: '💳',
    order: 5,
    steps: [
      {
        title: 'Arrange Funds',
        description:
          'Understand how to transfer money to India and the documents required.',
        documents: ['Bank statements', 'Proof of funds'],
        tips: [
          'Compare forex transfer fees.',
          'Keep some cash in INR for immediate expenses.',
        ],
        resources: [],
      },
      {
        title: 'Open NRE/NRO Account (Optional)',
        description:
          'You may open an NRE/NRO account with an Indian bank from your home country.',
        documents: ['Passport', 'Visa', 'Address proof'],
        tips: ['Not required for all students — check with your bank.'],
        resources: [
          { label: 'RBI', url: 'https://www.rbi.org.in/' },
        ],
      },
    ],
    resources: [{ label: 'RBI', url: 'https://www.rbi.org.in/' }],
  },
  {
    title: 'Travel Insurance',
    description:
      'Get adequate medical and travel insurance before departure.',
    category: 'pre-arrival',
    icon: '🛡️',
    order: 6,
    steps: [
      {
        title: 'Compare Insurance Plans',
        description:
          'Choose a plan covering medical, travel, and evacuation expenses.',
        documents: ['Policy document'],
        tips: [
          'Check whether your university recommends a specific provider.',
          'Read exclusions carefully.',
        ],
        resources: [],
      },
    ],
    resources: [],
  },
  {
    title: 'Emergency Contacts',
    description:
      'Save important numbers before you fly — including 112 (India emergency).',
    category: 'pre-arrival',
    icon: '☎️',
    order: 7,
    steps: [
      {
        title: 'Save India Emergency Number',
        description: '112 is the unified emergency number in India.',
        documents: [],
        tips: ['Save 112 on your phone before landing.'],
        resources: [],
      },
    ],
    resources: [],
  },
  {
    title: 'Airport Arrival & Immigration',
    description:
      'What happens at the airport, immigration, and customs when you land.',
    category: 'arrival',
    icon: '🛬',
    order: 1,
    steps: [
      {
        title: 'Immigration Check',
        description:
          'Present passport, visa, and admission documents at immigration.',
        documents: ['Passport', 'Visa', 'Admission letter'],
        tips: [
          'Keep documents in your hand luggage.',
          'Answer questions clearly and politely.',
        ],
        resources: [
          {
            label: 'Bureau of Immigration',
            url: 'https://boi.gov.in/',
          },
        ],
      },
      {
        title: 'Customs',
        description:
          'Declare restricted items. Follow the Green Channel if you have nothing to declare.',
        documents: ['Customs declaration form (if required)'],
        tips: ['Keep receipts of high-value items.'],
        resources: [],
      },
    ],
    resources: [],
  },
  {
    title: 'SIM Card & Connectivity',
    description:
      'Get an Indian SIM card, mobile number, and internet access quickly.',
    category: 'arrival',
    icon: '📱',
    order: 2,
    steps: [
      {
        title: 'Buy a Prepaid SIM',
        description:
          'Visit an official telecom store (Airtel, Jio, Vi, BSNL) with your passport and visa.',
        documents: ['Passport', 'Visa', 'Address in India', 'Photograph'],
        tips: [
          'Activation can take a few hours.',
          'Compare prepaid plans before choosing.',
        ],
        resources: [
          { label: 'TRAI', url: 'https://www.trai.gov.in/' },
        ],
      },
    ],
    resources: [],
  },
  {
    title: 'Bank Account Setup',
    description:
      'How to open a student bank account in India and manage money.',
    category: 'post-arrival',
    icon: '🏦',
    order: 1,
    steps: [
      {
        title: 'Choose a Bank',
        description:
          'Many banks offer student accounts with minimal balance requirements.',
        documents: [
          'Passport',
          'Visa',
          'Admission letter',
          'Address proof',
          'Photographs',
        ],
        tips: [
          'Check for student-specific schemes.',
          'Ask about internet banking activation time.',
        ],
        resources: [
          { label: 'RBI', url: 'https://www.rbi.org.in/' },
        ],
      },
    ],
    resources: [],
  },
];

const services = [
  // Chennai
  {
    name: 'Sample Student Hostel — Chennai Central',
    category: 'Accommodation',
    city: 'Chennai',
    address: 'Sample Address, Near Central Metro, Chennai',
    description:
      'Demo listing. Budget-friendly student hostel with meals and Wi-Fi.',
    phone: '+91-9000000001',
    website: 'https://example.com/chennai-hostel',
    verified: false,
  },
  {
    name: 'Sample Multi-Specialty Hospital — Chennai',
    category: 'Healthcare',
    city: 'Chennai',
    address: 'Sample Address, Anna Salai, Chennai',
    description: 'Demo listing. 24x7 emergency, OPD, and diagnostics.',
    phone: '+91-9000000002',
    website: 'https://example.com/chennai-hospital',
    verified: false,
  },
  {
    name: 'Sample Airport Taxi — Chennai',
    category: 'Transportation',
    city: 'Chennai',
    address: 'Chennai International Airport',
    description: 'Demo listing. Prepaid airport taxi service.',
    phone: '+91-9000000003',
    website: 'https://example.com/chennai-taxi',
    verified: false,
  },
  // Bengaluru
  {
    name: 'Sample PG for Students — Bengaluru',
    category: 'Accommodation',
    city: 'Bengaluru',
    address: 'Sample Address, Koramangala, Bengaluru',
    description: 'Demo listing. PG accommodation for international students.',
    phone: '+91-9000000010',
    website: 'https://example.com/blr-pg',
    verified: false,
  },
  {
    name: 'Sample Bank Branch — Bengaluru',
    category: 'Banking',
    city: 'Bengaluru',
    address: 'Sample Address, MG Road, Bengaluru',
    description: 'Demo listing. Student account services.',
    phone: '+91-9000000011',
    website: 'https://example.com/blr-bank',
    verified: false,
  },
  // Mumbai
  {
    name: 'Sample Clinic — Mumbai',
    category: 'Healthcare',
    city: 'Mumbai',
    address: 'Sample Address, Andheri, Mumbai',
    description: 'Demo listing. Walk-in clinic with English-speaking staff.',
    phone: '+91-9000000020',
    website: 'https://example.com/mumbai-clinic',
    verified: false,
  },
  {
    name: 'Sample Student Housing — Mumbai',
    category: 'Accommodation',
    city: 'Mumbai',
    address: 'Sample Address, Dadar, Mumbai',
    description: 'Demo listing. Shared student housing.',
    phone: '+91-9000000021',
    website: 'https://example.com/mumbai-housing',
    verified: false,
  },
  // Delhi
  {
    name: 'Sample Emergency Service — Delhi',
    category: 'Emergency Services',
    city: 'Delhi',
    address: 'Sample Address, Connaught Place, Delhi',
    description: 'Demo listing. Emergency response information desk.',
    phone: '+91-9000000030',
    website: 'https://example.com/delhi-emergency',
    verified: false,
  },
  {
    name: 'Sample SIM Store — Delhi',
    category: 'SIM/Telecom',
    city: 'Delhi',
    address: 'Sample Address, Karol Bagh, Delhi',
    description: 'Demo listing. Prepaid SIM cards for foreign nationals.',
    phone: '+91-9000000031',
    website: 'https://example.com/delhi-sim',
    verified: false,
  },
  // Hyderabad
  {
    name: 'Sample Student Support — Hyderabad',
    category: 'Student Support',
    city: 'Hyderabad',
    address: 'Sample Address, Gachibowli, Hyderabad',
    description: 'Demo listing. Student help desk for internationals.',
    phone: '+91-9000000040',
    website: 'https://example.com/hyd-support',
    verified: false,
  },
  {
    name: 'Sample Utility Services — Hyderabad',
    category: 'Utilities',
    city: 'Hyderabad',
    address: 'Sample Address, Madhapur, Hyderabad',
    description: 'Demo listing. Water/electricity setup assistance.',
    phone: '+91-9000000041',
    website: 'https://example.com/hyd-utilities',
    verified: false,
  },
  // Pune
  {
    name: 'Sample Hostel — Pune',
    category: 'Accommodation',
    city: 'Pune',
    address: 'Sample Address, Kothrud, Pune',
    description: 'Demo listing. Hostel with mess facility.',
    phone: '+91-9000000050',
    website: 'https://example.com/pune-hostel',
    verified: false,
  },
  {
    name: 'Sample Transport Service — Pune',
    category: 'Transportation',
    city: 'Pune',
    address: 'Sample Address, Shivajinagar, Pune',
    description: 'Demo listing. City bus pass assistance.',
    phone: '+91-9000000051',
    website: 'https://example.com/pune-transport',
    verified: false,
  },
  // Kolkata
  {
    name: 'Sample Hospital — Kolkata',
    category: 'Healthcare',
    city: 'Kolkata',
    address: 'Sample Address, Salt Lake, Kolkata',
    description: 'Demo listing. Multispecialty hospital.',
    phone: '+91-9000000060',
    website: 'https://example.com/kolkata-hospital',
    verified: false,
  },
  {
    name: 'Sample Student Hostel — Kolkata',
    category: 'Accommodation',
    city: 'Kolkata',
    address: 'Sample Address, Park Street, Kolkata',
    description: 'Demo listing. Student hostel near universities.',
    phone: '+91-9000000061',
    website: 'https://example.com/kolkata-hostel',
    verified: false,
  },
  // All India
  {
    name: 'India Emergency Number',
    category: 'Emergency Services',
    city: 'All India',
    address: 'Nationwide',
    description:
      'Unified emergency number in India for police, fire, and ambulance. Dial 112.',
    phone: '112',
    website: 'https://www.india.gov.in/',
    verified: true,
  },
  {
    name: 'Ministry of External Affairs',
    category: 'Student Support',
    city: 'All India',
    address: 'New Delhi',
    description:
      'Official MEA portal for visa, passports, and international student queries.',
    phone: '',
    website: 'https://www.mea.gov.in/',
    verified: true,
  },
  {
    name: 'Ministry of Education',
    category: 'Student Support',
    city: 'All India',
    address: 'New Delhi',
    description: 'Official Ministry of Education portal.',
    phone: '',
    website: 'https://www.education.gov.in/',
    verified: true,
  },
  {
    name: 'University Grants Commission',
    category: 'Student Support',
    city: 'All India',
    address: 'New Delhi',
    description:
      'UGC — verify your university and student scheme eligibility.',
    phone: '',
    website: 'https://www.ugc.gov.in/',
    verified: true,
  },
  {
    name: 'Sample Visa Assistance Desk',
    category: 'Student Support',
    city: 'All India',
    address: 'Multiple cities',
    description:
      'Demo listing. Assistance with student visa queries. Always verify with official government sources.',
    phone: '+91-9000000099',
    website: 'https://example.com/visa-desk',
    verified: false,
  },
  {
    name: 'Sample Banking Support',
    category: 'Banking',
    city: 'All India',
    address: 'Multiple cities',
    description:
      'Demo listing. Help opening a student account and setting up net banking.',
    phone: '+91-9000000098',
    website: 'https://example.com/banking-support',
    verified: false,
  },
];

const faqs = [
  {
    question: 'Do I need a student visa to study in India?',
    answer:
      'Yes, most international students require a valid student visa. Visa rules can change — always check the official Ministry of External Affairs or your nearest Indian embassy website.',
    category: 'Visa & Immigration',
  },
  {
    question: 'How long does student visa processing take?',
    answer:
      'Processing time varies by country. Apply well in advance (typically 4–8 weeks before your course start date). Check the official Indian mission website for current timelines.',
    category: 'Visa & Immigration',
  },
  {
    question: 'Which documents should I carry in hand luggage?',
    answer:
      'Passport, visa, admission letter, fee receipts, passport-size photographs, insurance, and any prescriptions. Keep photocopies and cloud backups.',
    category: 'Documents',
  },
  {
    question: 'How do I choose a hostel or PG?',
    answer:
      'Contact your university housing office first. For off-campus options, verify the landlord/agency, visit in person (or have a trusted person visit), and never pay a large deposit before confirming.',
    category: 'Accommodation',
  },
  {
    question: 'How do I open a bank account in India?',
    answer:
      'Visit a bank branch with your passport, visa, admission letter, address proof, and photographs. Many banks have student-friendly accounts with low minimum balances.',
    category: 'Banking',
  },
  {
    question: 'What is the emergency number in India?',
    answer:
      'Dial 112 for police, fire, and ambulance — it is India\u2019s unified emergency number.',
    category: 'Safety',
  },
  {
    question: 'How do I get a SIM card as a foreign student?',
    answer:
      'Visit an official telecom store (Airtel, Jio, Vi, BSNL) with your passport, visa, and local address proof. Activation may take a few hours.',
    category: 'Transportation',
  },
  {
    question: 'Is travel insurance mandatory?',
    answer:
      'Requirements vary by university and visa type. Even when not mandatory, medical/travel insurance is strongly recommended.',
    category: 'Healthcare',
  },
  {
    question: 'What is the best way to commute in Indian cities?',
    answer:
      'Metro, city buses, auto-rickshaws, and app-based cabs are common. Fares and availability vary by city. Keep small cash handy.',
    category: 'Transportation',
  },
  {
    question: 'How can I adapt to Indian culture?',
    answer:
      'Be respectful of local customs, try local food gradually, join student groups, and stay open-minded. Learn a few Hindi or regional phrases — it helps.',
    category: 'Culture',
  },
  {
    question: 'What should I do in a medical emergency?',
    answer:
      'Call 112 or go to the nearest hospital emergency department. Keep your insurance details and emergency contacts saved on your phone.',
    category: 'Healthcare',
  },
  {
    question: 'Can I work part-time while studying?',
    answer:
      'Visa rules on part-time work vary. Check the official government/embassy guidance — do not rely on unofficial advice.',
    category: 'Visa & Immigration',
  },
  {
    question: 'How do I register with the local police (FRRO)?',
    answer:
      'Registration requirements depend on your visa type and duration. Check official FRRO/immigration guidance for your case.',
    category: 'Visa & Immigration',
  },
  {
    question: 'What should I do if I lose my passport?',
    answer:
      'Immediately file a police complaint (FIR), contact your embassy/consulate, and apply for a replacement. Keep digital copies of your passport.',
    category: 'Safety',
  },
  {
    question: 'How do I get a student ID at my university?',
    answer:
      'Follow your university\u2019s registration process. Usually you need your admission letter, passport, and photographs.',
    category: 'University Life',
  },
  {
    question: 'What are common banking documents for students?',
    answer:
      'Passport, visa, admission letter, address proof, photographs, and sometimes a reference letter from your university.',
    category: 'Banking',
  },
  {
    question: 'Are there scholarship opportunities for international students?',
    answer:
      'Yes, several Indian government and university scholarships exist. Check official Ministry of Education, ICCR, and UGC resources.',
    category: 'University Life',
  },
  {
    question: 'What foods should I try first?',
    answer:
      'Start with familiar items and gradually try regional dishes. Vegetarian options are widely available. Ask your peers for trusted local eateries.',
    category: 'Culture',
  },
  {
    question: 'How do I stay safe in a new city?',
    answer:
      'Save emergency numbers, share your location with a trusted contact, avoid isolated areas at night, and use licensed transport.',
    category: 'Safety',
  },
  {
    question: 'How do I find reliable guides and services?',
    answer:
      'Use official government/university sources where possible. Treat community listings as unverified until independently confirmed.',
    category: 'University Life',
  },
];

const seed = async () => {
  try {
    await connectDB();

    console.log('Cleared existing data');
    await Promise.all([
      User.deleteMany({}),
      Guide.deleteMany({}),
      Service.deleteMany({}),
      FAQ.deleteMany({}),
      SavedResource.deleteMany({}),
      Feedback.deleteMany({}),
    ]);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@portal.com',
      password: 'admin123',
      country: 'India',
      destinationCity: 'Delhi',
      role: 'admin',
    });

    const student = await User.create({
      name: 'Demo Student',
      email: 'student@demo.com',
      password: 'student123',
      country: 'Nigeria',
      destinationCity: 'Chennai',
      role: 'student',
    });

    console.log(
      'Seeded users: admin@portal.com / admin123, student@demo.com / student123'
    );

    await Guide.insertMany(guides);
    console.log(`Seeded ${guides.length} guides`);

    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services`);

    await FAQ.insertMany(faqs);
    console.log(`Seeded ${faqs.length} FAQs`);

    await Feedback.create({
      user: student._id,
      message: 'Great portal! Very helpful for new students.',
      rating: 5,
    });

    console.log('Seeding complete');
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();