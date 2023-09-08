const SubjectCategoryModel = require("../models/SubjectCategory");

exports.subjectCategorySeeding = async () => {
  const result = await SubjectCategoryModel.create([
    {
      name: "Eternal Gardens' all round Janazah App",

      content: {
        langAra:
          "المبلغ الضخم هو دفعة لحملة ناضلت للتنافس مع براعة جمع التبرعات لبعض كبار منافسيها في جميع أنحاء الانتخابات التمهيدية الديمقراطية",
        langEng:
          "The massive sum is a boost to a campaign that had struggled to compete with the fundraising prowess of some of its top rivals throughout the Democratic primary",
        langTranslit:
          "almablagh aldakhm hu dafeat lihamlat nadilat liltanafus mae baraeat jame altabarueat libaed kibar munafisiha fi jmye 'anha' alaintikhabat altamhidiat aldiymuqratia",
      },
    },
    {
      name:
        "Essential resources for regular visitors to the cemetery and for those",

      content: {
        langAra:
          "لا يحتوي Famicom على أجهزة قفل ، ونتيجة لذلك ، كانت الخراطيش غير المرخصة (الشرعية وغير المشروعة) شائعة للغاية في جميع أنحاء اليابان والشرق الأقصى",
        langEng:
          "The Famicom contains no lockout hardware and, as a result, unlicensed cartridges (both legitimate and bootleg) were extremely common throughout Japan and the Far East",
        langTranslit:
          "la yahtawi Famicom ealaa 'ajhizat qifl , wanatijat ldhlk , kanat alkharatish ghyr almurakhasa (alshreyt waghayr almshrwe) shayieatan lilghayat fi jmye 'anha' alyaban walshrq al'aqsaa",
      },
    },
  ]);
  return result;
};
