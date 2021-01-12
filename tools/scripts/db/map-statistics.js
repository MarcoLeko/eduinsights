module.exports = mapStatistics = [
  {
    description: "Net enrolment rate for primary education",
    key: "NET_ENROLMENT_RATE_FOR_PRIMARY_EDUCATION_2018_2018",
    url:
      "https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/NER.PT.L1.._T.................?startPeriod=2018&endPeriod=2018&format=sdmx-json&locale=en&subscription-key=",
    startYear: 2018,
    endYear: 2018,
    evaluationType: "percentage",
    evaluation: [
      { key: "firstRange", value: [100, 98] },
      { key: "secondRange", value: [97, 90] },
      { key: "thirdRange", value: [89, 85] },
      { key: "fourthRange", value: [84, 70] },
      { key: "fifthRange", value: [69, 0] },
    ],
  },
  {
    description:
      "Proportion of primary schools with access to internet for pedagogical purposes",
    key: "PROPORTION_OF_PRIMARY_SCHOOLS_INTERNET_ACCESS_2018_2018",
    url:
      "https://api.uis.unesco.org/sdmx/data/SDG4/SCH.PT.L1._T._T._T._T.INST_T._Z._T._Z.NET_PP._T._T._T._Z._Z._Z.?startPeriod=2018&endPeriod=2018&format=sdmx-json&subscription-key=",
    startYear: 2018,
    endYear: 2018,
    evaluationType: "percentage",
    evaluation: [
      { key: "firstRange", value: [100, 80] },
      { key: "secondRange", value: [79, 50] },
      { key: "thirdRange", value: [49, 25] },
      { key: "fourthRange", value: [25, 10] },
      { key: "fifthRange", value: [10, 0] },
    ],
  },
  {
    description: "Percentage of female repeaters primary education",
    key: "PERCENTAGE_OF_FEMALE_REPEATERS_PRIMARY_EDUCATION_2018_2018",
    url:
      "https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/FRP..L1...................?startPeriod=2018&endPeriod=2018&format=sdmx-json&locale=en&subscription-key=",
    startYear: 2018,
    endYear: 2018,
    evaluationType: "percentage",
    evaluation: [
      { key: "firstRange", value: [0, 9] },
      { key: "secondRange", value: [10, 19] },
      { key: "thirdRange", value: [20, 29] },
      { key: "fourthRange", value: [30, 49] },
      { key: "fifthRange", value: [50, 100] },
    ],
  },
  {
    description: "Percentage of qualified teachers secondary education",
    key: "PERCENTAGE_OF_QUALIFIED_TEACHERS_SECONDARY_EDUCATION_2018_2018",
    url:
      "https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/FRP.PT.L1..F.................?startPeriod=2018&endPeriod=2018&format=sdmx-json&locale=en&subscription-key=",
    startYear: 2018,
    endYear: 2018,
    evaluationType: "percentage",
    evaluation: [
      { key: "firstRange", value: [100, 95] },
      { key: "secondRange", value: [94, 80] },
      { key: "thirdRange", value: [79, 69] },
      { key: "fourthRange", value: [68, 50] },
      { key: "fifthRange", value: [49, 0] },
    ],
  },
  {
    description: "Graduation ratio of primary education",
    key: "GRADUATION_RATIO_PERCENTAGE_OF_PRIMARY_EDUCATION_2018_2018",
    url:
      "https://api.uis.unesco.org/sdmx/data/UNESCO,EDU_NON_FINANCE,3.0/GR.PT.L1.._T.................?startPeriod=2018&endPeriod=2018&format=sdmx-json&locale=en&subscription-key=",
    startYear: 2018,
    endYear: 2018,
    evaluationType: "percentage",
    evaluation: [
      { key: "firstRange", value: [100, 95] },
      { key: "secondRange", value: [94, 80] },
      { key: "thirdRange", value: [79, 69] },
      { key: "fourthRange", value: [68, 50] },
      { key: "fifthRange", value: [49, 0] },
    ],
  },
];
